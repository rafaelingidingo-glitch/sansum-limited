import { Factory, ShieldCheck, Warehouse } from "lucide-react";
import {
  AnimatedTitle,
  FadeIn,
  Parallax,
  RevealLine,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";

const STEPS = [
  {
    icon: Factory,
    title: "Automated Bottling Line",
    text: "Every bottle is filled, capped and packed by modern machinery on our production line.",
  },
  {
    icon: ShieldCheck,
    title: "Careful Handling",
    text: "Clean, careful handling at every stage of production, from filling to finished packs.",
  },
  {
    icon: Warehouse,
    title: "Storage & Delivery Ready",
    text: "Finished bottles are packed, palletized and stored — ready to move to our customers.",
  },
];

export default function ManufacturingProcess() {
  return (
    <section
      id="process"
      aria-label="Inside our manufacturing process"
      className="scroll-mt-24 bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div>
            <FadeIn y={24}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                Our Process
              </p>
            </FadeIn>
            <AnimatedTitle
              text="Inside Our Manufacturing Process"
              delay={0.1}
              className="mt-4 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl"
            />
            <RevealLine
              delay={0.3}
              className="mt-4 h-1 w-14 rounded-full bg-skyblue"
            />
            <FadeIn delay={0.25} y={24}>
              <p className="mt-6 text-base leading-7 text-slate md:text-lg md:leading-8">
                Step inside our facility and see how Sansum Water is produced —
                from the bottling line to storage, every bottle moves through a
                modern, well-organised production process.
              </p>
            </FadeIn>

            <Stagger
              as="ul"
              delay={0.15}
              stagger={0.12}
              className="mt-8 space-y-5"
            >
              {STEPS.map(({ icon: Icon, title, text }) => (
                <StaggerItem
                  key={title}
                  as="li"
                  className="flex items-start gap-4"
                >
                  <span className="icon-chip mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-ice text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-navy md:text-lg">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate md:text-base md:leading-7">
                      {text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Vertical feature video — whole column drifts gently on scroll
              for depth against the static text column */}
          <Parallax
            from={-26}
            to={26}
            className="relative mx-auto w-full max-w-sm lg:max-w-[380px]"
          >
            <FadeIn delay={0.2}>
              <div className="card-lift-sm overflow-hidden rounded-3xl border border-ice bg-navy shadow-lg">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/brand/manufacturing-poster.jpg"
                  aria-label="Video tour of the Sansum Water bottling and production process"
                  className="aspect-[9/16] w-full object-cover"
                >
                  <source src="/brand/manufacturing.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="mt-4 text-center text-sm text-slate">
                Sansum Water production facility — Dar es Salaam
              </p>
            </FadeIn>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
