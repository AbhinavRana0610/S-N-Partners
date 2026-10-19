"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Gold call-to-action with a light sweep, in the style of Magic UI's <ShimmerButton>.
export default function ShimmerButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink shadow-[0_10px_30px_-10px_rgba(201,168,106,0.7)] transition-colors hover:bg-gold-light ${className}`}
    >
      <span
        aria-hidden
        className="motion-safe-only pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
        style={{ animation: "shimmer 3.2s ease-in-out infinite" }}
      />
      <span className="relative flex items-center gap-3">{children}</span>
    </motion.a>
  );
}
