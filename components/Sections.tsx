import Image from "next/image";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import Parallax from "./motion/Parallax";
import Marquee from "./ui/Marquee";
import ShimmerButton from "./ui/ShimmerButton";
import BorderBeam from "./ui/BorderBeam";
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon, PracticeGlyph } from "./Icons";
import { approach, contact, firm, intro, practiceAreas, values, type PracticeIcon } from "@/lib/content";
import { ladyJustice, courthouseColumns, libraryShelves, emblemGold, gavelDark } from "@/lib/images";

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] ${
        light ? "text-gold-light" : "text-gold"
      }`}
    >
      <span className="h-px w-10 bg-gold" />
      {children}
    </p>
  );
}

export function Values() {
  return (
    <section aria-label="Our values" className="relative z-10 -mt-px bg-ink">
      <div className="mx-auto grid max-w-7xl md:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 120}>
            <div className="group h-full border-white/10 px-8 py-12 transition-colors hover:bg-ink-soft md:border-l md:last:border-r">
              <span className="font-serif text-sm italic text-gold">0{i + 1}</span>
              <h3 className="mt-2 font-serif text-3xl font-semibold text-ivory">{v.title}</h3>
              <div className="mt-4 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
              <p className="mt-4 text-sm leading-7 text-ivory/70">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function PracticeMarquee() {
  return (
    <section aria-label="Practice areas at a glance" className="border-y border-gold/25 bg-paper py-6">
      <Marquee duration={45} gap="2.5rem">
        {practiceAreas.map((area) => (
          <span key={area.title} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-serif text-2xl italic text-ink/80 sm:text-3xl">{area.title}</span>
            <span className="h-2 w-2 rotate-45 border border-gold" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <div className="relative mx-auto max-w-[25.6rem] lg:mx-0">
            <div className="absolute -left-4 -top-4 h-full w-full border border-gold/60 sm:-left-6 sm:-top-6" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Parallax amount={8} className="absolute -inset-y-[12%] inset-x-0">
                <Image
                  src={ladyJustice}
                  alt="Statue of Lady Justice holding the scales"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  placeholder="blur"
                  className="object-cover object-[35%_center]"
                />
              </Parallax>
            </div>
            <div className="absolute -bottom-8 right-0 flex items-center gap-4 bg-ink px-6 py-5 shadow-xl sm:-right-8">
              <Image src={emblemGold} alt="" className="h-10 w-auto" />
              <p className="font-serif text-lg italic leading-tight text-ivory">
                Your Rights,
                <br />
                Our Advocacy
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>{intro.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {intro.heading}
          </SplitHeading>
          <Reveal delay={150}>
            <p className="mt-4 font-serif text-2xl italic text-gold">{intro.lead}</p>
            <div className="mt-6 space-y-5 leading-8 text-muted">
              {intro.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <a
              href="#practice"
              className="group mt-9 inline-flex items-center gap-3 border-b border-ink pb-1 text-xs font-semibold uppercase tracking-[0.22em] transition hover:border-gold hover:text-gold"
            >
              View our expertise
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function PracticeAreas() {
  return (
    <section id="practice" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Areas of Practice</Eyebrow>
            </Reveal>
            <SplitHeading className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Comprehensive counsel across the legal spectrum
            </SplitHeading>
          </div>
          <Reveal delay={150}>
            <p className="max-w-md leading-8 text-muted">
              From the courtroom to the boardroom, our Advocates bring depth and judgment to every matter we handle.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Image panel stays in view while the list scrolls past */}
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-32">
              <div className="relative">
                <div className="absolute -right-4 -top-4 h-full w-full border border-gold/60 sm:-right-6 sm:-top-6" />
                <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <Parallax amount={8} className="absolute -inset-y-[12%] inset-x-0">
                    <Image
                      src={gavelDark}
                      alt="Judge's gavel resting on its sound block"
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      placeholder="blur"
                      className="object-cover object-[40%_center]"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/20 to-ink" />
                  <div className="absolute inset-x-0 top-0 flex items-baseline gap-3 p-8">
                    <span className="font-serif text-6xl font-semibold text-gold-light">
                      {String(practiceAreas.length).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ivory/80">
                      Practice areas
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                    <div className="mb-5 h-px w-12 bg-gold" />
                    <p className="font-serif text-2xl leading-snug text-ivory sm:text-3xl">
                      Need guidance on a matter not listed here?
                    </p>
                    <ShimmerButton href="#contact" className="mt-6">
                      Talk to us
                      <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                    </ShimmerButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <ol className="border-t border-ink/15 lg:col-span-7">
            {practiceAreas.map((area, i) => (
              <li key={area.title} className="border-b border-ink/15">
                <Reveal delay={(i % 4) * 60}>
                  <div className="group relative grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 py-6 transition-colors duration-500 hover:bg-paper sm:grid-cols-[3rem_auto_1fr] sm:items-center sm:gap-x-6 sm:px-4 md:grid-cols-[3rem_auto_minmax(0,14rem)_1fr]">
                    <span className="hidden font-serif text-lg italic text-gold sm:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <PracticeGlyph
                      name={area.icon}
                      className="h-8 w-8 text-gold transition-transform duration-500 group-hover:scale-110"
                    />
                    <h3 className="font-serif text-xl font-semibold transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                      {area.title}
                    </h3>
                    <p className="col-start-2 text-sm leading-7 text-muted sm:col-start-3 md:col-start-4">
                      {area.text}
                    </p>
                    <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
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

const stepIcons: PracticeIcon[] = ["people", "bulb", "briefcase", "scales"];

// Leaf-shaped accents tucked behind the approach photo collage.
function Leaf({ className }: { className: string }) {
  return <span aria-hidden className={`absolute rounded-[0_100%_0_100%] ${className}`} />;
}

export function Approach() {
  return (
    <section id="approach" className="relative overflow-hidden bg-ink py-24 text-ivory lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <Eyebrow light>{approach.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            At S&amp;N Partners, <em className="text-gold-light">{approach.heading.toLowerCase()}</em>
          </SplitHeading>
          <Reveal delay={150}>
            <p className="mt-6 max-w-xl font-semibold leading-8 text-ivory/90">{approach.text}</p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {approach.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 100} className="flex items-start gap-4">
                  <PracticeGlyph name={stepIcons[i]} className="mt-0.5 h-6 w-6 shrink-0 text-gold-light" />
                  <p className="text-sm leading-6 text-ivory/75">
                    <span className="font-semibold text-ivory">{step.title}</span> — {step.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={200}>
            <ShimmerButton href="#contact" className="mt-10">
              Schedule a Consultation
              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </ShimmerButton>
          </Reveal>
        </div>

        {/* Photo collage: one tall pill with two smaller pills stacked beside it */}
        <Reveal delay={150} className="relative mx-auto aspect-[10/11] w-full max-w-[340px] sm:max-w-[460px] lg:mr-0">
          <Leaf className="-left-6 bottom-[4%] h-24 w-24 rotate-12 bg-ink-soft" />
          <Leaf className="-top-4 right-[30%] h-20 w-20 -rotate-12 bg-ink-soft" />
          <Leaf className="-right-6 top-[44%] h-20 w-20 rotate-45 border border-gold/30" />
          <Leaf className="-bottom-5 right-[34%] h-16 w-16 -rotate-45 bg-gold/15" />
          <div className="absolute left-0 top-[10%] h-[80%] w-[54%] overflow-hidden rounded-full ring-1 ring-gold/30">
            <Parallax amount={8} className="absolute -inset-y-[12%] inset-x-0">
              <Image src={courthouseColumns} alt="Columns of a courthouse" fill sizes="(min-width: 1024px) 260px, 50vw" placeholder="blur" className="object-cover" />
            </Parallax>
          </div>
          <div className="absolute right-[4%] top-0 h-[47%] w-[36%] overflow-hidden rounded-full ring-1 ring-gold/30">
            <Image src={ladyJustice} alt="" fill sizes="180px" placeholder="blur" className="object-cover object-[30%_center]" />
          </div>
          <div className="absolute bottom-0 right-[4%] h-[47%] w-[36%] overflow-hidden rounded-full ring-1 ring-gold/30">
            <Image src={gavelDark} alt="" fill sizes="180px" placeholder="blur" className="object-cover" />
          </div>
        </Reveal>
      </div>

    </section>
  );
}

export function CallToAction() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Parallax amount={15} className="absolute -inset-y-[20%] inset-x-0">
        <Image src={libraryShelves} alt="" fill sizes="100vw" placeholder="blur" className="object-cover" />
      </Parallax>
      <div className="absolute inset-0 bg-ink/80" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <Image src={emblemGold} alt="" className="mx-auto h-14 w-auto" />
        </Reveal>
        <SplitHeading
          as="p"
          className="mt-8 font-serif text-3xl italic leading-snug text-ivory sm:text-4xl lg:text-5xl"
        >
          “Whether you need legal advice, representation, or assistance — we are here to help.”
        </SplitHeading>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            {firm.phones.map((p) => (
              <a
                key={p}
                href={`tel:+91${p}`}
                className="inline-flex items-center justify-center gap-3 border border-gold px-7 py-4 text-sm font-semibold tracking-[0.15em] text-gold-light transition hover:bg-gold hover:text-ink"
              >
                <PhoneIcon className="h-4 w-4" /> +91 {p}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const cards = [
    {
      icon: MailIcon,
      label: "Email",
      lines: [
        <a key="e" href={`mailto:${firm.email}`} className="hover:text-gold">
          {firm.email}
        </a>,
      ],
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      lines: firm.phones.map((p) => (
        <a key={p} href={`tel:+91${p}`} className="block hover:text-gold">
          +91 {p}
        </a>
      )),
    },
    {
      icon: PinIcon,
      label: "Office",
      lines: [
        <span key="a1" className="block">
          {firm.address.line1}
        </span>,
        <span key="a2" className="block">
          {firm.address.line2}
        </span>,
      ],
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            {contact.heading}
          </SplitHeading>
          <Reveal delay={150}>
            <p className="mt-6 leading-8 text-muted">{contact.text}</p>

            <div className="mt-10 space-y-px bg-ink/10">
              {cards.map(({ icon: Icon, label, lines }) => (
                <div key={label} className="group flex gap-5 bg-paper py-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/50 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">{label}</p>
                    <div className="mt-1.5 font-serif text-xl font-semibold leading-snug">{lines}</div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 font-serif text-xl italic text-gold">{contact.closing}</p>
          </Reveal>
        </div>

        <Reveal delay={150} className="flex items-center justify-center lg:justify-end">
          {/* Map takes 80% of the column in both directions */}
          <div className="relative h-[80%] min-h-[336px] w-[80%]">
            <div className="absolute -right-3 -top-3 hidden h-full w-full border border-gold/50 sm:block" />
            <div className="relative h-full min-h-[336px]">
              <iframe
                title="S&N Partners office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(firm.mapQuery)}&output=embed`}
                className="h-full min-h-[336px] w-full border-0 grayscale-[60%] transition duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <BorderBeam />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
