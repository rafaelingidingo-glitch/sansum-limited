"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Briefcase, Mail, MapPin, Phone } from "lucide-react";
import { ORDER_TEL } from "@/components/site/navbar";
import { CONTACT_EMAIL } from "@/components/site/topbar";
import {
  AnimatedTitle,
  FadeIn,
  Parallax,
  RevealLine,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";

/* Fresh Aqua palette for this section:
   white #FFFFFF · light aqua #EAF9FF · soft blue #B9E8F8 · aqua blue #63BCE8
   Typography stays in the site's dark navy #073B66. */

const CONTACT_GROUPS = [
  {
    icon: Phone,
    title: "Phone",
    value: "+255 770 529 612",
    href: ORDER_TEL,
    sub: "We are happy to help.",
  },
  {
    icon: Mail,
    title: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    sub: "For orders & general questions.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dar es Salaam, Tanzania",
    href: undefined,
    sub: "Local delivery available.",
  },
  {
    icon: Briefcase,
    title: "Business Inquiries",
    value: "Partnerships & bulk orders",
    href: undefined,
    sub: "Reach our team by phone or email.",
  },
] as const;

const INPUT_CLS =
  "mt-2 w-full rounded-[10px] border border-[#B9E8F8] bg-white px-4 py-2.5 text-[15px] text-slate-700 shadow-sm placeholder:text-slate-400 outline-none transition-colors focus:border-[#63BCE8] focus:ring-2 focus:ring-[#63BCE8]/25";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");

    const mailSubject = encodeURIComponent(`Website inquiry: ${subject}`);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;
    setSent(true);
  }

  return (
    <section
      id="contact"
      aria-label="Contact us"
      className="relative scroll-mt-24 overflow-hidden bg-[#EAF9FF] py-16 md:py-24"
    >
      {/* Decorative translucent spheres & smooth aqua curves — outer edges only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Water-ripple arcs — top right */}
        <svg
          className="absolute -right-16 -top-16 h-72 w-72 text-[#63BCE8]"
          viewBox="0 0 288 288"
          fill="none"
        >
          <circle cx="144" cy="144" r="70" stroke="currentColor" strokeOpacity="0.20" strokeWidth="1.5" />
          <circle cx="144" cy="144" r="100" stroke="currentColor" strokeOpacity="0.13" strokeWidth="1.5" />
          <circle cx="144" cy="144" r="130" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" />
        </svg>
        {/* Soft glow — top right, gentle parallax drift */}
        <Parallax
          from={-44}
          to={44}
          className="absolute -top-20 right-24 h-56 w-56"
          innerClassName="h-full w-full will-change-transform"
        >
          <div className="h-full w-full rounded-full bg-[#B9E8F8]/40 blur-2xl" />
        </Parallax>
        {/* Smooth flowing curve — top left */}
        <svg
          className="absolute -left-20 top-20 h-60 w-60 text-[#63BCE8]"
          viewBox="0 0 240 240"
          fill="none"
        >
          <path d="M-30 190 C 60 150, 110 80, 230 40" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" />
          <path d="M-30 218 C 70 180, 120 108, 240 66" stroke="currentColor" strokeOpacity="0.10" strokeWidth="1.5" />
        </svg>
        {/* Large translucent sphere — bottom left, counter-drift */}
        <Parallax
          from={36}
          to={-36}
          className="absolute -bottom-28 -left-24 h-80 w-80"
          innerClassName="h-full w-full will-change-transform"
        >
          <div className="h-full w-full rounded-full bg-gradient-to-br from-[#B9E8F8]/70 to-[#63BCE8]/10 blur-md" />
        </Parallax>
        {/* Small sphere accents */}
        <div className="absolute bottom-14 right-12 h-4 w-4 rounded-full bg-[#B9E8F8]/80" />
        <div className="absolute left-10 top-1/2 h-3 w-3 rounded-full bg-[#63BCE8]/25" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: heading + contact information ── */}
          <div>
            <FadeIn y={24}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand">
                Get in Touch
              </p>
            </FadeIn>
            <AnimatedTitle
              text="Let’s Connect"
              delay={0.1}
              className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl"
            />
            <RevealLine
              delay={0.3}
              className="mt-4 h-1 w-14 rounded-full bg-[#63BCE8]"
            />
            <FadeIn delay={0.25} y={24}>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                Questions, orders, or feedback — we&rsquo;d love to hear from
                you. Send a message through the form or reach us directly using
                the details below, and the Sansum Water team will be happy to
                help.
              </p>
            </FadeIn>

            {/* Contact detail groups */}
            <Stagger
              as="ul"
              delay={0.15}
              stagger={0.1}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {CONTACT_GROUPS.map(({ icon: Icon, title, value, href, sub }) => (
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

          {/* ── Right: contact form card ── */}
          <FadeIn
            delay={0.25}
            className="rounded-3xl border border-white bg-white p-6 shadow-[0_24px_60px_-24px_rgba(7,59,102,0.25)] sm:p-8"
          >
            <h3 className="font-heading text-xl font-bold text-navy sm:text-2xl">
              Send Us a Message
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fill in the form below and we&rsquo;ll get back to you as soon as
              possible.
            </p>

            <form onSubmit={handleSubmit} className="mt-6" noValidate={false}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-navy"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-navy"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={INPUT_CLS}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-semibold text-navy"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className={INPUT_CLS}
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold text-navy"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message…"
                  className={`${INPUT_CLS} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="btn-aqua mt-6 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-[#63BCE8] text-base font-semibold text-navy shadow-sm"
              >
                Send Message
              </button>

              {sent && (
                <p
                  role="status"
                  className="mt-3 text-center text-sm font-medium text-brand"
                >
                  Your email app is opening with your message pre-filled.
                </p>
              )}
            </form>

            {/* Secondary order call to action */}
            <div className="mt-6 border-t border-[#B9E8F8]/50 pt-6">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <p className="text-sm text-slate-600">
                  Prefer to order water right away?
                </p>
                <Link
                  href="/order"
                  className="btn-outline-aqua inline-flex h-11 items-center justify-center rounded-[10px] border border-[#0879C9]/40 px-6 text-sm font-semibold text-[#0879C9]"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
