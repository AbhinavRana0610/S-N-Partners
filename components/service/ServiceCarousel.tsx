"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowIcon } from "../Icons";
import ServiceCard, { type ServiceCardItem as Item } from "./ServiceCard";

// Draggable row of service cards with previous / next controls.
export default function ServiceCarousel({ items }: { items: Item[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
  });
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (emblaApi)
      setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

  const button =
    "flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:border-gold hover:bg-gold hover:text-ink";

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="-ml-6 flex touch-pan-y">
          {items.map((s) => (
            <li
              key={s.href}
              className="min-w-0 shrink-0 grow-0 basis-[85%] pl-6 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ServiceCard item={s} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-ink/15" aria-hidden>
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-200"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <button
          type="button"
          aria-label="Previous services"
          className={button}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next services"
          className={button}
          onClick={() => emblaApi?.scrollNext()}
        >
          <ArrowIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
