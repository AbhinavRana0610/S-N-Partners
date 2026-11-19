import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import Parallax from "./motion/Parallax";
import Marquee from "./ui/Marquee";
import ShimmerButton from "./ui/ShimmerButton";
import DrawLine from "./service/DrawLine";
import ServiceCarousel from "./service/ServiceCarousel";
import { ArrowIcon, MailIcon, PhoneIcon, PracticeGlyph } from "./Icons";
import { Eyebrow } from "./Sections";
import { approach, firm, type PracticeIcon } from "@/lib/content";
import { services, type Service } from "@/lib/services";
import type { Place } from "@/lib/locations";
import { localServiceHref } from "@/lib/localize";
import {
  courthouseColumns,
  emblemGold,
  emblemLight,
  gavelDark,
  heroLibrary,
  libraryShelves,
} from "@/lib/images";

// Pages alternate between the site's photographs so neighbouring services don't look identical.
const heroImages = [courthouseColumns, libraryShelves, gavelDark, heroLibrary];
// Matched by slug, since location pages pass a localised copy of the service.
const position = (service: Service) =>
  services.findIndex((s) => s.slug === service.slug);
const pick = (list: StaticImageData[], service: Service) =>
  list[position(service) % list.length];
const pad = (n: number) => String(n).padStart(2, "0");
const indexOf = (service: Service) => position(service) + 1;

// Large numerals drawn as a thin gold outline.
const outlined =
  "font-serif font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(201,168,106,0.35)]";

function RotatingBadge({ icon }: { icon: PracticeIcon }) {
  const text = `${firm.name.toUpperCase()} • ${firm.tagline.toUpperCase()} • `;
  return (
    <div className="relative h-36 w-36 rounded-full bg-ink shadow-2xl shadow-black/40 ring-1 ring-gold/40">
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="motion-safe-only absolute inset-0 h-full w-full"
        style={{ animation: "spin-slow 24s linear infinite" }}
      >
        <defs>
          <path
            id="badge-circle"
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="fill-gold-light text-[7.4px] font-semibold uppercase tracking-[0.18em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-[30%] flex items-center justify-center rounded-full border border-gold/50">
        <PracticeGlyph name={icon} className="h-7 w-7 text-gold-light" />
      </span>
    </div>
  );
}

export function ServiceHero({
  service,
  place,
}: {
  service: Service;
  place?: Place;
}) {
  const n = indexOf(service);
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-ivory">
      {/* Fine vertical rules and a soft glow give the dark field some depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mx-auto grid max-w-7xl grid-cols-4 px-6"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="border-l border-white/[0.04] last:border-r"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]" />
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-16 -left-6 select-none text-[16rem] sm:text-[22rem] ${outlined} opacity-60`}
      >
        {pad(n)}
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-44">
        <div>
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
                {place ? (
                  <>
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
                    <li>
                      <Link
                        href={`/locations/${place.slug}`}
                        className="transition hover:text-gold-light"
                      >
                        {place.name}
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/#practice"
                      className="transition hover:text-gold-light"
                    >
                      Services
                    </Link>
                  </li>
                )}
                <li
                  aria-hidden
                  className="h-1.5 w-1.5 rotate-45 border border-gold"
                />
                <li aria-current="page" className="text-gold-light">
                  {service.title}
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={100} className="mt-12 flex items-center gap-5">
            <Eyebrow light>Our Services</Eyebrow>
            <span className="font-serif text-lg italic text-ivory/50">
              {pad(n)} / {pad(services.length)}
            </span>
          </Reveal>
          <SplitHeading
            as="h1"
            className="mt-5 font-serif text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            {place ? `${service.title} in ${place.name}` : service.title}
          </SplitHeading>
          <Reveal delay={200}>
            <div className="mt-8 flex gap-5">
              <span className="mt-2 h-px w-12 shrink-0 bg-gold" />
              <p className="max-w-xl text-lg leading-8 text-ivory/80">
                {service.tagline}
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ShimmerButton href="#enquiry">
                Schedule a Consultation
                <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
              </ShimmerButton>
              <Link
                href={place ? `/locations/${place.slug}` : "/#practice"}
                className="inline-flex items-center justify-center border border-ivory/30 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ivory transition hover:border-gold hover:text-gold-light"
              >
                All Services
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Arched photograph with an offset gold outline and a rotating badge */}
        <Reveal
          delay={150}
          className="relative mx-auto w-full max-w-[22rem] lg:mr-0 lg:max-w-[25rem]"
        >
          <div className="absolute -right-5 -top-5 h-full w-full rounded-t-full border border-gold/50" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
            <Parallax amount={10} className="absolute -inset-y-[14%] inset-x-0">
              <Image
                src={pick(heroImages, service)}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 400px, 80vw"
                placeholder="blur"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          </div>
          <div className="absolute -bottom-10 -left-8 sm:-left-14">
            <RotatingBadge icon={service.icon} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function OfferingsTicker({ service }: { service: Service }) {
  return (
    <section
      aria-label={`${service.title} at a glance`}
      className="border-b border-gold/25 bg-paper py-6"
    >
      <Marquee duration={40} gap="2.5rem">
        {service.offerings.map((o) => (
          <span
            key={o.title}
            className="flex items-center gap-10 whitespace-nowrap"
          >
            <span className="font-serif text-2xl italic text-ink/80 sm:text-3xl">
              {o.title}
            </span>
            <span className="h-2 w-2 rotate-45 border border-gold" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export function ServiceOverview({
  service,
  place,
}: {
  service: Service;
  place?: Place;
}) {
  const [first, ...rest] = service.overview;
  const stats = [
    { value: pad(service.offerings.length), label: "Focus areas" },
    { value: pad(approach.steps.length), label: "Step approach" },
    { value: pad(services.length), label: "Practice areas" },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>Overview</Eyebrow>
          </Reveal>
          <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {place
              ? `${service.title} for clients in ${place.name}`
              : `${service.title} at SN Partners`}
          </SplitHeading>
          <Reveal delay={150}>
            <p className="mt-8 leading-8 text-muted first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-gold">
              {first}
            </p>
            {rest.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 leading-8 text-muted">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={200}>
            <dl className="mt-12 grid grid-cols-3 border-y border-ink/15">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="border-l border-ink/15 px-4 py-6 first:border-l-0 first:pl-0 sm:px-6"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-5xl font-semibold text-gold sm:text-6xl">
                    {s.value}
                  </dd>
                  <dd className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pl-8">
          <Reveal delay={100}>
            <figure className="relative overflow-hidden bg-ink p-10 text-ivory shadow-[0_30px_60px_-30px_rgba(14,26,43,0.6)]">
              <span
                aria-hidden
                className="absolute -right-2 -top-10 font-serif text-[11rem] leading-none text-gold/15"
              >
                &rdquo;
              </span>
              <span
                aria-hidden
                className="font-serif text-6xl leading-none text-gold"
              >
                &ldquo;
              </span>
              <blockquote className="relative mt-2 font-serif text-3xl italic leading-snug">
                {service.summary}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Image src={emblemGold} alt="" className="h-10 w-auto" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
                  {firm.name}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Who we advise
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {service.clients.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2.5 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ServiceOfferings({
  service,
  place,
}: {
  service: Service;
  place?: Place;
}) {
  return (
    <section className="relative bg-ink py-24 text-ivory lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[120px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Heading stays put while the cards stack up beside it */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow light>How We Help</Eyebrow>
          </Reveal>
          <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            What our {service.title.toLowerCase()} practice covers
            {place && ` in ${place.name}`}
          </SplitHeading>
          <Reveal delay={150}>
            <p className="mt-6 max-w-md leading-8 text-ivory/70">
              Every matter is different. These are some of the areas in which we
              regularly advise and represent clients
              {place ? ` in ${place.name}` : ""}.
            </p>
            <ShimmerButton href="#enquiry" className="mt-10">
              Discuss your matter
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </ShimmerButton>
          </Reveal>
        </div>

        <ol className="space-y-6">
          {service.offerings.map((o, i) => (
            <li
              key={o.title}
              className="lg:sticky"
              style={{ top: `calc(8rem + ${i * 1.25}rem)` }}
            >
              <div className="group relative overflow-hidden border border-gold/20 bg-ink-soft p-8 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.6)] transition-colors duration-500 hover:border-gold/60 sm:p-10">
                <span
                  aria-hidden
                  className={`absolute right-6 top-5 text-[5.5rem] sm:right-8 ${outlined}`}
                >
                  {pad(i + 1)}
                </span>
                <div className="relative flex items-start gap-6">
                  <span className="flex h-12 w-12 shrink-0 rotate-45 items-center justify-center border border-gold/50 transition-colors duration-300 group-hover:bg-gold">
                    <span className="-rotate-45 font-serif text-xl font-semibold text-gold-light transition-colors duration-300 group-hover:text-ink">
                      {pad(i + 1)}
                    </span>
                  </span>
                  <div className="pr-20 sm:pr-28">
                    <h3 className="font-serif text-2xl font-semibold sm:text-3xl">
                      {o.title}
                    </h3>
                    <div className="mt-4 h-px w-10 bg-gold transition-all duration-500 group-hover:w-24" />
                    <p className="mt-4 leading-7 text-ivory/70">{o.text}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const stepIcons: PracticeIcon[] = ["people", "bulb", "briefcase", "scales"];

export function ServiceProcess() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 lg:py-32">
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

        <div className="relative mt-20">
          {/* Desktop: horizontal rail through the markers. Mobile: vertical rail on the left. */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-ink/15 lg:block">
            <DrawLine className="h-full w-full" />
          </div>
          <div className="absolute bottom-8 left-8 top-8 w-px bg-ink/15 lg:hidden">
            <DrawLine axis="y" className="h-full w-full" />
          </div>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-6">
            {approach.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal
                  delay={i * 150}
                  className="group flex gap-8 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                    <span className="absolute inset-2 rotate-45 border border-gold bg-ivory transition-colors duration-500 group-hover:bg-ink" />
                    <PracticeGlyph
                      name={stepIcons[i]}
                      className="relative h-6 w-6 text-gold transition-colors duration-500 group-hover:text-gold-light"
                    />
                  </span>
                  <div className="lg:mt-8">
                    <span className="font-serif text-sm italic text-gold">
                      Step {pad(i + 1)}
                    </span>
                    <h3 className="mt-1 font-serif text-3xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted lg:mx-auto lg:max-w-[15rem]">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
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
              General answers to questions we are often asked. Every situation
              is different, so please speak with us about the specifics of your
              matter.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <div className="relative overflow-hidden bg-ink p-8 text-ivory">
              <Image
                src={emblemLight}
                alt=""
                className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-auto opacity-10"
              />
              <p className="font-serif text-2xl font-semibold">
                Still have questions?
              </p>
              <div className="mt-3 h-px w-10 bg-gold" />
              <ul className="mt-6 space-y-3 text-sm text-ivory/80">
                {firm.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={`tel:+91${p}`}
                      className="flex items-center gap-3 transition hover:text-gold-light"
                    >
                      <PhoneIcon className="h-4 w-4 text-gold" /> +91 {p}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${firm.email}`}
                    className="flex items-center gap-3 transition hover:text-gold-light"
                  >
                    <MailIcon className="h-4 w-4 text-gold" /> {firm.email}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="space-y-4">
            {service.faqs.map((f, i) => (
              <details
                key={f.q}
                className="group border border-ink/10 border-l-2 border-l-transparent bg-white/70 transition-colors duration-300 open:border-l-gold open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-start gap-5 p-6 sm:p-8 [&::-webkit-details-marker]:hidden">
                  <span className="mt-1 font-serif text-lg italic text-gold">
                    {pad(i + 1)}
                  </span>
                  <span className="flex-1 font-serif text-xl font-semibold transition-colors group-hover:text-gold sm:text-2xl">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="relative mt-1.5 h-6 w-6 shrink-0 rounded-full border border-gold/50 transition-transform duration-300 group-open:rotate-45 group-open:bg-gold"
                  >
                    <span className="absolute left-1/2 top-1/2 h-px w-2.5 -translate-x-1/2 -translate-y-1/2 bg-gold group-open:bg-ink" />
                    <span className="absolute left-1/2 top-1/2 h-2.5 w-px -translate-x-1/2 -translate-y-1/2 bg-gold group-open:bg-ink" />
                  </span>
                </summary>
                <p className="-mt-2 px-6 pb-8 pl-[3.6rem] leading-8 text-muted sm:px-8 sm:pl-[4.1rem]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function OtherServices({
  service,
  place,
}: {
  service: Service;
  place?: Place;
}) {
  const others = services
    .filter((s) => s.slug !== service.slug)
    .map((s) => ({
      href: place ? localServiceHref(place, s) : `/services/${s.slug}`,
      title: s.title,
      summary: s.summary,
      icon: s.icon,
    }));

  return (
    <section
      aria-label="Other services"
      className="overflow-hidden border-y border-gold/25 bg-paper py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <Eyebrow>Explore</Eyebrow>
            </Reveal>
            <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {place ? `Other services in ${place.name}` : "Other services"}
            </SplitHeading>
          </div>
          <Reveal delay={150}>
            <Link
              href={place ? `/locations/${place.slug}` : "/#practice"}
              className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-xs font-semibold uppercase tracking-[0.22em] transition hover:border-gold hover:text-gold"
            >
              View all services
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-14">
          <ServiceCarousel items={others} />
        </Reveal>
      </div>
    </section>
  );
}
