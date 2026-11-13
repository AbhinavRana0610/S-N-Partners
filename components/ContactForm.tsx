"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";
import { firm, practiceAreas } from "@/lib/content";

const fieldClass =
  "w-full border border-ink/15 bg-paper px-4 py-3.5 text-base text-ink placeholder:text-muted/70 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted";

// Until a mail service is connected, submitting opens the visitor's email app
// with the enquiry pre-filled and addressed to the firm.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const subject = `Website enquiry${get("matter") ? ` – ${get("matter")}` : ""} – ${get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone") || "—"}`,
      `Matter: ${get("matter") || "—"}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${firm.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="enquiry" className="bg-ivory py-24 lg:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <p className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-10 bg-gold" />
            Contact Us
            <span className="h-px w-10 bg-gold" />
          </p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">Send Us a Message</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
            Share a few details about your matter and our team will get back to you.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <form
            onSubmit={handleSubmit}
            className="mt-12 grid gap-6 border border-ink/10 bg-white/60 p-6 shadow-[0_20px_50px_-30px_rgba(14,26,43,0.35)] sm:grid-cols-2 sm:p-10"
          >
            <div>
              <label htmlFor="cf-name" className={labelClass}>
                Full Name *
              </label>
              <input id="cf-name" name="name" required autoComplete="name" className={fieldClass} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="cf-email" className={labelClass}>
                Email *
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="cf-phone" className={labelClass}>
                Phone
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label htmlFor="cf-matter" className={labelClass}>
                Practice Area
              </label>
              <select id="cf-matter" name="matter" defaultValue="" className={fieldClass}>
                <option value="">Select an area</option>
                {practiceAreas.map((a) => (
                  <option key={a.title} value={a.title}>
                    {a.title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="cf-message" className={labelClass}>
                Message *
              </label>
              <textarea
                id="cf-message"
                name="message"
                required
                rows={5}
                className={`${fieldClass} resize-y`}
                placeholder="Briefly describe how we can help"
              />
            </div>
            <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted" aria-live="polite">
                {sent ? "Your email app should open with your message ready to send." : "* Required fields"}
              </p>
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink shadow-[0_10px_30px_-10px_rgba(201,168,106,0.7)] transition hover:-translate-y-0.5 hover:bg-gold-light"
              >
                Send Message <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
