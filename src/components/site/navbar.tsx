"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Mail, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CONTACT_EMAIL } from "@/components/site/topbar";

export const ORDER_PHONE = "+255770529612";
export const ORDER_TEL = "tel:+255770529612";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Products", href: "#products" },
  { label: "Contact Us", href: "#contact" },
];

export function OrderNowButton({ className = "" }: { className?: string }) {
  return (
    <Button
      asChild
      className={`btn-primary rounded-[10px] bg-brand font-semibold text-white shadow-sm hover:bg-navy focus-visible:ring-skyblue ${className}`}
    >
      <Link href="/order" aria-label="Order now — go to the Sansum Water order page">
        Order Now
      </Link>
    </Button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ice bg-white/85 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link
          href="#home"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-brand"
          aria-label="Sansum Water Tanzania — home"
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

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Order Now */}
        <div className="hidden md:block">
          <OrderNowButton className="px-5" />
        </div>

        {/* Mobile: compact Order Now + menu */}
        <div className="flex items-center gap-2 md:hidden">
          <OrderNowButton className="hidden h-10 px-4 text-sm min-[380px]:inline-flex" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-[10px] border-ice text-navy hover:bg-ice hover:text-brand"
                aria-label="Open navigation menu"
              >
                {open ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-ice bg-white p-0">
              <SheetHeader className="border-b border-ice px-5 py-4 text-left">
                <SheetTitle asChild>
                  <div className="flex items-center gap-2.5">
                    <span className="overflow-hidden rounded-xl ring-1 ring-ice">
                      <Image
                        src="/brand/logo.png"
                        alt=""
                        width={44}
                        height={44}
                        className="h-11 w-11 object-cover"
                      />
                    </span>
                    <span className="font-heading text-base font-semibold text-navy">
                      Sansum Water
                    </span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-5 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-[15px] font-medium text-slate transition-colors hover:bg-ice hover:text-brand"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 border-t border-ice pt-4">
                  <OrderNowButton className="h-12 w-full text-[15px]" />
                  <a
                    href={ORDER_TEL}
                    className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-slate hover:text-brand"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                    {ORDER_PHONE}
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1.5 flex items-center justify-center gap-1.5 text-sm font-medium text-slate hover:text-brand"
                  >
                    <Mail className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
