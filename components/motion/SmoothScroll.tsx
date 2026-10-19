"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

// Lenis drives the scroll; GSAP's ticker drives Lenis so ScrollTrigger stays in sync with it.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // The Lenis instance is created after this effect runs, so read it on every tick.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.09, anchors: { offset: -80 } }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
