import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DisclaimerGate from "@/components/DisclaimerGate";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CallToAction } from "@/components/Sections";
import {
  OtherServices,
  ServiceFaqs,
  ServiceHero,
  ServiceOfferings,
  ServiceOverview,
  ServiceProcess,
} from "@/components/ServiceSections";
import { firm } from "@/lib/content";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.title} | ${firm.name}`,
    description: service.tagline,
  };
}

// Everything that depends on the slug sits inside <Suspense>, so the header and footer form a shell
// shared by every service page (required by Partial Prefetching).
async function ServiceContent({ params }: Pick<PageProps<"/services/[slug]">, "params">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <ServiceOfferings service={service} />
      <ServiceProcess />
      <ServiceFaqs service={service} />
      <OtherServices service={service} />
      <CallToAction />
      <ContactForm defaultMatter={service.title} />
    </>
  );
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <>
      <DisclaimerGate />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[78vh] bg-ink" />}>
          <ServiceContent params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
