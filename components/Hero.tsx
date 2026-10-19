"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowIcon } from "./Icons";
import ShimmerButton from "./ui/ShimmerButton";
import { heroLibrary, courthouseColumns, gavelDark } from "@/lib/images";
import { useMediaQuery } from "@/lib/useMediaQuery";

// three.js only loads on large screens, after the page is interactive.
const Gavel3D = dynamic(() => import("./three/Gavel3D"), { ssr: false });

const slides = [
  {
    image: heroLibrary,
    eyebrow: "Welcome to S&N Partners",
    lines: ["Your Rights,", "Our Advocacy."],
    text: "A full-service law firm in New Delhi, delivering high-quality legal services with professionalism, integrity and efficiency.",
  },
  {
    image: courthouseColumns,
    eyebrow: "Dispute Resolution · Civil · Criminal",
    lines: ["Upholding justice,", "serving with integrity."],
    text: "A team of outstanding Advocates committed to achieving the best possible outcome for every case we take on.",
  },
  {
    image: gavelDark,
    eyebrow: "Your interests come first",
    lines: ["Counsel that listens,", "strategy that delivers."],
    text: "Personalized attention and clear communication, with strategies tailored to align with your goals.",
  },
];

const textVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } },
};
const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 45 }, [
    Fade(),
    Autoplay({ delay: 7000, stopOnInteraction: false }),
  ]);
  const [active, setActive] = useState(0);
  const showGavel = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const goTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const slide = slides[active];

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      {/* Background slides (Embla, fade transition) */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div key={i} className="relative h-full min-w-0 flex-[0_0_100%]" aria-hidden={i !== active}>
              <Image
                src={s.image}
                alt=""
                fill
                sizes="100vw"
                quality={85}
                placeholder="blur"
                preload={i === 0}
                className={`object-cover ${i === active ? "animate-kenburns" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />

      {/* 3D gavel */}
      {showGavel && (
        <div className="absolute inset-y-0 right-0 hidden w-[50%] pt-20 lg:block">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[110px]" />
          <Gavel3D />
        </div>
      )}

      <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={textVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="max-w-3xl lg:max-w-[42rem]"
          >
            <motion.p
              variants={itemVariants}
              className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-light"
            >
              <span className="h-px w-12 bg-gold" />
              {slide.eyebrow}
            </motion.p>
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.08] text-ivory sm:text-6xl xl:text-[4.75rem]">
              {slide.lines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span variants={lineVariants} className={`block ${i === 1 ? "italic text-gold-light" : ""}`}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p variants={itemVariants} className="mt-7 max-w-xl text-base leading-8 text-ivory/80 sm:text-lg">
              {slide.text}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-auto mt-10 flex flex-col gap-4 sm:flex-row">
          <ShimmerButton href="#contact">
            Schedule a Consultation
            <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
          </ShimmerButton>
          <a
            href="#practice"
            className="inline-flex items-center justify-center border border-ivory/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ivory backdrop-blur-sm transition hover:border-gold hover:text-gold-light"
          >
            Explore Practice Areas
          </a>
        </div>

        <div
          className="pointer-events-auto absolute bottom-10 left-6 flex items-center gap-3"
          role="tablist"
          aria-label="Hero slides"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-[3px] transition-all duration-500 ${i === active ? "w-14 bg-gold" : "w-7 bg-ivory/40 hover:bg-ivory/70"}`}
            />
          ))}
          <span className="ml-3 font-serif text-sm tracking-widest text-ivory/60">
            0{active + 1} / 0{slides.length}
          </span>
        </div>

        <a
          href="#about"
          className="pointer-events-auto absolute bottom-10 right-6 hidden items-center gap-3 text-[0.65rem] uppercase tracking-[0.35em] text-ivory/60 transition hover:text-gold-light md:flex"
        >
          Scroll
          <span className="relative h-12 w-px overflow-hidden bg-ivory/20">
            <span className="motion-safe-only absolute inset-x-0 top-0 h-1/2 animate-[scrollCue_2s_ease-in-out_infinite] bg-gold" />
          </span>
        </a>
      </div>
    </section>
  );
}
