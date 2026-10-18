import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedTitle, FadeIn, Parallax } from "@/components/site/motion";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Sansum Water Limited"
      className="relative scroll-mt-24 overflow-hidden bg-white xl:aspect-[1376/768]"
    >
      {/* Uploaded About background — arcs + four intersecting circles, preserved as-is.
          Full-bleed at every breakpoint; anchored left below xl so text sits on the clean arc area.
          Subtle ±20px parallax keeps the artwork aligned with the text column while adding depth. */}
      <div aria-hidden="true" className="absolute inset-0">
        <Parallax
          from={-20}
          to={20}
          className="absolute inset-0"
          innerClassName="absolute -inset-y-8 inset-x-0 will-change-transform"
        >
          <Image
            src="/brand/about-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-left xl:object-center"
          />
        </Parallax>
      </div>

      {/* Text content — left empty area of the artwork */}
      <div className="relative xl:absolute xl:inset-0 xl:flex xl:items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:px-6 md:py-24 xl:py-0">
          <div className="max-w-lg xl:max-w-xl">
            {/* Label — uppercase aqua-blue with skyblue underline accent */}
            <FadeIn y={24}>
              <p className="font-heading text-2xl font-bold uppercase tracking-[0.22em] text-brand md:text-3xl">
                About{" "}
                <span className="relative inline-block">
                  Us
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-skyblue"
                  />
                </span>
              </p>
            </FadeIn>

            {/* Main heading */}
            <AnimatedTitle
              text="Refreshing Lives Through Pure Quality Water."
              delay={0.1}
              className="mt-6 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl xl:text-[2.75rem] xl:leading-[1.18]"
            />

            {/* Description */}
            <FadeIn delay={0.3} y={24}>
              <p className="mt-5 text-base leading-7 text-slate md:text-lg md:leading-8">
                Sansum Water Limited is committed to providing refreshing,
                high-quality drinking water for everyday life. We believe that
                quality, consistency, and customer satisfaction are essential in
                every bottle we deliver.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} y={24}>
              <p className="mt-4 text-base leading-7 text-slate md:text-lg md:leading-8">
                Our focus is to make refreshing drinking water accessible to
                individuals, families, and businesses while building lasting
                trust through our commitment to quality.
              </p>
            </FadeIn>

            {/* Call to action */}
            <FadeIn delay={0.35} y={24} spring className="mt-8 inline-block">
              <Button
                asChild
                className="btn-primary rounded-[10px] bg-brand px-7 text-sm font-semibold text-white shadow-sm hover:bg-navy focus-visible:ring-skyblue md:text-base"
              >
                <a href="#products" aria-label="Discover more about Sansum Water">
                  Discover More
                </a>
              </Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
