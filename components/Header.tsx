"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { firm, nav } from "@/lib/content";
import { ChevronDownIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon, PinIcon } from "./Icons";
import { emblemGold } from "@/lib/images";

const MotionLink = motion.create(Link);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div
        className={`hidden overflow-hidden border-b border-white/10 bg-ink text-ivory/80 transition-all duration-300 lg:block ${
          scrolled ? "max-h-0 border-b-0" : "max-h-12"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-xs tracking-wide">
          <span className="flex items-center gap-2">
            <PinIcon className="h-3.5 w-3.5 text-gold" />
            {firm.address.line1}, {firm.address.line2}
          </span>
          <div className="flex items-center gap-6">
            <a href={`mailto:${firm.email}`} className="flex items-center gap-2 transition hover:text-gold">
              <MailIcon className="h-3.5 w-3.5 text-gold" />
              {firm.email}
            </a>
            <a href={`tel:+91${firm.phones[0]}`} className="flex items-center gap-2 transition hover:text-gold">
              <PhoneIcon className="h-3.5 w-3.5 text-gold" />
              +91 {firm.phones[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-colors duration-300 ${
          solid ? "bg-ink/95 shadow-lg shadow-black/20 backdrop-blur" : "bg-gradient-to-b from-ink/70 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/#top" className="flex items-center gap-3" aria-label={`${firm.name} home`}>
            <Image src={emblemGold} alt="" className="h-10 w-auto" preload />
            <span className="leading-none">
              <span className="block font-serif text-2xl font-bold tracking-wide text-ivory">
                SN PARTNERS
              </span>
              <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.3em] text-gold-light">
                {firm.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    className="relative flex items-center gap-1.5 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ivory/90 transition group-hover:text-gold-light group-focus-within:text-gold-light"
                  >
                    {item.label}
                    <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                  {/* pt-5 bridges the gap so the menu stays open while the pointer moves down */}
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-5 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="grid w-[30rem] grid-cols-2 gap-x-6 border-t-2 border-gold bg-ink/95 px-6 py-5 shadow-xl shadow-black/30 backdrop-blur">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block border-b border-white/10 py-2.5 text-sm text-ivory/85 transition hover:translate-x-1 hover:text-gold-light"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-[0.8rem] font-medium uppercase tracking-[0.18em] text-ivory/90 transition hover:text-gold-light"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
            <Link
              href="/#contact"
              className="border border-gold px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-gold-light transition hover:bg-gold hover:text-ink"
            >
              Consult Us
            </Link>
          </nav>

          <button
            type="button"
            className="text-ivory lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              className="overflow-hidden border-t border-white/10 lg:hidden"
            >
              <motion.div
                className="px-6 pb-8 pt-2"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              >
                {nav.map((item) =>
                  item.children ? (
                    <motion.div
                      key={item.href}
                      variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                      className="border-b border-white/10"
                    >
                      <button
                        type="button"
                        onClick={() => setServicesOpen((o) => !o)}
                        aria-expanded={servicesOpen}
                        className="flex w-full items-center justify-between py-4 font-serif text-xl text-ivory"
                      >
                        {item.label}
                        <ChevronDownIcon
                          className={`h-5 w-5 text-gold transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pb-3 pl-4"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="block py-2 text-base text-ivory/80 transition hover:text-gold-light"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <MotionLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                      className="block border-b border-white/10 py-4 font-serif text-xl text-ivory"
                    >
                      {item.label}
                    </MotionLink>
                  )
                )}
                <motion.div
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  className="mt-6 space-y-3 text-sm text-ivory/80"
                >
                  <a href={`mailto:${firm.email}`} className="flex items-center gap-3">
                    <MailIcon className="h-4 w-4 text-gold" /> {firm.email}
                  </a>
                  {firm.phones.map((p) => (
                    <a key={p} href={`tel:+91${p}`} className="flex items-center gap-3">
                      <PhoneIcon className="h-4 w-4 text-gold" /> +91 {p}
                    </a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
