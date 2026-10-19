"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { disclaimer } from "@/lib/content";
import { emblemGold } from "@/lib/images";
import { STRIKE_EVENT } from "@/lib/events";

const STORAGE_KEY = "snp-disclaimer-accepted";

const noopSubscribe = () => () => {};

function readAccepted() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

// Bar Council of India rules require visitors to acknowledge this before browsing a law firm site.
export default function DisclaimerGate() {
  // The server snapshot reports "accepted" so the prerendered HTML never contains the overlay.
  const storedAccepted = useSyncExternalStore(noopSubscribe, readAccepted, () => true);
  const [acceptedNow, setAcceptedNow] = useState(false);
  const open = !storedAccepted && !acceptedNow;
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const accept = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setAcceptedNow(true);
    window.dispatchEvent(new Event(STRIKE_EVENT));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.15 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
        >
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } }}
            exit={{ opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.35 } }}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto border border-gold/40 bg-paper p-8 shadow-2xl sm:p-10"
          >
            <Image src={emblemGold} alt="" className="mx-auto h-14 w-auto" />
            <h2
              id="disclaimer-title"
              className="mt-5 text-center font-serif text-3xl font-semibold tracking-wide text-ink"
            >
              Disclaimer
            </h2>
            <div className="mx-auto mt-3 h-px w-16 bg-gold" />
            <p className="mt-6 text-sm leading-7 text-muted">{disclaimer}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={accept}
                className="bg-ink px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-gold hover:text-ink"
              >
                I Agree
              </motion.button>
              <a
                href="https://www.google.com"
                className="border border-ink/20 px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-ink"
              >
                I Disagree
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
