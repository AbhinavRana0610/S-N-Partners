import type { Metadata } from "next";
import Link from "next/link";
import DisclaimerGate from "@/components/DisclaimerGate";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { PinIcon } from "@/components/Icons";
import { CallToAction, Eyebrow } from "@/components/Sections";
import { firm } from "@/lib/content";
import { locationCount, locationGroups, stateList } from "@/lib/locations";

export const metadata: Metadata = {
  title: `Our Locations | ${firm.name}`,
  description: `${firm.name} serves clients across ${stateList}.`,
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function LocationsPage() {
  const offsets = locationGroups.map((_, gi) =>
    locationGroups.slice(0, gi).reduce((s, g) => s + g.places.length, 0),
  );
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
                    Our Locations
                  </li>
                </ol>
              </nav>
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <Eyebrow light>Where We Practise</Eyebrow>
            </Reveal>
            <SplitHeading
              as="h1"
              className="mt-5 font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
            >
              Our Locations
            </SplitHeading>
            <Reveal delay={200} className="mt-8 flex gap-5">
              <span className="mt-2 h-px w-12 shrink-0 bg-gold" />
              <p className="max-w-xl text-lg leading-8 text-ivory/80">
                {pad(locationCount)} locations across {stateList}.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-paper py-24 lg:py-28">
          <div className="mx-auto max-w-7xl space-y-20 px-6">
            {locationGroups.map((group, gi) => (
              <div key={group.state}>
                <Reveal className="flex flex-col justify-between gap-4 border-b border-gold/30 pb-6 sm:flex-row sm:items-end">
                  <h2 className="font-serif text-4xl font-semibold sm:text-5xl">
                    {group.state}
                  </h2>
                  <span className="font-serif text-lg italic text-ink/50">
                    {pad(group.places.length)} locations
                  </span>
                </Reveal>
                <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.places.map((place, i) => (
                    <li key={place.slug}>
                      <Reveal delay={(i % 4) * 80} className="h-full">
                        <Link
                          href={`/locations/${place.slug}`}
                          className="block h-full"
                          aria-label={`Our services in ${place.name}`}
                        >
                          <SpotlightCard className="border border-gold/25 bg-white shadow-sm">
                            <div className="flex h-full flex-col p-7">
                              <div className="flex items-center justify-between">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold">
                                  <PinIcon className="h-5 w-5" />
                                </span>
                                <span className="font-serif text-3xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(201,168,106,0.6)]">
                                  {pad(offsets[gi] + i + 1)}
                                </span>
                              </div>
                              <h3 className="mt-8 font-serif text-2xl font-semibold leading-snug">
                                {place.label}
                              </h3>
                              <p className="mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                                {group.state}
                              </p>
                            </div>
                          </SpotlightCard>
                        </Link>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
