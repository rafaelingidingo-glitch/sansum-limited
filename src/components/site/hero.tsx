import Image from "next/image";
import Link from "next/link";
import { Building2, Package, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderNowButton } from "@/components/site/navbar";
import {
  AnimatedTitle,
  FadeIn,
  Parallax,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";

const TRUST_CHIPS = [
  { icon: Package, label: "3L · 5L · 10L bottles" },
  { icon: ShieldCheck, label: "Quality checked" },
  { icon: Building2, label: "Home & business supply" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
      aria-label="Sansum Water introduction"
    >
      {/* Background image — supplied Sansum hero visual, scroll-linked parallax.
          Inner layer bleeds 64px top/bottom so the ±44px drift never exposes a gap. */}
      <Parallax
        from={-44}
        to={44}
        className="absolute inset-0"
        innerClassName="absolute -inset-y-16 inset-x-0 will-change-transform"
      >
        <Image
          src="/brand/hero-bg.png"
          alt="Sansum Water team member enjoying a bottle of Sansum drinking water beside the full product range, with a branded delivery truck on a lakeside road beneath mountain scenery"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[72%_center] md:object-center"
        />
      </Parallax>

      {/* Legibility overlays — ice white, keeping the photography visible */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/30 to-transparent md:hidden"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-14 sm:px-6 md:pb-28 md:pt-20 lg:px-8">
        <div className="max-w-2xl">
          <AnimatedTitle
            as="h1"
            text="Pure, Refreshing Water for Homes & Businesses"
            highlight="Refreshing"
            delay={0.1}
            className="font-heading text-4xl font-bold leading-[1.12] text-navy sm:text-5xl lg:text-[3.5rem]"
          />

          <FadeIn delay={0.45} y={24} className="mt-5 max-w-xl">
            <p className="text-base leading-relaxed text-slate/90 sm:text-lg">
              Sansum Water brings clean, great-tasting drinking water to your
              door — available in convenient 3, 5 and 10 litre bottles with
              easy-carry handles for families, offices and events.
            </p>
          </FadeIn>

          <Stagger
            as="div"
            delay={0.65}
            stagger={0.12}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <StaggerItem y={24}>
              <OrderNowButton className="h-12 px-7 text-[15px] sm:w-auto" />
            </StaggerItem>
            <StaggerItem y={24}>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-[10px] border-2 border-navy/15 bg-white/70 px-7 text-[15px] font-semibold text-navy backdrop-blur transition-colors hover:border-brand hover:bg-white hover:text-brand"
              >
                <Link href="#products">Explore Our Products</Link>
              </Button>
            </StaggerItem>
          </Stagger>

          <Stagger
            as="ul"
            delay={0.9}
            stagger={0.1}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {TRUST_CHIPS.map(({ icon: Icon, label }) => (
              <StaggerItem
                key={label}
                as="li"
                y={18}
                className="flex items-center gap-2 text-sm font-medium text-navy/85"
              >
                <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                {label}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* Soft wave transition into the next section */}
      <svg
        className="absolute bottom-0 left-0 h-12 w-full text-white sm:h-16"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,48 C240,96 480,0 720,32 C960,64 1200,96 1440,48 L1440,96 L0,96 Z"
        />
      </svg>
    </section>
  );
}
