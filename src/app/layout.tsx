import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MotionProvider } from "@/components/site/motion";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Set NEXT_PUBLIC_SITE_URL to the live domain when deploying so
   canonical/OG URLs resolve correctly (falls back to localhost for dev) */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sansum Water Tanzania — Pure Drinking Water",
  description:
    "Sansum Water Tanzania delivers purified drinking water in 3, 5 and 10 litre bottles for homes, offices and businesses. Order now or become a distribution partner.",
  keywords: [
    "Sansum Water",
    "bottled water Tanzania",
    "purified drinking water",
    "water delivery Tanzania",
    "3 litre water",
    "5 litre water",
    "10 litre water",
    "wholesale water Tanzania",
  ],
  icons: {
    icon: "/brand/logo.png",
  },
  openGraph: {
    title: "Sansum Water Tanzania — Pure Drinking Water",
    description:
      "Purified drinking water in 3, 5 and 10 litre bottles for homes and businesses in Tanzania.",
    images: ["/brand/hero-bg.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <MotionProvider>
          {children}
          <Toaster />
        </MotionProvider>
      </body>
    </html>
  );
}
