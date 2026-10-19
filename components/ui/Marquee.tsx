import type { ReactNode } from "react";

// Infinite horizontal ticker in the style of Magic UI's <Marquee>. Content is rendered twice for a seamless loop.
export default function Marquee({
  children,
  duration = 40,
  gap = "3rem",
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  gap?: string;
  className?: string;
}) {
  return (
    <div
      className={`group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
      style={{ "--gap": gap, gap } as React.CSSProperties}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="motion-safe-only flex shrink-0 items-center justify-around group-hover:[animation-play-state:paused]"
          style={{ gap, animation: `marquee ${duration}s linear infinite` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
