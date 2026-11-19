import Link from "next/link";
import { ArrowIcon, PracticeGlyph } from "../Icons";
import type { PracticeIcon } from "@/lib/content";

export type ServiceCardItem = {
  href: string;
  title: string;
  summary: string;
  icon: PracticeIcon;
};

// Service card that turns dark on hover; used in the "Other services" carousel and on /services.
export default function ServiceCard({ item: s }: { item: ServiceCardItem }) {
  return (
    <Link
      href={s.href}
      className="group relative flex h-full min-h-[19rem] flex-col overflow-hidden border border-ink/10 bg-white/70 p-8 transition-colors duration-500 hover:bg-ink"
    >
      <span className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full border border-gold/20 transition-transform duration-700 group-hover:scale-150" />
      <PracticeGlyph
        name={s.icon}
        className="h-10 w-10 text-gold transition-transform duration-500 group-hover:-translate-y-1"
      />
      <h3 className="mt-8 font-serif text-2xl font-semibold leading-tight text-ink transition-colors duration-500 group-hover:text-ivory">
        {s.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted transition-colors duration-500 group-hover:text-ivory/70">
        {s.summary}
      </p>
      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
        Explore
        <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
