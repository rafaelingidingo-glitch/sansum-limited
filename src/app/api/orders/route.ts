
import { Resend } from "resend";
import { NextResponse } from "next/server";


const RECIPIENT_EMAIL = "rafaelingidingo@gmail.com";
const ALLOWED_SIZES = ["1L", "3L", "5L", "10L"] as const;

const PRODUCT_NAMES: Record<string, string> = {
  "1L": "Mshangazi — 1 Litre",
  "3L": "SANSUM PLUS — 3 Litres",
  "5L": "SANSUM MAX — 5 Litres",
  "10L": "SANSUM FAMILY — 10 Litres",
};

function clean(value: unknown, maxLength = 1000): string {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

export async function POST(request: Request) {
  try {
  const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  return NextResponse.json(
    { error: "Email service is not configured." },
    { status: 500 },
  );
}

const resend = new Resend(apiKey);

    const body = await request.json();

    const fullName = clean(body.fullName, 120);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 254);
    const address = clean(body.address, 500);
    const orderType = body.orderType;
    const preferredDate = clean(body.preferredDate, 10);
    const notes = clean(body.notes, 2000);

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Full name and phone number are required." },
        { status: 400 },
      );
    }

    if (
      email &&
      (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (orderType !== "delivery" && orderType !== "pickup") {
      return NextResponse.json(
        { error: "Invalid order type." },
        { status: 400 },
      );
    }

    if (orderType === "delivery" && !address) {
      return NextResponse.json(
        { error: "Delivery address is required." },
        { status: 400 },
      );
    }

    if (
      preferredDate &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) ||
        Number.isNaN(Date.parse(`${preferredDate}T00:00:00`)))
    ) {
      return NextResponse.json(
        { error: "Invalid preferred date." },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(body.items) ||
      body.items.length < 1 ||
      body.items.length > 4
    ) {
      return NextResponse.json(
        { error: "Choose between 1 and 4 products." },
        { status: 400 },
      );
    }

    const items = body.items.map((item: { size?: unknown; qty?: unknown }) => {
      const size = clean(item?.size, 10);
      const qty = item?.qty;

      if (
        !ALLOWED_SIZES.includes(size as (typeof ALLOWED_SIZES)[number]) ||
        !Number.isSafeInteger(qty) ||
        (qty as number) < 1 ||
        (qty as number) > 999999
      ) {
        throw new Error("Please check your product sizes and quantities.");
      }

      return {
        name: PRODUCT_NAMES[size],
        size,
        qty: qty as number,
      };
    });

    const productLines = items
      .map((item) => `${item.name} — Quantity: ${item.qty}`)
      .join("\n");

    const safe = {
      fullName: escapeHtml(fullName),
      phone: escapeHtml(phone),
      email: escapeHtml(email || "Not provided"),
      address: escapeHtml(address || "Not provided (pickup)"),
      orderType: orderType === "delivery" ? "Delivery" : "Pickup",
      preferredDate: escapeHtml(preferredDate || "Not specified"),
      notes: escapeHtml(notes || "No additional notes"),
    };

    const html = `
      <h2>New Sansum Water Order</h2>
      <h3>Customer Information</h3>
      <p><strong>Name:</strong> ${safe.fullName}</p>
      <p><strong>Phone:</strong> ${safe.phone}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Address:</strong> ${safe.address}</p>
      <p><strong>Order type:</strong> ${safe.orderType}</p>
      <h3>Products</h3>
      <ul>
        ${items
          .map(
            (item) =>
              `<li>${escapeHtml(item.name)} — Quantity: ${item.qty}</li>`,
          )
          .join("")}
      </ul>
      <h3>Additional Information</h3>
      <p><strong>Preferred date:</strong> ${safe.preferredDate}</p>
      <p><strong>Notes:</strong> ${safe.notes}</p>
      <hr />
      <p>Final prices and availability must be confirmed with the customer.</p>
    `;

    const { data, error } = await resend.emails.send({
      from: "Sansum Water Orders <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `New Water Order — ${fullName}`,
      text: `New Sansum Water Order

Customer: ${fullName}
Phone: ${phone}
Email: ${email || "Not provided"}
Address: ${address || "Not provided (pickup)"}
Order type: ${orderType}

Products:
${productLines}

Preferred date: ${preferredDate || "Not specified"}
Notes: ${notes || "None"}

Final prices and availability must be confirmed.`,
      html,
      ...(email ? { replyTo: email } : {}),
    });

    if (error) {
      console.error("Resend email error:", error);
      return NextResponse.json(
        { error: "We could not send your order. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Order submitted successfully.", id: data?.id },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Please check your product sizes and quantities."
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
