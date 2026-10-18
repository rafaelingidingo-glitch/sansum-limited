import Image from "next/image";
import { BadgeCheck, Droplets, HeartHandshake, PackageCheck } from "lucide-react";
import {
  AnimatedTitle,
  FadeIn,
  Parallax,
  RevealLine,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";

const COMMITMENTS = [
  {
    icon: Droplets,
    title: "Purified Drinking Water",
    text: "Clean, purified drinking water in every bottle we produce.",
  },
  {
    icon: BadgeCheck,
    title: "Consistent Quality",
    text: "The same careful process is followed for every bottle — from the first to the last.",
  },
  {
    icon: PackageCheck,
    title: "Securely Sealed & Packed",
    text: "Bottles are sealed and packed with care, ready for homes, offices and events.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    text: "Your happiness matters to us — we stand behind every bottle we deliver.",
  },
];

export default function QualityCommitment() {
  return (
    <section
      id="quality"
      aria-label="Our quality commitment"
      className="scroll-mt-24 bg-ice py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content (first on mobile, right column on desktop) */}
          <div className="lg:order-last">
            <FadeIn y={24}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                Quality Commitment
              </p>
            </FadeIn>
            <AnimatedTitle
              text="Quality in Every Bottle"
              delay={0.1}
              className="mt-4 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl"
            />
            <RevealLine
              delay={0.3}
              className="mt-4 h-1 w-14 rounded-full bg-skyblue"
            />
            <FadeIn delay={0.25} y={24}>
              <p className="mt-6 text-base leading-7 text-slate md:text-lg md:leading-8">
                Quality is at the heart of everything we do. From purification to
                bottling, packing and delivery, every stage of our process is
                handled with care and attention to detail.
              </p>
            </FadeIn>
            <FadeIn delay={0.35} y={24}>
              <p className="mt-4 text-base leading-7 text-slate md:text-lg md:leading-8">
                We believe that quality, consistency and customer satisfaction
                are essential in every bottle we deliver — so families and
                businesses can enjoy Sansum Water with confidence.
              </p>
            </FadeIn>

            <Stagger
              as="ul"
              delay={0.15}
              stagger={0.1}
              className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2"
            >
              {COMMITMENTS.map(({ icon: Icon, title, text }) => (
                <StaggerItem
                  key={title}
                  as="li"
                  className="flex items-start gap-3.5"
                >
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-white text-brand shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-navy">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate">{text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Uploaded brand photo (left column on desktop) — the photo drifts
              gently inside its clipped frame while the frame itself stays put. */}
          <FadeIn delay={0.2} className="lg:order-first">
            <div className="card-lift-sm overflow-hidden rounded-3xl border border-white shadow-lg">
              <Parallax
                from={-18}
                to={18}
                className="relative"
                innerClassName="will-change-transform"
              >
                <Image
                  src="/brand/woman-hero.jpg"
                  alt="A smiling woman presenting a bottle of Sansum purified drinking water"
                  width={1672}
                  height={941}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full scale-[1.14] object-cover object-left"
                />
              </Parallax>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
