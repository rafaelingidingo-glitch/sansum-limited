import Image from "next/image";
import { OrderNowButton } from "@/components/site/navbar";
import {
  AnimatedTitle,
  FadeIn,
  Parallax,
  RevealLine,
  Stagger,
  StaggerItem,
} from "@/components/site/motion";

const PRODUCTS = [
  {
    name: "Mshangazi",
    size: "1 Litre",
    price: "TZS 1,000",
    src: "/products/1l.png",
    alt: "Sansum Mshangazi 1 litre purified drinking water bottle with blue cap and carry handle",
  },
  {
    name: "SANSUM PLUS",
    size: "3 Litres",
    price: "TZS 3,000",
    src: "/products/3l.png",
    alt: "Sansum Plus 3 litre purified drinking water bottle with water splash",
  },
  {
    name: "SANSUM MAX",
    size: "5 Litres",
    price: "TZS 5,000",
    src: "/products/5l.png",
    alt: "Sansum Max 5 litre purified drinking water bottle with carry handle",
  },
  {
    name: "SANSUM FAMILY",
    size: "10 Litres",
    price: "TZS 10,000",
    src: "/products/10l.png",
    alt: "Sansum Family 10 litre purified drinking water bottle with carry handle",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      aria-label="Sansum Water products"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ice py-16 md:py-20"
    >
      {/* Uploaded water-droplet background (decorative) with a gentle parallax drift.
          Inner layer bleeds 56px top/bottom, covering the ±36px drift. */}
      <Parallax
        from={-36}
        to={36}
        className="absolute inset-0 -z-10"
        innerClassName="absolute -inset-y-14 inset-x-0 will-change-transform"
      >
        <Image
          src="/products/products-bg.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      </Parallax>
      {/* Soft white veil keeps the section minimal/premium and text legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white/60 via-white/30 to-white/75"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-xl text-center">
          <AnimatedTitle
            text="Our Products"
            className="font-heading text-3xl font-bold text-navy sm:text-4xl"
          />
          <RevealLine
            origin="center"
            delay={0.25}
            className="mx-auto mt-4 h-1 w-14 rounded-full bg-skyblue"
          />
          <FadeIn delay={0.3} y={24}>
            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
              Pure refreshment for every moment.
            </p>
          </FadeIn>
        </div>

        {/* Product cards */}
        <Stagger
          as="ul"
          stagger={0.1}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-14 lg:grid-cols-4"
        >
          {PRODUCTS.map(({ name, size, price, src, alt }) => (
            <StaggerItem
              key={name}
              as="li"
              className="card-lift group flex flex-col overflow-hidden rounded-xl border border-ice bg-white shadow-sm md:rounded-2xl"
            >
              {/* Bottle image */}
              <div className="relative h-44 overflow-hidden bg-gradient-to-b from-ice via-white to-white p-4 sm:h-56 md:h-72 md:p-6">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="product-zoom object-contain p-4 md:p-6"
                />
              </div>

              {/* Details */}
              <div className="flex flex-1 flex-col items-center border-t border-ice p-4 text-center md:p-6">
                <h3 className="font-heading text-base font-semibold text-navy md:text-lg">
                  {name}
                </h3>
                <span className="mt-2 inline-flex items-center rounded-full bg-ice px-3 py-0.5 text-[11px] font-semibold tracking-wide text-brand md:text-xs">
                  {size}
                </span>
                <p className="mt-3 font-heading text-lg font-bold text-brand md:text-xl">
                  {price}
                  <span className="ml-1 text-[11px] font-medium text-slate md:text-xs">
                    / bottle
                  </span>
                </p>
                <div className="mt-4 w-full md:mt-5">
                  <OrderNowButton className="h-10 w-full text-sm md:h-11" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
