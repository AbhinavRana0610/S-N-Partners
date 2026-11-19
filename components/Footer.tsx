"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { firm, nav, practiceAreas, serviceSlug } from "@/lib/content";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { emblemLight } from "@/lib/images";

const noopSubscribe = () => () => {};

// The footer moves Corporate / Commercial to the end so its two-line title doesn't break the grid.
// Tax and Technology take its earlier places.
const footerTitles = [
  "Dispute Resolution",
  "Civil",
  "Criminal",
  "Tax",
  "Matrimonial",
  "Banking and Finance",
  "Competition / Antitrust",
  "Intellectual Property",
  "Labour & Employment",
  "Private Client",
  "Real Estate",
  "Technology",
  "Corporate / Commercial",
];
const footerAreas = [
  ...footerTitles.flatMap((t) => practiceAreas.filter((a) => a.title === t)),
  // Any practice area added later still shows up.
  ...practiceAreas.filter((a) => !footerTitles.includes(a.title)),
];

export default function Footer() {
  // The page is prerendered, so the current year is read on the client.
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );

  return (
    <footer className="bg-ink text-ivory/75">
      <div className="h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.4fr_1.2fr]">
        <div className="flex w-48 flex-col items-center text-center text-ivory">
          <Image src={emblemLight} alt="" className="h-20 w-auto" />
          <p className="mt-3 font-serif text-2xl font-bold tracking-wide">SN PARTNERS</p>
          <div className="mt-1.5 flex w-full items-center gap-1.5" aria-hidden>
            <span className="h-1.5 w-1.5 rotate-45 border border-ivory" />
            <span className="h-px flex-1 bg-ivory" />
            <span className="h-1.5 w-1.5 rotate-45 border border-ivory" />
          </div>
          <p className="mt-2 font-serif text-sm font-semibold uppercase italic tracking-[0.25em]">{firm.tagline}</p>
        </div>

        <div>
          <h3 className="font-serif text-xl font-semibold text-ivory">Quick Links</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-gold-light">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations" className="transition hover:text-gold-light">
                Our Locations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl font-semibold text-ivory">Practice Areas</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {footerAreas.map((a) => (
              <li key={a.title}>
                <Link href={`/services/${serviceSlug(a.title)}`} className="transition hover:text-gold-light">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl font-semibold text-ivory">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {firm.address.line1},
                <br />
                {firm.address.line2}
              </span>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${firm.email}`} className="transition hover:text-gold-light">
                {firm.email}
              </a>
            </li>
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {firm.phones.map((p, i) => (
                  <a key={p} href={`tel:+91${p}`} className="transition hover:text-gold-light">
                    +91 {p}
                    {i < firm.phones.length - 1 && ", "}
                  </a>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {firm.name}. All rights reserved.
          </p>
          <p className="max-w-2xl md:text-right">
            The information on this website is for general purposes only and does not constitute legal advice or
            solicitation.
          </p>
        </div>
      </div>
    </footer>
  );
}
