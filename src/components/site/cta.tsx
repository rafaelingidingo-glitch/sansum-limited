import Image from "next/image";
import Link from "next/link";
import {
  AnimatedTitle,
  FadeIn,
  Parallax,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";

/* Call to action — redesigned as a full-bleed advertising shot.
   The supplied model photo (dark studio background) is the section
   background and drifts on a scroll-linked parallax; navy gradient
   overlays keep the copy legible while letting the model and the
   branded bottle shine through on the right / top. */

export default function CallToAction() {
  return (
    <section
      aria-label="Order Sansum Water"
      className="relative overflow-hidden bg-navy"
    >
      {/* Parallax background photo — supplied Sansum model shot */}
      <Parallax
        from={-44}
        to={44}
        className="absolute inset-0"
        innerClassName="absolute -inset-y-16 inset-x-0 will-change-transform"
      >
        <Image
          src="/brand/cta-model.jpg"
          alt="A smiling Sansum Water customer presenting a 3 litre bottle of Sansum purified drinking water"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-[38%_30%]"
        />
      </Parallax>

      {/* Legibility overlays — navy fades that melt the photo into the brand palette */}
      <div aria-hidden="true" className="absolute inset-0 bg-navy/40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/10 md:hidden"
      />

      {/* Content — left column over the solid navy side of the gradient */}
      <div className="relative z-10 mx-auto flex min-h-[440px] w-full max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 md:min-h-[520px] md:py-28 lg:px-8">
        <div className="max-w-xl">
          <AnimatedTitle
            text="Ready for Pure, Refreshing Water?"
            highlight="Refreshing"
            highlightClassName="text-skyblue"
            delay={0.1}
            className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.75rem]"
          />
          <FadeIn delay={0.4} y={24}>
            <p className="mt-4 max-w-lg text-base leading-7 text-ice md:text-lg md:leading-8">
              Order now for your home, office or event — delivery available,
              with sizes for every need.
            </p>
          </FadeIn>

          <Stagger
            as="div"
            delay={0.55}
            stagger={0.12}
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <StaggerItem y={24}>
              <Link
                href="/order"
                aria-label="Order now — go to the Sansum Water order page"
                className="btn-light inline-flex h-12 items-center justify-center rounded-[10px] bg-white px-8 text-base font-semibold text-navy shadow-sm"
              >
                Order Now
              </Link>
            </StaggerItem>
            <StaggerItem y={24}>
              <a
                href="#contact"
                aria-label="Contact Sansum Water Tanzania"
                className="inline-flex h-12 items-center justify-center rounded-[10px] border border-white/30 px-8 text-base font-semibold text-white transition-colors hover:border-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skyblue"
              >
                Contact Us
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
