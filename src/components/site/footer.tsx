import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { ORDER_TEL } from "@/components/site/navbar";
import { CONTACT_EMAIL } from "@/components/site/topbar";
import { FadeIn } from "@/components/site/motion";

/* TikTok glyph — lucide has no TikTok icon; standard 24x24 brand path */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

type SocialIcon = ComponentType<{ className?: string }>;

const INSTAGRAM_URL = "https://www.instagram.com/sansumtz/";
const DISPLAY_PHONE = "+255 770 529 612";

/* Handles follow the verified Instagram handle (@sansumtz) — swap URLs here if any platform handle differs */
const SOCIALS: { label: string; href: string; Icon: SocialIcon }[] = [
  { label: "Instagram", href: INSTAGRAM_URL, Icon: Instagram },
  { label: "TikTok", href: "https://www.tiktok.com/@sansumtz", Icon: TikTokIcon },
  { label: "Facebook", href: "https://www.facebook.com/sansumtz", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@sansumtz", Icon: Youtube },
];

const QUICK_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Our Products", href: "/#products" },
  { label: "Our Process", href: "/#process" },
  { label: "Contact Us", href: "/#contact" },
];

const PRODUCTS = [
  { name: "Mshangazi", size: "1 Litre" },
  { name: "SANSUM PLUS", size: "3 Litres" },
  { name: "SANSUM MAX", size: "5 Litres" },
  { name: "SANSUM FAMILY", size: "10 Litres" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden bg-navy text-ice"
    >
      {/* Subtle aqua glows — outer edges only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-skyblue/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
        {/* Opacity-only fade — no vertical transform at page end (CLS-safe) */}
        <FadeIn y={0} duration={0.9} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-skyblue"
              aria-label="Sansum Water Tanzania — home"
            >
              <span className="shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-white/20">
                <Image
                  src="/brand/logo.png"
                  alt="Sansum Water logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover"
                />
              </span>
              <span className="whitespace-nowrap font-heading text-lg font-semibold text-white">
                Sansum Water
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-ice/75">
              Pure, refreshing bottled drinking water for homes and
              businesses — proudly Tanzanian.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Sansum Water on ${label}`}
                  className="footer-social inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/20 text-ice"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link -my-2 inline-flex w-full items-center py-2 text-sm text-ice/75"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Our Products
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTS.map((product) => (
                <li key={product.name}>
                  <Link
                    href="/#products"
                    className="footer-link -my-2 flex items-baseline justify-between gap-3 py-2 pr-6 text-sm text-ice/75"
                  >
                    <span>{product.name}</span>
                    <span className="text-xs text-ice/50">{product.size}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ice/80">
              <li>
                <a
                  href={ORDER_TEL}
                  className="footer-link -my-2 flex items-center gap-2.5 py-2"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-skyblue"
                    aria-hidden="true"
                  />
                  {DISPLAY_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="footer-link -my-2 flex items-center gap-2.5 py-2 break-all"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-skyblue"
                    aria-hidden="true"
                  />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin
                  className="h-4 w-4 shrink-0 text-skyblue"
                  aria-hidden="true"
                />
                Dar es Salaam, Tanzania
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link -my-2 flex items-center gap-2.5 py-2"
                >
                  <Instagram
                    className="h-4 w-4 shrink-0 text-skyblue"
                    aria-hidden="true"
                  />
                  @sansumtz
                </a>
              </li>
            </ul>
          </div>
        </FadeIn>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-center text-xs text-ice/60 sm:text-sm">
            &copy; {year} Sansum Water Limited. All rights reserved.
          </p>
          <a
            href="https://www.rwextech.co.tz/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link -my-2 inline-flex items-center gap-1.5 py-2 text-xs text-ice/70 transition-colors hover:text-white sm:text-sm"
          >
            Created by{" "}
            <span className="font-semibold text-ice">RweXtech</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
