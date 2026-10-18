"use client";

import { Fragment, useRef, type ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

/* ── Shared motion language ────────────────────────────────────────────────
   - Custom cubic-bezier easing (requested curve) for slide/fade entrances
   - Physics-based springs for primary buttons
   - Transform + opacity only → zero layout shift (CLS-safe)
   - `once: true` so animations never replay while scrolling back up
   - Parallax primitive for scroll-linked depth (see Parallax below)
───────────────────────────────────────────────────────────────────────────*/

export const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export const VIEWPORT = { once: true, amount: 0.2 } as const;

const SPRING = { type: "spring", stiffness: 120, damping: 18 } as const;

/* ── Global provider — honors the user's prefers-reduced-motion setting ──*/

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* ── FadeIn — smooth fade-and-slide entrance for any block ───────────────*/

type FadeInProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  spring?: boolean;
  once?: boolean;
};

export function FadeIn({
  children,
  className,
  y = 40,
  delay = 0,
  duration = 0.7,
  spring = false,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={
        spring
          ? { ...SPRING, delay }
          : { duration, ease: EASE, delay }
      }
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger + StaggerItem — orchestrated child entrances ────────────────*/

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  delay?: number;
  stagger?: number;
};

export function Stagger({
  children,
  className,
  as = "div",
  delay = 0,
  stagger = 0.09,
}: StaggerProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  y?: number;
};

export function StaggerItem({
  children,
  className,
  as = "div",
  y = 40,
}: StaggerItemProps) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: EASE },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/* ── AnimatedTitle — word-by-word slide-up reveal with clipping masks ─────
   Each word rises out of its own overflow-hidden mask (slide-up typography).
   The full text stays available to screen readers via aria-label, so the
   animation is purely visual. Layout is identical to static text: words are
   inline-block with real spaces between them, so line wrapping is unchanged.
───────────────────────────────────────────────────────────────────────────*/

const HEADING_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type AnimatedTitleProps = {
  text: string;
  as?: keyof typeof HEADING_TAGS;
  className?: string;
  /** Word(s) to render with the accent color class */
  highlight?: string;
  highlightClassName?: string;
  /** Seconds to wait before the first word rises (hero cascade) */
  delay?: number;
};

const titleContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const titleWord: Variants = {
  hidden: { y: "120%" },
  visible: { y: "0%", transition: { duration: 0.65, ease: EASE } },
};

export function AnimatedTitle({
  text,
  as = "h2",
  className,
  highlight,
  highlightClassName = "text-brand",
  delay = 0,
}: AnimatedTitleProps) {
  const Tag = HEADING_TAGS[as];
  const words = text.split(" ");
  const accents = highlight ? highlight.split(" ") : [];

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        ...titleContainer,
        visible: {
          transition: { staggerChildren: 0.055, delayChildren: delay },
        },
      }}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {/* Mask: overflow-hidden clip + padding/negative margin so
                descenders (g, y, p) are never clipped at rest */}
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                className={`inline-block ${accents.includes(word) ? highlightClassName : ""}`}
                variants={titleWord}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

/* ── Parallax — scroll-linked depth drift ─────────────────────────────────
   The outer div (ref) never moves — it is the stable measuring box and, when
   given overflow-hidden/clip classes, the frame. The inner motion.div shifts
   on the Y axis between `from` px and `to` px as the box traverses the
   viewport (progress 0 → 1), producing the classic “background scrolls
   slower than content” effect.

   Rules of use:
   - transform only → zero layout shift (CLS-safe)
   - always oversize the moving layer (negative inset bleed or image scale)
     so no gap is ever exposed: |from| and |to| must stay below the bleed
   - disabled automatically when the user prefers reduced motion
   - centered ranges (e.g. from=-40, to=40) sit at y=0 at mid-traversal
───────────────────────────────────────────────────────────────────────────*/

type ParallaxProps = {
  children: ReactNode;
  /** Positioning / sizing / clip classes for the stable outer box */
  className?: string;
  /** Classes for the moving inner layer (bleed, will-change, sizing) */
  innerClassName?: string;
  /** Y offset in px at progress 0 (box top hits viewport bottom) */
  from?: number;
  /** Y offset in px at progress 1 (box bottom hits viewport top) */
  to?: number;
};

export function Parallax({
  children,
  className,
  innerClassName,
  from = -40,
  to = 40,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className={innerClassName}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── RevealLine — section underline accent that draws itself in ──────────*/

type RevealLineProps = {
  className?: string;
  origin?: "left" | "center";
  delay?: number;
};

export function RevealLine({
  className,
  origin = "left",
  delay = 0,
}: RevealLineProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ originX: origin === "center" ? 0.5 : 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE, delay }}
    />
  );
}
