import type { Metadata } from "next";
import Link from "next/link";
import DisclaimerGate from "@/components/DisclaimerGate";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import ServiceCard from "@/components/service/ServiceCard";
import { CallToAction, Eyebrow } from "@/components/Sections";
import { firm } from "@/lib/content";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: `Our Services | ${firm.name}`,
  description: `Practice areas of ${firm.name}: ${services.map((s) => s.title).join(", ")}.`,
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ServicesPage() {
  return (
    <>
      <DisclaimerGate />
      <Header />
      <main className="flex-1">
        <section
          id="top"
          className="relative overflow-hidden bg-ink text-ivory"
        >
          <div className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-40 lg:pb-24 lg:pt-44">
            <Reveal>
              <nav
                aria-label="Breadcrumb"
                className="text-xs uppercase tracking-[0.25em] text-ivory/60"
              >
                <ol className="flex flex-wrap items-center gap-3">
                  <li>
                    <Link href="/" className="transition hover:text-gold-light">
                      Home
                    </Link>
                  </li>
                  <li
                    aria-hidden
                    className="h-1.5 w-1.5 rotate-45 border border-gold"
                  />
                  <li aria-current="page" className="text-gold-light">
                    Our Services
                  </li>
                </ol>
              </nav>
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <Eyebrow light>Practice Areas</Eyebrow>
            </Reveal>
            <SplitHeading
              as="h1"
              className="mt-5 font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              Our Services
            </SplitHeading>
            <Reveal delay={200} className="mt-8 flex gap-5">
              <span className="mt-2 h-px w-12 shrink-0 bg-gold" />
              <p className="max-w-xl text-lg leading-8 text-ivory/80">
                {pad(services.length)} practice areas.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-paper py-24 lg:py-28">
          <ul className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map(({ slug, title, summary, icon }, i) => (
              <li key={slug}>
                <Reveal delay={(i % 4) * 80} className="h-full">
                  <ServiceCard
                    item={{ href: `/services/${slug}`, title, summary, icon }}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
