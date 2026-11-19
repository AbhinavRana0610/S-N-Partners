"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// A gold line that draws itself as its parent scrolls through the viewport.
export default function DrawLine({
  axis = "x",
  className = "",
}: {
  axis?: "x" | "y";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const prop = axis === "x" ? "scaleX" : "scaleY";
        gsap.fromTo(
          ref.current,
          { [prop]: 0 },
          {
            [prop]: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current?.parentElement,
              start: "top 75%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={`bg-gold ${axis === "x" ? "origin-left" : "origin-top"} ${className}`}
    />
  );
}
