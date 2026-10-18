import { Droplets, MapPin, Truck } from "lucide-react";
import { Parallax, Stagger, StaggerItem } from "@/components/site/motion";

const HIGHLIGHTS = [
  {
    icon: Droplets,
    title: "Quality You Can Trust",
    description:
      "Every batch goes through careful purification and quality checks before it leaves our plant.",
  },
  {
    icon: Truck,
    title: "Delivery Available",
    description:
      "Reliable doorstep delivery for homes, offices and events across our service area.",
  },
  {
    icon: MapPin,
    title: "Proudly Tanzanian",
    description:
      "A local Dar es Salaam brand, committed to serving our community with clean water.",
  },
];

export default function BrandHighlights() {
  return (
    <section
      id="highlights"
      aria-label="Sansum Water brand highlights"
      className="relative overflow-hidden bg-white py-12 md:py-16"
    >
      {/* Soft aqua glows drifting in opposite directions (decorative parallax) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Parallax
          from={-64}
          to={64}
          className="absolute -left-24 top-4 h-64 w-64"
          innerClassName="h-full w-full will-change-transform"
        >
          <div className="h-full w-full rounded-full bg-ice blur-3xl" />
        </Parallax>
        <Parallax
          from={64}
          to={-64}
          className="absolute -right-20 bottom-2 h-72 w-72"
          innerClassName="h-full w-full will-change-transform"
        >
          <div className="h-full w-full rounded-full bg-skyblue/15 blur-3xl" />
        </Parallax>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Stagger
          as="ul"
          stagger={0.12}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
            <StaggerItem
              key={title}
              as="li"
              className="card-lift-sm group rounded-xl border border-ice bg-white p-5 shadow-sm md:p-6"
            >
              <span className="icon-chip inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-ice text-brand">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-navy md:text-lg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                {description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
