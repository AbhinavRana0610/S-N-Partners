import { serviceSlug } from "./content";

export type Place = {
  /** Text shown on the location card, as supplied. */
  label: string;
  /** Name used in headings and running copy. */
  name: string;
  /** Other name people search for, e.g. Gurgaon for Gurugram. */
  aka?: string;
  slug: string;
  state: string;
  highCourt: string;
};

type PlaceInput = string | { label: string; name: string; aka?: string };

const groups: { state: string; highCourt: string; places: PlaceInput[] }[] = [
  {
    state: "Delhi",
    highCourt: "Delhi High Court",
    places: [
      "Central Delhi",
      "Central North Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Old Delhi",
      "Outer North Delhi",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
  },
  {
    state: "Haryana",
    highCourt: "Punjab and Haryana High Court",
    places: [
      { label: "Gurugram", name: "Gurugram", aka: "Gurgaon" },
      "Faridabad",
      "Sonipat",
      "Jhajjar",
      "Rewari",
      "Palwal",
      { label: "Nuh (Mewat)", name: "Nuh", aka: "Mewat" },
      "Rohtak",
      "Panipat",
      "Karnal",
    ],
  },
  {
    state: "Uttar Pradesh",
    highCourt: "Allahabad High Court",
    places: [
      "Ghaziabad",
      {
        label: "Gautam Buddha Nagar (Noida, Greater Noida)",
        name: "Gautam Buddha Nagar",
        aka: "Noida and Greater Noida",
      },
      "Meerut",
      "Baghpat",
      "Hapur",
    ],
  },
];

export const locationGroups = groups.map(({ state, highCourt, places }) => ({
  state,
  places: places.map((p): Place => {
    const { label, name, aka } =
      typeof p === "string" ? { label: p, name: p, aka: undefined } : p;
    return { label, name, aka, slug: serviceSlug(name), state, highCourt };
  }),
}));

export const places: Place[] = locationGroups.flatMap((g) => g.places);
export const getPlace = (slug: string) => places.find((p) => p.slug === slug);
export const locationCount = places.length;

// "Delhi, Haryana & Uttar Pradesh"
const states = locationGroups.map((g) => g.state);
export const stateList =
  states.length > 1
    ? `${states.slice(0, -1).join(", ")} & ${states.at(-1)}`
    : states.join("");

/** "Gurugram (Gurgaon)" */
export const fullName = (p: Place) => (p.aka ? `${p.name} (${p.aka})` : p.name);
