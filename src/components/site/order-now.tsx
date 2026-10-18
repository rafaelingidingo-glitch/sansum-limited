"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  CalendarDays,
  CheckCircle2,
  Info,
  Mail,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { ORDER_TEL } from "@/components/site/navbar";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/components/site/topbar";
import { FadeIn } from "@/components/site/motion";

/* ── Sansum catalogue ─────────────────────────────────────────────────────
   Names and bottle images mirror the "Our Products" section. No prices are
   shown anywhere on this page on purpose: the estimated total stays a
   placeholder and the final price is confirmed by Sansum Water when the
   team contacts the customer. */
const PRODUCT_OPTIONS = [
  { key: "1L", label: "1 Litre", name: "Mshangazi", src: "/products/1l.png" },
  { key: "3L", label: "3 Litres", name: "SANSUM PLUS", src: "/products/3l.png" },
  { key: "5L", label: "5 Litres", name: "SANSUM MAX", src: "/products/5l.png" },
  { key: "10L", label: "10 Litres", name: "SANSUM FAMILY", src: "/products/10l.png" },
] as const;

type SizeKey = (typeof PRODUCT_OPTIONS)[number]["key"];

type OrderItem = { id: number; size: SizeKey; qty: number };

const MAX_ITEMS = 4;

/* Same field styling as the Contact section form for a consistent brand feel */
const INPUT_CLS =
  "mt-2 w-full rounded-[10px] border border-[#B9E8F8] bg-white px-4 py-2.5 text-[15px] text-slate-700 shadow-sm placeholder:text-slate-400 outline-none transition-colors focus:border-[#63BCE8] focus:ring-2 focus:ring-[#63BCE8]/25";

const SIZE_PILL_BASE =
  "rounded-[10px] border px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand";

function SizePill({
  selected,
  onClick,
  label,
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={`${SIZE_PILL_BASE} ${
        selected
          ? "border-brand bg-brand text-white shadow-sm"
          : "border-ice bg-white text-navy hover:border-skyblue/60 hover:bg-ice"
      }`}
    >
      {label}
    </button>
  );
}

function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: string;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-navy">
      {children}
      {optional ? (
        <span className="ml-1.5 text-xs font-medium text-slate-500">
          (optional)
        </span>
      ) : (
        <span className="text-brand" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function GroupHeading({
  icon: Icon,
  title,
  hint,
}: {
  icon: typeof User;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="icon-chip flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-ice text-brand">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="font-heading text-base font-semibold text-navy sm:text-lg">
        {title}
      </h3>
      {hint ? (
        <span className="w-full text-xs text-slate-500 sm:ml-auto sm:w-auto">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export default function OrderNow() {
  const [items, setItems] = useState<OrderItem[]>([
    { id: 1, size: "5L", qty: 1 },
  ]);
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const nextId = useRef(2);
  const dateInputRef = useRef<HTMLInputElement>(null);

  /* min date is applied directly to the DOM after mount to keep
     server/client markup identical (hydration-safe) */
  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toISOString().slice(0, 10);
    }
  }, []);

  /* Treat a temporarily emptied field (qty 0) as 1 so the summary stays sane */
  const totalQty = items.reduce(
    (sum, item) => sum + Math.max(1, item.qty),
    0,
  );

  function setSize(id: number, size: SizeKey) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, size } : item)),
    );
  }

  function stepQty(id: number, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item,
      ),
    );
  }

  /* Manual entry: digits only, no upper limit on the amount (guarded to 6
     digits purely for layout safety); empty field = 0 until blur */
  function setQty(id: number, raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 6);
    const next = digits === "" ? 0 : parseInt(digits, 10) || 0;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: next } : item)),
    );
  }

  /* Restore a valid quantity (min 1) when the user leaves the field empty */
  function commitQty(id: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.qty < 1 ? { ...item, qty: 1 } : item,
      ),
    );
  }

  function removeItem(id: number) {
    setItems((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev,
    );
  }

  function addItem() {
    setItems((prev) =>
      prev.length >= MAX_ITEMS
        ? prev
        : [...prev, { id: nextId.current++, size: "5L", qty: 1 }],
    );
  }

  /* UI-only submit — nothing is sent anywhere; button is a visual element */
  
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (isSubmitting) return;

  setIsSubmitting(true);
  setSubmitted(false);
  setSubmitError("");

  const form = event.currentTarget;
  const formData = new FormData(form);

  const payload = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    orderType,
    preferredDate,
    notes: formData.get("notes"),
    items: items.map((item) => ({
      size: item.size,
      qty: Math.max(1, item.qty),
    })),
  };

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "Oda haikutumwa. Tafadhali jaribu tena.",
      );
    }

    setSubmitted(true);
    form.reset();
    setItems([{ id: nextId.current++, size: "5L", qty: 1 }]);
    setOrderType("delivery");
    setPreferredDate("");
  } catch (error) {
    setSubmitError(
      error instanceof Error
        ? error.message
        : "Imeshindikana kutuma oda. Tafadhali jaribu tena.",
    );
  } finally {
    setIsSubmitting(false);
  }
}


  const formattedDate = preferredDate
    ? new Date(`${preferredDate}T00:00:00`).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <section aria-label="Order form" className="relative bg-white pb-16 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
          {/* ── Order form ── */}
          <FadeIn className="overflow-hidden rounded-3xl border border-ice bg-white shadow-[0_24px_60px_-24px_rgba(7,59,102,0.18)]">
            <form onSubmit={handleSubmit} aria-label="Order Sansum Water" noValidate>
              <div className="p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">
                  Order Details
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Tell us what you need — our team will confirm availability,
                  delivery time and the final price with you.
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Fields marked{" "}
                  <span aria-hidden="true" className="font-semibold text-brand">
                    *
                  </span>{" "}
                  are required.
                </p>

                {/* ── Customer information ── */}
                <div role="group" aria-label="Customer information" className="mt-8">
                  <GroupHeading icon={User} title="Customer Information" />
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel htmlFor="order-name">Full Name</FieldLabel>
                      <input
                        id="order-name"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        className={INPUT_CLS}
                      />
                    </div>
                    <div>
                      <FieldLabel htmlFor="order-phone">Phone Number</FieldLabel>
                      <input
                        id="order-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+255 7XX XXX XXX"
                        className={INPUT_CLS}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="order-email" optional>
                        Email Address
                      </FieldLabel>
                      <input
                        id="order-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={INPUT_CLS}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel
                        htmlFor="order-address"
                        optional={orderType === "pickup"}
                      >
                        Delivery Location / Address
                      </FieldLabel>
                      <textarea
                        id="order-address"
                        name="address"
                        rows={2}
                        required={orderType === "delivery"}
                        placeholder="Street, area or landmark — Dar es Salaam"
                        className={`${INPUT_CLS} resize-none`}
                      />
                      <p className="mt-1.5 text-xs text-slate-500">
                        {orderType === "delivery"
                          ? "We currently deliver locally within Dar es Salaam."
                          : "Not needed for pickup orders."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Product selection ── */}
                <div
                  role="group"
                  aria-label="Product selection"
                  className="mt-10 border-t border-ice pt-8"
                >
                  <GroupHeading
                    icon={ShoppingBag}
                    title="Product Selection"
                    hint={`Up to ${MAX_ITEMS} products`}
                  />

                  <ul className="mt-4 space-y-4">
                    {items.map((item, index) => {
                      const option = PRODUCT_OPTIONS.find(
                        (opt) => opt.key === item.size,
                      )!;
                      return (
                        <li
                          key={item.id}
                          className="rounded-2xl border border-ice bg-white p-4 shadow-sm sm:p-5"
                        >
                          <div className="flex items-start gap-4">
                            <span className="flex h-16 w-14 shrink-0 items-center justify-center rounded-[10px] bg-ice">
                              <Image
                                src={option.src}
                                alt=""
                                width={48}
                                height={56}
                                className="h-12 w-10 object-contain"
                              />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Product {index + 1}
                                  </p>
                                  <p className="mt-0.5 truncate font-heading text-sm font-semibold text-navy sm:text-base">
                                    {option.name}
                                    <span className="ml-2 text-xs font-medium text-slate-500">
                                      {option.label}
                                    </span>
                                  </p>
                                </div>
                                {items.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    aria-label={`Remove product ${index + 1}`}
                                    className="btn-light flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-ice text-slate-500 hover:text-brand"
                                  >
                                    <Trash2
                                      className="h-4 w-4"
                                      aria-hidden="true"
                                    />
                                  </button>
                                )}
                              </div>

                              <div
                                role="group"
                                aria-label={`Bottle size for product ${index + 1}`}
                                className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2"
                              >
                                {PRODUCT_OPTIONS.map((opt) => (
                                  <SizePill
                                    key={opt.key}
                                    label={opt.key}
                                    selected={item.size === opt.key}
                                    onClick={() => setSize(item.id, opt.key)}
                                    ariaLabel={`${opt.label} bottle — ${opt.name}`}
                                  />
                                ))}
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                  Quantity
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => stepQty(item.id, -1)}
                                    disabled={item.qty <= 1}
                                    aria-label={`Decrease quantity for product ${index + 1}`}
                                    className="btn-light flex h-9 w-9 items-center justify-center rounded-[10px] border border-ice text-navy disabled:cursor-not-allowed disabled:opacity-40"
                                  >
                                    <Minus
                                      className="h-4 w-4"
                                      aria-hidden="true"
                                    />
                                  </button>
                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    autoComplete="off"
                                    aria-live="polite"
                                    aria-label={`Quantity for product ${index + 1} (enter the number of bottles)`}
                                    title="Enter the number of bottles you need"
                                    value={item.qty === 0 ? "" : String(item.qty)}
                                    onChange={(e) => setQty(item.id, e.target.value)}
                                    onBlur={() => commitQty(item.id)}
                                    onFocus={(e) => e.target.select()}
                                    style={{
                                      width: `${Math.max(3, (item.qty === 0 ? "" : String(item.qty)).length + 1)}ch`,
                                    }}
                                    className="h-9 rounded-[10px] border border-ice bg-white text-center font-heading text-base font-bold text-navy shadow-sm outline-none transition-colors focus:border-[#63BCE8] focus:ring-2 focus:ring-[#63BCE8]/25"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => stepQty(item.id, 1)}
                                    aria-label={`Increase quantity for product ${index + 1}`}
                                    className="btn-light flex h-9 w-9 items-center justify-center rounded-[10px] border border-ice text-navy"
                                  >
                                    <Plus
                                      className="h-4 w-4"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    type="button"
                    onClick={addItem}
                    disabled={items.length >= MAX_ITEMS}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-skyblue/50 bg-ice/50 px-4 py-3 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-ice disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add Another Product
                  </button>

                  {/* Order type */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-navy">Order Type</p>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <label className="block cursor-pointer rounded-2xl focus-within:outline-2 focus-within:outline-brand">
                        <input
                          type="radio"
                          name="orderType"
                          value="delivery"
                          checked={orderType === "delivery"}
                          onChange={() => setOrderType("delivery")}
                          className="peer sr-only"
                        />
                        <div className="flex items-start gap-3 rounded-2xl border border-ice bg-white p-4 shadow-sm transition-colors peer-checked:border-brand peer-checked:bg-ice peer-checked:ring-1 peer-checked:ring-brand/40">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-ice text-brand">
                            <Truck className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block font-heading text-sm font-semibold text-navy">
                              Delivery
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                              We bring your order to your address.
                            </span>
                          </span>
                        </div>
                      </label>
                      <label className="block cursor-pointer rounded-2xl focus-within:outline-2 focus-within:outline-brand">
                        <input
                          type="radio"
                          name="orderType"
                          value="pickup"
                          checked={orderType === "pickup"}
                          onChange={() => setOrderType("pickup")}
                          className="peer sr-only"
                        />
                        <div className="flex items-start gap-3 rounded-2xl border border-ice bg-white p-4 shadow-sm transition-colors peer-checked:border-brand peer-checked:bg-ice peer-checked:ring-1 peer-checked:ring-brand/40">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-ice text-brand">
                            <Store className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block font-heading text-sm font-semibold text-navy">
                              Pickup
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                              Collect your order from us.
                            </span>
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* ── Additional information ── */}
                <div
                  role="group"
                  aria-label="Additional information"
                  className="mt-10 border-t border-ice pt-8"
                >
                  <GroupHeading icon={CalendarDays} title="Additional Information" />
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2 lg:col-span-1">
                      <FieldLabel htmlFor="order-date" optional>
                        Preferred Delivery Date
                      </FieldLabel>
                      <input
                        id="order-date"
                        ref={dateInputRef}
                        name="preferredDate"
                        type="date"
                        value={preferredDate}
                        onChange={(event) => setPreferredDate(event.target.value)}
                        className={INPUT_CLS}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel htmlFor="order-notes" optional>
                        Additional Notes
                      </FieldLabel>
                      <textarea
                        id="order-notes"
                        name="notes"
                        rows={3}
                        placeholder="Anything we should know? e.g. delivery instructions"
                        className={`${INPUT_CLS} resize-none`}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Submit area ── */}
                <div className="mt-8 border-t border-ice pt-6">
                  {submitError && (
                  <p role="alert" className="mt-4 text-sm text-red-600">
                   {submitError}
                     </p>
                     )}
                  <button
                     type="submit"
                     disabled={isSubmitting}
                     className="btn-primary inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-brand text-base font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                              {isSubmitting ? "Sending Order..." : "Submit Order"}
                 </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-slate-500">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                   
                    Our team will contact you to confirm your order.
                  </p>
                  
                  {submitted && (
                    <p
                      role="status"
                      className="mt-4 flex items-start gap-2 rounded-[10px] border border-skyblue/40 bg-ice px-4 py-3 text-sm leading-6 text-navy"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      <span>
                        Thank you! Your order has been submitted successfully. Our team will contact you to confirm availability, delivery time and final price.
                        
                        <a href={ORDER_TEL} className="contact-link font-semibold">
                          {CONTACT_PHONE_DISPLAY}
                        </a>{" "}
                        or email{" "}
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="contact-link font-semibold"
                        >
                          {CONTACT_EMAIL}
                        </a>
                        .
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </form>
          </FadeIn>

          {/* ── Order summary ── */}
          <aside aria-label="Order summary" className="lg:sticky lg:top-24">
            <FadeIn
              delay={0.15}
              className="overflow-hidden rounded-3xl border border-ice bg-white shadow-[0_24px_60px_-24px_rgba(7,59,102,0.18)]"
            >
              <div className="bg-ice px-6 py-4">
                <h2 className="flex items-center gap-2 font-heading text-base font-bold text-navy">
                  <ShoppingBag className="h-4 w-4 text-brand" aria-hidden="true" />
                  Order Summary
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  {totalQty} {totalQty === 1 ? "bottle" : "bottles"} ·{" "}
                  {orderType === "delivery" ? "Delivery" : "Pickup"}
                </p>
              </div>

              <div className="px-6 py-5">
                <ul className="space-y-3">
                  {items.map((item) => {
                    const option = PRODUCT_OPTIONS.find(
                      (opt) => opt.key === item.size,
                    )!;
                    return (
                      <li key={item.id} className="flex items-center gap-3">
                        <span className="flex h-11 w-10 shrink-0 items-center justify-center rounded-[10px] bg-ice">
                          <Image
                            src={option.src}
                            alt=""
                            width={36}
                            height={44}
                            className="h-9 w-8 object-contain"
                          />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-heading text-sm font-semibold text-navy">
                            {option.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {option.label} · Qty {Math.max(1, item.qty)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {formattedDate && (
                  <p className="mt-4 flex items-center gap-2 rounded-[10px] bg-ice/70 px-3 py-2 text-xs font-medium text-navy">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                    Preferred date: {formattedDate}
                  </p>
                )}

                <div className="mt-5 border-t border-ice pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-navy">
                      Estimated Total
                    </span>
                    <span className="font-heading text-xl font-bold text-navy">
                      TSh —
                    </span>
                  </div>
                  <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                    <span>
                      Placeholder total — the final price will be confirmed by
                      Sansum Water when our team contacts you.
                    </span>
                  </p>
                </div>

                <div className="mt-5 border-t border-ice pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Need help with your order?
                  </p>
                  <a
                    href={ORDER_TEL}
                    className="contact-link -my-2 mt-2 flex items-center gap-2 py-2 text-sm font-semibold text-navy"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="contact-link -my-2 flex items-center gap-2 py-2 text-sm font-semibold text-navy"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </div>
    </section>
  );
}
