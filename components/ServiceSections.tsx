import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import Parallax from "./motion/Parallax";
import ShimmerButton from "./ui/ShimmerButton";
import SpotlightCard from "./ui/SpotlightCard";
import { ArrowIcon, ChevronDownIcon, PracticeGlyph } from "./Icons";
import { Eyebrow } from "./Sections";
import { approach, type PracticeIcon } from "@/lib/content";
import { services, type Service } from "@/lib/services";
import { courthouseColumns, emblemGold, gavelDark, heroLibrary, ladyJustice, libraryShelves } from "@/lib/images";

// Pages alternate between the site's photographs so neighbouring services don't look identical.
const heroImages = [courthouseColumns, libraryShelves, gavelDark, heroLibrary];
const sideImages = [ladyJustice, gavelDark, courthouseColumns, libraryShelves];
const pick = (list: StaticImageData[], service: Service) => list[services.indexOf(service) % list.length];

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section id="top" className="relative flex min-h-[78vh] items-end overflow-hidden bg-ink text-ivory">
      <Parallax amount={12} className="absolute -inset-y-[15%] inset-x-0">
        <Image
          src={pick(heroImages, service)}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <PracticeGlyph
        name={service.icon}
        aria-hidden
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 text-gold/10 lg:block"
        strokeWidth={0.6}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-44 lg:pb-24">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.25em] text-ivory/60">
            <ol className="flex flex-wrap items-center gap-3">
              <li>
                <Link href="/" className="transition hover:text-gold-light">
                  Home
                </Link>
              </li>
              <li aria-hidden className="h-1.5 w-1.5 rotate-45 border border-gold" />
              <li>
                <Link href="/#practice" className="transition hover:text-gold-light">
                  Services
                </Link>
              </li>
              <li aria-hidden className="h-1.5 w-1.5 rotate-45 border border-gold" />
              <li aria-current="page" className="text-gold-light">
                {service.title}
              </li>
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <Eyebrow light>Our Services</Eyebrow>
        </Reveal>
        <SplitHeading
          as="h1"
          className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          {service.title}
        </SplitHeading>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/80">{service.tagline}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ShimmerButton href="#enquiry">
              Schedule a Consultation
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </ShimmerButton>
            <Link
              href="/#practice"
              className="inline-flex items-center justify-center border border-ivory/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ivory transition hover:border-gold hover:text-gold-light"
            >
              All Services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceOverview({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <Eyebrow>Overview</Eyebrow>
          </Reveal>
          <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {service.title} at SN Partners
          </SplitHeading>
          <Reveal delay={150}>
            <p className="mt-4 font-serif text-2xl italic text-gold">{service.summary}</p>
            <div className="mt-6 space-y-5 leading-8 text-muted">
              {service.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="relative mx-auto max-w-[25.6rem] lg:ml-auto lg:mr-0">
            <div className="absolute -right-4 -top-4 h-full w-full border border-gold/60 sm:-right-6 sm:-top-6" />
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <Parallax amount={8} className="absolute -inset-y-[12%] inset-x-0">
                <Image
                  src={pick(sideImages, service)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  placeholder="blur"
                  className="object-cover object-[35%_center]"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">Who we advise</p>
                <ul className="mt-4 space-y-2.5">
                  {service.clients.map((c) => (
                    <li key={c} className="flex items-center gap-3 font-serif text-xl text-ivory">
                      <span className="h-1.5 w-1.5 shrink-0 rotate-45 border border-gold" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="absolute -left-4 -top-8 flex items-center gap-4 bg-ink px-6 py-5 shadow-xl sm:-left-8">
              <PracticeGlyph name={service.icon} className="h-9 w-9 text-gold" />
              <Image src={emblemGold} alt="" className="h-9 w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceOfferings({ service }: { service: Service }) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-ivory lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <Eyebrow light>How We Help</Eyebrow>
            </Reveal>
            <SplitHeading className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              What our {service.title.toLowerCase()} practice covers
            </SplitHeading>
          </div>
          <Reveal delay={150}>
            <p className="max-w-md leading-8 text-ivory/70">
              Every matter is different. These are some of the areas in which we regularly advise and represent clients.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {service.offerings.map((o, i) => (
            <li key={o.title} className="bg-ink">
              <Reveal delay={(i % 3) * 100} className="h-full">
                <SpotlightCard className="px-8 py-10">
                  <span className="font-serif text-sm italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-ivory">{o.title}</h3>
                  <div className="mt-4 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                  <p className="mt-4 text-sm leading-7 text-ivory/70">{o.text}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const stepIcons: PracticeIcon[] = ["people", "bulb", "briefcase", "scales"];

export function ServiceProcess() {
  return (
    <section className="bg-ivory py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              <span className="h-px w-10 bg-gold" />
              {approach.eyebrow}
              <span className="h-px w-10 bg-gold" />
            </p>
          </Reveal>
          <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            How we work on your matter
          </SplitHeading>
          <Reveal delay={150}>
            <p className="mt-5 leading-8 text-muted">{approach.text}</p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {approach.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 120} className="group relative h-full px-6 text-center lg:border-l lg:border-ink/15 lg:last:border-r">
                <span className="mx-auto flex h-16 w-16 items-center justify-center border border-gold/50 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                  <PracticeGlyph name={stepIcons[i]} className="h-7 w-7" />
                </span>
                <span className="mt-6 block font-serif text-sm italic text-gold">0{i + 1}</span>
                <h3 className="mt-1 font-serif text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceFaqs({ service }: { service: Service }) {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Common Questions</Eyebrow>
          </Reveal>
          <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Frequently asked questions
          </SplitHeading>
          <Reveal delay={150}>
            <p className="mt-6 leading-8 text-muted">
              General answers to questions we are often asked. Every situation is different, so please speak with us
              about the specifics of your matter.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="border-t border-ink/15">
            {service.faqs.map((f) => (
              <details key={f.q} className="group border-b border-ink/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl font-semibold transition-colors hover:text-gold sm:text-2xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDownIcon className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="pb-6 pr-10 leading-8 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function OtherServices({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);
  return (
    <section aria-label="Other services" className="border-y border-gold/25 bg-paper py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <Eyebrow>Explore</Eyebrow>
            </Reveal>
            <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Other services
            </SplitHeading>
          </div>
          <Reveal delay={150}>
            <Link
              href="/#practice"
              className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-xs font-semibold uppercase tracking-[0.22em] transition hover:border-gold hover:text-gold"
            >
              View all services
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-14 grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s, i) => (
            <li key={s.slug} className="border-b border-r border-ink/15">
              <Reveal delay={(i % 4) * 60} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full items-center gap-4 px-6 py-6 transition-colors duration-500 hover:bg-ivory"
                >
                  <PracticeGlyph
                    name={s.icon}
                    className="h-7 w-7 shrink-0 text-gold transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="font-serif text-xl font-semibold transition-colors duration-300 group-hover:text-gold">
                    {s.title}
                  </span>
                  <ArrowIcon className="ml-auto h-4 w-4 shrink-0 text-gold opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
