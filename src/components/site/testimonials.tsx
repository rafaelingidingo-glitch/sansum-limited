import { Quote } from "lucide-react";
import {
  AnimatedTitle,
  FadeIn,
  Parallax,
  RevealLine,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";

const TESTIMONIALS = [
  {
    quote:
      "Sansum Water has become our family's daily choice — fresh, clean water we can rely on every day.",
    role: "Family Customer",
    location: "Dar es Salaam",
  },
  {
    quote:
      "We order regularly for our office. The quality is consistent and the service is always friendly.",
    role: "Business Customer",
    location: "Dar es Salaam",
  },
  {
    quote:
      "Dependable supply and easy ordering make Sansum Water an easy brand to recommend.",
    role: "Retail Partner",
    location: "Dar es Salaam",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers say"
      className="relative overflow-hidden scroll-mt-24 bg-white py-16 md:py-24"
    >
      {/* Soft aqua glows drifting in opposite directions (decorative parallax) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <Parallax
          from={-60}
          to={60}
          className="absolute -left-24 top-10 h-72 w-72"
          innerClassName="h-full w-full will-change-transform"
        >
          <div className="h-full w-full rounded-full bg-ice blur-3xl" />
        </Parallax>
        <Parallax
          from={60}
          to={-60}
          className="absolute -right-24 bottom-6 h-64 w-64"
          innerClassName="h-full w-full will-change-transform"
        >
          <div className="h-full w-full rounded-full bg-skyblue/15 blur-3xl" />
        </Parallax>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-xl text-center">
          <FadeIn y={24}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Testimonials
            </p>
          </FadeIn>
          <AnimatedTitle
            text="What Our Customers Say"
            delay={0.1}
            className="mt-4 font-heading text-3xl font-bold text-navy sm:text-4xl"
          />
          <RevealLine
            origin="center"
            delay={0.3}
            className="mx-auto mt-4 h-1 w-14 rounded-full bg-skyblue"
          />
        </div>

        {/* Testimonial cards */}
        <Stagger
          as="ul"
          stagger={0.12}
          className="mt-10 grid gap-4 sm:gap-6 lg:mt-14 md:grid-cols-3"
        >
          {TESTIMONIALS.map(({ quote, role, location }) => (
            <StaggerItem
              key={role}
              as="li"
              className="card-lift-sm flex flex-col rounded-xl border border-ice bg-white p-6 shadow-sm md:p-7"
            >
              <Quote
                className="h-6 w-6 shrink-0 text-skyblue"
                aria-hidden="true"
              />
              <blockquote className="mt-4 flex-1 text-base leading-7 text-slate">
                {quote}
              </blockquote>
              <div className="mt-6 border-t border-ice pt-4">
                <p className="font-heading text-sm font-semibold text-navy">
                  {role}
                </p>
                <p className="mt-0.5 text-xs text-slate">{location}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
