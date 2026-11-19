// Location versions of the service pages (/locations/[location]/[service]). The service copy from
// services.ts is kept, and location-specific paragraphs and FAQs are wrapped around it.

import { fullName, type Place } from "./locations";
import { services, type Service } from "./services";

// What a single matter in each practice area is called in running text.
const matterNoun: Record<string, string> = {
  "dispute-resolution": "dispute",
  civil: "civil matter",
  criminal: "criminal matter",
  "corporate-commercial": "corporate or commercial matter",
  matrimonial: "matrimonial matter",
  "banking-and-finance": "banking or finance matter",
  "competition-antitrust": "competition law matter",
  "intellectual-property": "intellectual property matter",
  "labour-and-employment": "labour or employment matter",
  "private-client": "private client matter",
  "real-estate": "real estate matter",
  tax: "tax matter",
  technology: "technology law matter",
};

const withArticle = (noun: string) =>
  `${/^[aeiou]/.test(noun) ? "an" : "a"} ${noun}`;

export function matterOf(service: Service) {
  const noun =
    matterNoun[service.slug] ?? `${service.title.toLowerCase()} matter`;
  return { one: withArticle(noun), many: `${noun}s` };
}

export function localizeService(service: Service, place: Place): Service {
  const { name, state, highCourt } = place;
  const full = fullName(place);
  const matter = matterOf(service);

  return {
    ...service,
    tagline: `${service.tagline.replace(/\.$/, "")}, for individuals and businesses in ${full}.`,
    overview: [
      `If you are in ${full} and need help with ${matter.one}, SN Partners can advise you from the first consultation through to the final outcome. We act for individuals, families and businesses across ${name} and the rest of ${state}, and we bring the same preparation to every matter, whatever its size.`,
      ...service.overview,
      `Where ${matter.one} from ${full} has to go before a court or tribunal, we represent clients at the appropriate forum, including the ${highCourt}. Clients in ${name} can therefore rely on one team as their matter moves from advice to proceedings and, where needed, to appeal.`,
    ],
    faqs: [
      {
        q: `Do you take on ${matter.many} in ${name}?`,
        a: `Yes. SN Partners advises and represents clients from ${full} in ${matter.many}. Whether your matter is at an early stage or is already before a court or authority, we can review the papers and explain the options available to you in ${name}.`,
      },
      {
        q: `How do I get started if I am based in ${name}?`,
        a: `Call or email us, or use the enquiry form on this page, with a short description of your matter. We will arrange a consultation and tell you which documents to keep ready, so that clients in ${full} get clear advice without unnecessary delay.`,
      },
      {
        q: `Which court will hear a matter from ${name}?`,
        a: `That depends on the nature and value of the matter. Many cases from ${full} begin before the local courts or a specialised tribunal, with appeals and writ petitions heard by the ${highCourt}. We will tell you which forum applies once we have reviewed the facts.`,
      },
      ...service.faqs,
    ],
  };
}

export const localServiceHref = (
  place: Place,
  service: Pick<Service, "slug">,
) => `/locations/${place.slug}/${service.slug}`;

export const getLocalService = (place: Place, slug: string) => {
  const service = services.find((s) => s.slug === slug);
  return service && localizeService(service, place);
};
