import Link from "next/link";
import { ArrowLeft, Droplets } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ice shadow-sm">
        <Droplets className="h-8 w-8 text-brand" aria-hidden="true" />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-brand">
        404 — Page Not Found
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold text-navy sm:text-5xl">
        This page has run dry.
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
        The page you are looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back to pure, refreshing water.
      </p>
      <Link
        href="/"
        className="btn-aqua mt-8 inline-flex h-11 items-center gap-2 rounded-[10px] bg-[#63BCE8] px-6 text-sm font-semibold text-navy shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Home
      </Link>
    </main>
  );
}
