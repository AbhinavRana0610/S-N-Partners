import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DisclaimerGate from "@/components/DisclaimerGate";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CallToAction } from "@/components/Sections";
import {
  OfferingsTicker,
  OtherServices,
  ServiceFaqs,
  ServiceHero,
  ServiceOfferings,
  ServiceOverview,
  ServiceProcess,
} from "@/components/ServiceSections";
import { firm } from "@/lib/content";
import { getPlace, places } from "@/lib/locations";
import { getLocalService } from "@/lib/localize";
import { services } from "@/lib/services";

type Props = PageProps<"/locations/[location]/[service]">;

export function generateStaticParams() {
  return places.flatMap((p) =>
    services.map((s) => ({ location: p.slug, service: s.slug })),
  );
}

async function resolve(params: Props["params"]) {
  const { location, service } = await params;
  const place = getPlace(location);
  const local = place && getLocalService(place, service);
  return place && local ? { place, service: local } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await resolve(params);
  if (!found) return {};
  return {
    title: `${found.service.title} in ${found.place.name} | ${firm.name}`,
    description: found.service.tagline,
  };
}

// Same layout as /services/[slug], with copy and links for the chosen location.
async function LocalServiceContent({ params }: Pick<Props, "params">) {
  const found = await resolve(params);
  if (!found) notFound();
  const { place, service } = found;

  return (
    <>
      <ServiceHero service={service} place={place} />
      <OfferingsTicker service={service} />
      <ServiceOverview service={service} place={place} />
      <ServiceOfferings service={service} place={place} />
      <ServiceProcess />
      <ServiceFaqs service={service} />
      <OtherServices service={service} place={place} />
      <CallToAction />
      <ContactForm defaultMatter={service.title} />
    </>
  );
}

export default function LocalServicePage({ params }: Props) {
  return (
    <>
      <DisclaimerGate />
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[78vh] bg-ink" />}>
          <LocalServiceContent params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
