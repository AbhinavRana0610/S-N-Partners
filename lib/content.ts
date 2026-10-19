// All copy for the home page lives here so it can be edited without touching layout code.

export const firm = {
  name: "S&N Partners",
  tagline: "Your Rights, Our Advocacy",
  email: "info@snpartners.in",
  phones: ["8587018691", "9999829223"],
  address: {
    line1: "17th Central Lane, Babar Road",
    line2: "Bengali Market, New Delhi – 110001",
  },
  mapQuery: "Central Lane, Babar Road, Bengali Market, New Delhi 110001",
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Practice Areas", href: "#practice" },
  { label: "Our Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export const values = [
  {
    title: "Professionalism",
    text: "Rigorous preparation and disciplined advocacy in every brief we take on.",
  },
  {
    title: "Integrity",
    text: "Candid advice and ethical conduct that our clients can rely on, always.",
  },
  {
    title: "Efficiency",
    text: "Focused strategies that respect your time, resources and objectives.",
  },
];

export const intro = {
  eyebrow: "Introduction",
  heading: "Welcome to S&N Partners",
  lead: "A Full-Service Law Firm.",
  paragraphs: [
    "Our firm specializes in a wide range of practice areas, including Civil Law, Criminal Law, Arbitration, Dispute Resolution, Real Estate, Taxation, Labour and Employment Laws, and the Drafting of Agreements and Contracts. With a team of outstanding Advocates dedicated to upholding justice and serving our clients with integrity, we strive to make a positive impact in the legal landscape.",
    "We have a proven track record of delivering high-quality legal services to our clients, with a focus on Professionalism, Integrity, and Efficiency. Whether you need legal advice, representation, or assistance, we are here to help you achieve the best possible outcome for your case.",
  ],
};

export type PracticeIcon =
  | "scales"
  | "landmark"
  | "shield"
  | "briefcase"
  | "rings"
  | "bank"
  | "chart"
  | "bulb"
  | "people"
  | "user"
  | "building"
  | "receipt"
  | "chip";

export const practiceAreas: { title: string; text: string; icon: PracticeIcon }[] = [
  { title: "Dispute Resolution", icon: "scales", text: "Litigation, arbitration and mediation strategies built to resolve conflicts decisively." },
  { title: "Civil", icon: "landmark", text: "Representation in civil suits, recovery, injunctions and appellate proceedings." },
  { title: "Criminal", icon: "shield", text: "Defence and prosecution support from bail and trial through to appeals." },
  { title: "Corporate / Commercial", icon: "briefcase", text: "Advisory on transactions, governance, agreements and commercial contracts." },
  { title: "Matrimonial", icon: "rings", text: "Sensitive handling of divorce, custody, maintenance and family settlements." },
  { title: "Banking and Finance", icon: "bank", text: "Counsel on lending, security, recovery and regulatory compliance." },
  { title: "Competition / Antitrust", icon: "chart", text: "Guidance on competition law compliance, investigations and filings." },
  { title: "Intellectual Property", icon: "bulb", text: "Protection and enforcement of trademarks, copyright and other IP rights." },
  { title: "Labour & Employment", icon: "people", text: "Employment contracts, workplace disputes and labour law compliance." },
  { title: "Private Client", icon: "user", text: "Wills, succession, trusts and personal legal matters handled discreetly." },
  { title: "Real Estate", icon: "building", text: "Title due diligence, property transactions, leases and property disputes." },
  { title: "Tax", icon: "receipt", text: "Direct and indirect tax advisory, assessments and tax litigation." },
  { title: "Technology", icon: "chip", text: "Legal support on technology contracts, data and digital businesses." },
];

export const approach = {
  eyebrow: "Our Approach",
  heading: "Our clients' interests always come first.",
  text: "We understand the importance of personalized attention and clear communication, which is why we take the time to listen to your concerns, understand your objectives, and tailor our strategies to align with your goals.",
  steps: [
    { title: "We Listen", text: "Every engagement begins with hearing your concerns in full." },
    { title: "We Understand", text: "We take the time to understand your objectives and priorities." },
    { title: "We Tailor", text: "Strategies are shaped around your goals, not a template." },
    { title: "We Guide", text: "We stay with you through every step of the legal process." },
  ],
};

export const contact = {
  eyebrow: "Get in Touch",
  heading: "Speak with our team",
  text: "For all your legal inquiries, consultations, or representation needs, reach out to us. Our team is here to guide you through every step of the legal process and empower you with the knowledge and resources you need to make informed decisions.",
  closing: "We look forward to hearing from you and working with you.",
};

export const disclaimer =
  "As per the rules of the Bar Council of India, S&N Partners is not permitted to solicit work or advertise. By proceeding, you acknowledge that you are seeking information about S&N Partners of your own accord and that there has been no form of solicitation, advertisement or inducement by the firm or its members. The content of this website is for informational purposes only and should not be interpreted as legal advice. Accessing this website or communicating through it does not create a lawyer–client relationship.";
