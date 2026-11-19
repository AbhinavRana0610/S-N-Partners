import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DisclaimerGate from "@/components/DisclaimerGate";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/motion/SplitHeading";
import ServiceCard from "@/components/service/ServiceCard";
import { CallToAction, Eyebrow } from "@/components/Sections";
import { firm } from "@/lib/content";
import { fullName, getPlace, places } from "@/lib/locations";
import { localServiceHref } from "@/lib/localize";
import { services } from "@/lib/services";

export function generateStaticParams() {
  return places.map((p) => ({ location: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/locations/[location]">): Promise<Metadata> {
  const place = getPlace((await params).location);
  if (!place) return {};
  return {
    title: `Our Services in ${place.name} | ${firm.name}`,
    description: `Legal services for clients in ${fullName(place)}, ${place.state}: ${services.map((s) => s.title).join(", ")}.`,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

async function LocationContent({
  params,
}: Pick<PageProps<"/locations/[location]">, "params">) {
  const place = getPlace((await params).location);
  if (!place) notFound();

  return (
    <>
      <section id="top" className="relative overflow-hidden bg-ink text-ivory">
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
                <li>
                  <Link
                    href="/locations"
                    className="transition hover:text-gold-light"
                  >
                    Our Locations
                  </Link>
                </li>
                <li
                  aria-hidden
                  className="h-1.5 w-1.5 rotate-45 border border-gold"
                />
                <li aria-current="page" className="text-gold-light">
                  {place.name}
                </li>
              </ol>
            </nav>
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <Eyebrow light>{place.state}</Eyebrow>
          </Reveal>
          <SplitHeading
            as="h1"
            className="mt-5 font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            {`Our Services in ${place.name}`}
          </SplitHeading>
          <Reveal delay={200} className="mt-8 flex gap-5">
            <span className="mt-2 h-px w-12 shrink-0 bg-gold" />
            <p className="max-w-xl text-lg leading-8 text-ivory/80">
              {pad(services.length)} practice areas for individuals and
              businesses in {fullName(place)}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-28">
        <ul className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 4) * 80} className="h-full">
                <ServiceCard
                  item={{
                    href: localServiceHref(place, s),
                    title: s.title,
                    summary: s.summary,
                    icon: s.icon,
                  }}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default function LocationPage({
  params,
}: PageProps<"/locations/[location]">) {
  return (
    <>
      <DisclaimerGate />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[60vh] bg-ink" />}>
          <LocationContent params={params} />
        </Suspense>
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
