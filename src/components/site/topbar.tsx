import { Mail, Phone, Truck } from "lucide-react";

export const CONTACT_EMAIL = "customer@sansum.co.tz";
export const CONTACT_PHONE_DISPLAY = "+255 770 529 612";

export default function TopBar() {
  return (
    <div
      className="hidden bg-navy text-white sm:block"
      role="region"
      aria-label="Company notices and contact details"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-[11px] font-medium sm:justify-between sm:px-6 sm:text-xs lg:px-8">
        {/* Left — delivery notice */}
        <p className="flex items-center gap-1.5 text-ice">
          <Truck className="h-3.5 w-3.5 text-skyblue" aria-hidden="true" />
          Delivery Available
        </p>

        {/* Right — verified contact channels */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
          <a
            href="tel:+255770529612"
            className="-mx-1 -my-2 flex items-center gap-1.5 px-1 py-2 text-ice transition-colors hover:text-skyblue"
          >
            <Phone className="h-3.5 w-3.5 text-skyblue" aria-hidden="true" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="-mx-1 -my-2 flex items-center gap-1.5 px-1 py-2 text-ice transition-colors hover:text-skyblue"
          >
            <Mail className="h-3.5 w-3.5 text-skyblue" aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}
