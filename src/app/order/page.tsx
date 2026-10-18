import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Footer from "@/components/site/footer";
import OrderNow from "@/components/site/order-now";
import { ORDER_TEL } from "@/components/site/navbar";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/components/site/topbar";
import {
  AnimatedTitle,
  FadeIn,
  Parallax,
  RevealLine,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";

export const metadata: Metadata = {
  title: "Order Now | Sansum Water Tanzania",
  description:
    "Order Sansum purified drinking water — 1, 3, 5 and 10 litre bottles with delivery or pickup in Dar es Salaam. Submit your request and our team will confirm your order.",
};

const HELP_GROUPS = [
  {
    icon: Phone,
    title: "Call Us",
    value: CONTACT_PHONE_DISPLAY,
    href: ORDER_TEL,
    sub: "Our team confirms every order.",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    sub: "Send us your order details.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dar es Salaam, Tanzania",
    href: undefined,
    sub: "Local delivery available.",
  },
] as const;

export default function OrderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ── Page header — logo + back-home arrow ── */}
      <header className="sticky top-0 z-40 w-full border-b border-ice bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-brand"
            aria-label="Sansum Water Tanzania — back to home"
          >
            <span className="shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-ice">
              <Image
                src="/brand/logo.png"
                alt="Sansum Water logo"
                width={52}
                height={52}
                className="h-[52px] w-[52px] object-cover"
                priority
              />
            </span>
            <span className="whitespace-nowrap font-heading text-lg font-semibold text-navy">
              Sansum Water
            </span>
          </Link>
          <Link
            href="/"
            className="btn-light inline-flex h-10 items-center gap-2 rounded-[10px] border border-ice px-3.5 text-sm font-semibold text-navy shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden min-[380px]:inline">Back to Home</span>
            <span className="min-[380px]:hidden">Back</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Page hero — breadcrumb, heading, water-drop accents ── */}
        <section
          aria-label="Order Sansum Water"
          className="relative overflow-hidden bg-gradient-to-b from-ice via-white to-white"
        >
          {/* Tasteful water-drop graphics — outer edges only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <Parallax
              from={-24}
              to={24}
              className="absolute -right-20 -top-24 h-72 w-72"
              innerClassName="h-full w-full will-change-transform"
            >
              <div className="h-full w-full rounded-full bg-skyblue/20 blur-3xl" />
            </Parallax>
            <Parallax
              from={20}
              to={-20}
              className="absolute -left-24 top-44 h-64 w-64"
              innerClassName="h-full w-full will-change-transform"
            >
              <div className="h-full w-full rounded-full bg-brand/10 blur-3xl" />
            </Parallax>
            {/* Large droplet outline — top right */}
            <svg
              className="absolute right-10 top-8 hidden h-44 w-44 text-skyblue md:block"
              viewBox="0 0 160 160"
              fill="none"
            >
              <path
                d="M80 14C80 14 36 66 36 100a44 44 0 0 0 88 0C124 66 80 14 80 14Z"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="2"
              />
              <path
                d="M62 96a20 26 0 0 0 12 22"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {/* Small filled droplet — left */}
            <svg
              className="absolute left-[10%] top-28 h-9 w-9 text-brand/25"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path d="M20 3C20 3 7 19 7 27a13 13 0 0 0 26 0C33 19 20 3 20 3Z" fill="currentColor" />
            </svg>
            {/* Ripple arcs — bottom right */}
            <svg
              className="absolute -bottom-20 right-1/4 h-64 w-64 text-skyblue"
              viewBox="0 0 256 256"
              fill="none"
            >
              <circle cx="128" cy="128" r="62" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" />
              <circle cx="128" cy="128" r="92" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" />
              <circle cx="128" cy="128" r="120" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 md:pb-10 md:pt-10 lg:px-8">
            {/* Breadcrumb */}
            <FadeIn y={16}>
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="contact-link inline-flex items-center gap-1 rounded px-1 py-0.5 font-medium text-slate-600"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  </li>
                  <li aria-current="page" className="px-1 font-semibold text-navy">
                    Order Now
                  </li>
                </ol>
              </nav>
            </FadeIn>

            <div className="mt-5 max-w-2xl">
              <AnimatedTitle
                as="h1"
                text="Order Now"
                className="font-heading text-4xl font-bold text-navy sm:text-5xl"
              />
              <RevealLine
                delay={0.3}
                className="mt-4 h-1 w-14 rounded-full bg-skyblue"
              />
            </div>
          </div>
        </section>

        {/* ── Order form + summary ── */}
        <OrderNow />

        {/* ── Help strip — verified contact channels ── */}
        <section aria-label="Order help" className="relative overflow-hidden bg-ice py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <FadeIn y={24}>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
                  Need Help?
                </p>
              </FadeIn>
              <AnimatedTitle
                text="Prefer to Order Another Way?"
                className="mt-4 font-heading text-2xl font-bold text-navy sm:text-3xl"
              />
              <RevealLine
                origin="center"
                delay={0.25}
                className="mx-auto mt-4 h-1 w-14 rounded-full bg-skyblue"
              />
              <FadeIn delay={0.3} y={24}>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Reach the Sansum Water team directly — we are happy to take
                  your order or answer any questions.
                </p>
              </FadeIn>
            </div>

            <Stagger
              as="ul"
              delay={0.15}
              stagger={0.1}
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {HELP_GROUPS.map(({ icon: Icon, title, value, href, sub }) => (
                <StaggerItem
                  key={title}
                  as="li"
                  y={28}
                  className="card-lift-sm rounded-2xl border border-[#B9E8F8] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="icon-chip flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#B9E8F8]/60 text-navy">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-sm font-semibold text-navy">
                      {title}
                    </h3>
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="contact-link -my-2 mt-3 block break-words py-2 text-[15px] font-semibold text-navy"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-3 text-[15px] font-semibold text-navy">
                      {value}
                    </p>
                  )}
                  <p className="mt-1 text-xs leading-5 text-slate-500">{sub}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
