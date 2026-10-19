"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

// Card with a soft gold glow that follows the cursor, in the style of Aceternity's card spotlight / Magic UI's <MagicCard>.
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgba(201,168,106,0.22), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(220px circle at ${x}px ${y}px, rgba(201,168,106,0.9), transparent 70%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative h-full overflow-hidden ${className}`}
    >
      {/* Glowing 1px border that lights up near the cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] p-px"
        style={{ background: border }}
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
