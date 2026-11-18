// Copy for the individual service pages at /services/[slug]. Each entry is matched to the practice
// area of the same title in content.ts, which supplies its icon and one-line summary.

import { practiceAreas, serviceSlug, type PracticeIcon } from "./content";

export type ServiceDetail = {
  title: string;
  tagline: string;
  overview: string[];
  offerings: { title: string; text: string }[];
  clients: string[];
  faqs: { q: string; a: string }[];
};

const details: ServiceDetail[] = [
  {
    title: "Dispute Resolution",
    tagline: "Resolving conflicts through litigation, arbitration and mediation, with a clear strategy from the outset.",
    overview: [
      "Disputes rarely arrive at a convenient time. Our Dispute Resolution practice helps individuals and businesses assess their position early, weigh the available forums and pursue the route most likely to protect their interests, whether that is negotiation, mediation, arbitration or litigation.",
      "We appear before trial courts, the High Courts, tribunals and arbitral panels, and we advise on the enforcement of decrees and awards. Throughout, we focus on keeping clients informed about the strengths, risks, timelines and costs of each option.",
    ],
    offerings: [
      { title: "Commercial Litigation", text: "Suits arising from contracts, supply arrangements, partnerships and business relationships." },
      { title: "Domestic Arbitration", text: "Drafting arbitration clauses, conducting proceedings and representation under the Arbitration and Conciliation Act, 1996." },
      { title: "Mediation & Conciliation", text: "Structured, confidential settlement processes, including pre-institution mediation for commercial disputes." },
      { title: "Challenges to Awards", text: "Applications to set aside or enforce arbitral awards before the appropriate courts." },
      { title: "Interim Relief", text: "Urgent injunctions, attachment and protective orders to preserve assets and status quo." },
      { title: "Execution Proceedings", text: "Enforcing decrees and awards so that a favourable outcome translates into actual recovery." },
    ],
    clients: ["Businesses and promoters", "Individuals and families", "Contractors and suppliers", "Partnership firms"],
    faqs: [
      { q: "Is arbitration always faster than going to court?", a: "Often, but not always. Arbitration can offer more control over timelines and procedure, but its speed depends on the agreement, the tribunal and the conduct of the parties. We assess which forum suits a particular dispute." },
      { q: "Can a dispute be settled after a case has been filed?", a: "Yes. Parties can settle at any stage, and courts frequently refer matters to mediation. A negotiated settlement can be recorded so that it is binding and enforceable." },
      { q: "What should I keep ready before our first meeting?", a: "Any contracts, correspondence, invoices, notices and a short timeline of events. These help us understand the dispute and advise on the next steps quickly." },
    ],
  },
  {
    title: "Civil",
    tagline: "Representation in civil suits, recovery actions, injunctions and appeals, handled with care and preparation.",
    overview: [
      "Civil disputes touch everyday life: property, money, contracts, inheritance and the rights of individuals against one another. Our Civil practice represents clients at every stage, from issuing a legal notice and drafting pleadings to trial, appeal and execution.",
      "We prepare each matter thoroughly, assessing evidence and limitation at the outset, so that clients understand where they stand and what a realistic outcome looks like.",
    ],
    offerings: [
      { title: "Civil Suits", text: "Suits for declaration, possession, partition, specific performance and damages." },
      { title: "Money Recovery", text: "Recovery suits, including summary suits under Order XXXVII of the Code of Civil Procedure." },
      { title: "Injunctions", text: "Temporary and permanent injunctions to restrain unlawful acts and protect rights." },
      { title: "Legal Notices", text: "Drafting and replying to legal notices that set out a clear position from the start." },
      { title: "Appeals & Revisions", text: "First and second appeals, revisions and review petitions before the appropriate courts." },
      { title: "Writ Petitions", text: "Petitions before the High Court against arbitrary action by public authorities." },
    ],
    clients: ["Individuals and families", "Landowners and tenants", "Small and medium businesses", "Housing societies"],
    faqs: [
      { q: "Is there a time limit for filing a civil suit?", a: "Yes. The Limitation Act, 1963 prescribes time limits that vary with the type of claim. Some claims must be brought within a year or three years of the cause of action, so it is best to seek advice early." },
      { q: "Do I need to send a legal notice before filing a suit?", a: "It is not mandatory in every case, but it is often advisable, and in suits against the government a prior notice is generally required. A notice also gives the other side an opportunity to resolve the matter." },
      { q: "How long does a civil case take?", a: "Timelines depend on the court, the complexity of the matter and the evidence involved. We give clients an honest estimate at the outset and explore interim relief or settlement where appropriate." },
    ],
  },
  {
    title: "Criminal",
    tagline: "Defence and prosecution support from bail and trial through to appeals, with discretion at every step.",
    overview: [
      "Being involved in a criminal matter, as an accused person or as a complainant, can be distressing. Our Criminal practice offers prompt, discreet counsel and representation, from the first stage of an investigation through trial and appeal.",
      "We advise and act under the Bharatiya Nyaya Sanhita, the Bharatiya Nagarik Suraksha Sanhita and the Bharatiya Sakshya Adhiniyam, as well as the earlier codes where they still apply, and under special statutes. Our aim is to protect our clients' rights while keeping them informed of every development.",
    ],
    offerings: [
      { title: "Bail & Anticipatory Bail", text: "Applications for regular, interim and anticipatory bail before the Sessions Courts and High Courts." },
      { title: "Trial Defence", text: "Representation through charge, evidence and final arguments in criminal trials." },
      { title: "Quashing Petitions", text: "Petitions before the High Court to quash FIRs and proceedings where the law permits." },
      { title: "Complaints & Prosecution", text: "Assisting complainants with complaints, FIRs and private prosecution." },
      { title: "Cheque Bounce Matters", text: "Complaints and defence under Section 138 of the Negotiable Instruments Act, 1881." },
      { title: "Economic Offences", text: "Matters involving fraud, cheating, breach of trust and allied white-collar allegations." },
    ],
    clients: ["Individuals and families", "Company directors and officers", "Complainants and victims", "Professionals"],
    faqs: [
      { q: "What should I do if I expect to be arrested?", a: "Seek legal advice immediately. Depending on the facts, an application for anticipatory bail may be appropriate. Avoid making statements before you have spoken to a lawyer." },
      { q: "Which law applies to my case after the new criminal codes?", a: "The new codes came into force on 1 July 2024. Offences committed and proceedings started before that date may still be governed by the earlier laws. We review the dates and stage of each matter to advise on which provisions apply." },
      { q: "Can a criminal case be withdrawn or settled?", a: "Certain offences are compoundable and can be settled between the parties, sometimes with the court's permission. In other cases the High Court may quash proceedings in appropriate circumstances." },
    ],
  },
  {
    title: "Corporate / Commercial",
    tagline: "Practical advice on transactions, governance and the contracts that keep a business running.",
    overview: [
      "Businesses need legal advice that keeps pace with commercial decisions. Our Corporate and Commercial practice supports founders, companies and investors on incorporation, governance, transactions and the day-to-day agreements on which a business depends.",
      "We focus on clear drafting and practical risk allocation, so that documents work in the real world and help prevent disputes rather than create them.",
    ],
    offerings: [
      { title: "Business Set-up", text: "Choosing a structure, incorporating companies and LLPs, and drafting constitutional documents." },
      { title: "Commercial Contracts", text: "Drafting and negotiating supply, distribution, service, agency and franchise agreements." },
      { title: "Shareholder Arrangements", text: "Shareholders' and joint venture agreements that set out rights, exits and dispute mechanisms." },
      { title: "Corporate Governance", text: "Board processes, compliance under the Companies Act, 2013, and secretarial support." },
      { title: "Mergers & Acquisitions", text: "Due diligence, share and asset purchase documentation, and closing support." },
      { title: "Investment Documentation", text: "Term sheets and investment agreements for founders and investors." },
    ],
    clients: ["Start-ups and founders", "Private companies", "Investors", "Family-owned businesses"],
    faqs: [
      { q: "Should I set up a company or an LLP?", a: "It depends on your plans for funding, ownership, compliance and tax. Companies suit businesses seeking equity investment, while LLPs can offer flexibility with lighter compliance. We help you weigh the options." },
      { q: "Why does a business need written contracts?", a: "Written contracts record what was agreed, allocate risk and provide a roadmap if something goes wrong. Clear contracts are one of the most effective ways to avoid disputes." },
      { q: "What is due diligence?", a: "A review of a business's legal, financial and regulatory position before a transaction. It identifies risks so that they can be priced, negotiated or addressed in the documents." },
    ],
  },
  {
    title: "Matrimonial",
    tagline: "Sensitive, confidential handling of divorce, custody, maintenance and family settlements.",
    overview: [
      "Family disputes are among the most personal matters a person can face. Our Matrimonial practice approaches every case with sensitivity and discretion, helping clients understand their rights and options under the personal laws that apply to them.",
      "Where possible, we encourage amicable resolution through negotiation and mediation. Where litigation is necessary, we represent clients firmly before the Family Courts and other forums, with the welfare of any children kept firmly in view.",
    ],
    offerings: [
      { title: "Divorce", text: "Mutual consent and contested divorce proceedings under the applicable personal laws." },
      { title: "Child Custody", text: "Custody, guardianship and visitation matters focused on the welfare of the child." },
      { title: "Maintenance", text: "Claims for maintenance and alimony for spouses, children and parents." },
      { title: "Domestic Violence", text: "Protection, residence and monetary relief under the Protection of Women from Domestic Violence Act, 2005." },
      { title: "Settlements", text: "Negotiated family settlements and mediation to resolve disputes amicably." },
      { title: "Restitution & Annulment", text: "Petitions for restitution of conjugal rights, judicial separation and annulment." },
    ],
    clients: ["Spouses", "Parents and guardians", "Families", "Non-resident Indians"],
    faqs: [
      { q: "How long does a mutual consent divorce take?", a: "The law generally provides a waiting period between the first and second motions, which courts may waive in suitable cases. The overall duration depends on the court and the facts of the case." },
      { q: "Who decides child custody?", a: "The court decides custody based on the welfare of the child, considering factors such as the child's age, needs, education and, in appropriate cases, the child's own preference." },
      { q: "Will my matter be kept confidential?", a: "We treat all family matters with strict confidentiality. Many matrimonial proceedings are also conducted in camera to protect the privacy of the parties." },
    ],
  },
  {
    title: "Banking and Finance",
    tagline: "Counsel on lending, security, recovery and regulatory compliance for lenders and borrowers alike.",
    overview: [
      "Our Banking and Finance practice advises lenders, borrowers and guarantors on financing arrangements, security, recovery and restructuring. We work across the documentation and dispute sides of the practice, so our advice draws on how transactions play out when they come under stress.",
      "We advise and appear in matters under the SARFAESI Act, 2002, the Recovery of Debts and Bankruptcy Act, 1993 and the Insolvency and Bankruptcy Code, 2016, before the Debt Recovery Tribunals and the National Company Law Tribunal.",
    ],
    offerings: [
      { title: "Loan Documentation", text: "Facility agreements, security documents, guarantees and inter-creditor arrangements." },
      { title: "Debt Recovery", text: "Recovery proceedings before the Debt Recovery Tribunals and civil courts." },
      { title: "SARFAESI Matters", text: "Advising secured creditors and borrowers on enforcement of security interests." },
      { title: "Insolvency", text: "Representation of creditors and debtors in proceedings under the IBC before the NCLT." },
      { title: "Restructuring", text: "One-time settlements, restructuring proposals and negotiations with lenders." },
      { title: "Regulatory Advice", text: "Guidance on RBI directions applicable to lending and NBFC operations." },
    ],
    clients: ["Banks and NBFCs", "Corporate borrowers", "Guarantors and promoters", "Individual borrowers"],
    faqs: [
      { q: "What can a borrower do after receiving a SARFAESI notice?", a: "A borrower may make representations to the lender within the prescribed time, and may approach the Debt Recovery Tribunal against measures taken by the lender. Timely advice is important." },
      { q: "What is the difference between DRT and NCLT proceedings?", a: "DRT proceedings are focused on recovering debts, while NCLT proceedings under the IBC address the insolvency resolution of the debtor as a whole. The choice of forum has significant consequences for all parties." },
      { q: "Can a loan dispute be settled?", a: "Yes. Many lenders offer one-time settlement schemes, and negotiated restructuring is often possible. We help clients evaluate and negotiate such proposals." },
    ],
  },
  {
    title: "Competition / Antitrust",
    tagline: "Guidance on competition law compliance, investigations and merger filings.",
    overview: [
      "Competition law shapes how businesses price, distribute, collaborate and grow. Our Competition practice helps clients understand the Competition Act, 2002, assess commercial arrangements for risk and respond to enquiries from the Competition Commission of India.",
      "We advise on agreements with competitors and trading partners, conduct by businesses with significant market positions and the notification of combinations. Our aim is to help clients pursue their commercial goals with confidence.",
    ],
    offerings: [
      { title: "Compliance Programmes", text: "Risk assessments, policies and training tailored to a business's sector and practices." },
      { title: "Agreement Review", text: "Reviewing distribution, supply and collaboration arrangements for anti-competitive risks." },
      { title: "Abuse of Dominance", text: "Advising on pricing, refusals to deal and other conduct by businesses with market power." },
      { title: "Merger Control", text: "Assessing notifiability and preparing filings for combinations before the CCI." },
      { title: "Investigations", text: "Responding to CCI information requests and investigations by the Director General." },
      { title: "Complaints", text: "Assisting businesses that have been harmed by anti-competitive conduct." },
    ],
    clients: ["Companies and groups", "Trade associations", "Distributors and suppliers", "Investors"],
    faqs: [
      { q: "Does competition law apply to smaller businesses?", a: "Yes. Prohibitions on cartels and certain vertical restraints apply regardless of size, although merger control thresholds and dominance concerns typically affect larger enterprises." },
      { q: "When does a transaction need CCI approval?", a: "Combinations that cross the thresholds in the Competition Act, including the deal value threshold, must be notified unless an exemption applies. We assess this early in the transaction timeline." },
      { q: "Can trade association meetings create risk?", a: "They can, if competitors exchange sensitive information such as prices or capacity. Clear agendas, minutes and guidelines help manage this risk." },
    ],
  },
  {
    title: "Intellectual Property",
    tagline: "Protecting and enforcing trademarks, copyright and other intellectual property rights.",
    overview: [
      "Ideas, brands and creative work are often among a business's most valuable assets. Our Intellectual Property practice helps clients secure their rights through registration, put them to commercial use through licensing and enforce them against infringement.",
      "We advise on trademarks, copyright, designs and confidential information, and we act in infringement and passing off actions before the courts.",
    ],
    offerings: [
      { title: "Trademark Registration", text: "Searches, filings, examination responses and oppositions before the Trade Marks Registry." },
      { title: "Copyright", text: "Registration, assignment and protection of literary, artistic, musical and software works." },
      { title: "Designs", text: "Registration and protection of industrial designs under the Designs Act, 2000." },
      { title: "Licensing & Assignment", text: "Agreements that let clients commercialise their intellectual property securely." },
      { title: "Infringement Actions", text: "Suits for infringement and passing off, including urgent interim injunctions." },
      { title: "Domain & Online Disputes", text: "Addressing domain name disputes, counterfeits and online infringement." },
    ],
    clients: ["Brand owners", "Start-ups", "Creators and publishers", "Technology businesses"],
    faqs: [
      { q: "Why should I register my trademark?", a: "Registration gives you exclusive statutory rights in the mark for the registered goods or services and makes it easier to act against infringers. Unregistered marks can be protected through passing off, but proving rights is harder." },
      { q: "Is copyright registration mandatory?", a: "No. Copyright exists automatically on creation of an original work. Registration, however, serves as useful evidence of ownership if a dispute arises." },
      { q: "What can I do if someone copies my brand?", a: "Options include a cease-and-desist notice, opposition or rectification proceedings, and a suit for infringement or passing off with interim relief. We assess the most effective route." },
    ],
  },
  {
    title: "Labour & Employment",
    tagline: "Employment contracts, workplace disputes and labour law compliance for employers and employees.",
    overview: [
      "A well-managed workforce depends on clear terms and fair processes. Our Labour and Employment practice advises employers and employees on contracts, policies, compliance and disputes, including the transition to India's new labour codes.",
      "We help clients prevent issues through sound documentation and policies, and represent them before labour authorities, tribunals and courts when disputes arise.",
    ],
    offerings: [
      { title: "Employment Documentation", text: "Appointment letters, employment agreements, handbooks and workplace policies." },
      { title: "Labour Code Compliance", text: "Advice on wages, social security, industrial relations and working conditions." },
      { title: "POSH Compliance", text: "Policies, Internal Committee set-up and enquiries under the POSH Act, 2013." },
      { title: "Terminations", text: "Structuring separations, disciplinary enquiries and retrenchment in line with the law." },
      { title: "Workplace Disputes", text: "Representation before labour courts, industrial tribunals and civil courts." },
      { title: "Restrictive Covenants", text: "Confidentiality, non-solicitation and non-compete clauses and their enforceability." },
    ],
    clients: ["Employers", "Senior executives", "Employees", "HR teams"],
    faqs: [
      { q: "Are non-compete clauses enforceable in India?", a: "Post-employment non-compete clauses are generally not enforceable, as restraints of trade are void under the Indian Contract Act, 1872. Confidentiality and reasonable non-solicitation obligations are treated differently." },
      { q: "Does every employer need a POSH policy?", a: "Every workplace with ten or more employees must constitute an Internal Committee, and all employers should have a policy against sexual harassment and a process for handling complaints." },
      { q: "What should an employee do if wrongfully terminated?", a: "Gather the employment documents and correspondence and seek advice promptly. Remedies depend on the employee's category, the terms of employment and the circumstances of termination." },
    ],
  },
  {
    title: "Private Client",
    tagline: "Wills, succession, trusts and personal legal matters handled with discretion.",
    overview: [
      "Planning for the future and protecting family wealth calls for careful, private advice. Our Private Client practice helps individuals and families with wills, succession, trusts and personal legal matters, with an emphasis on clarity and continuity across generations.",
      "We also assist families when disputes over inheritance or family property arise, aiming for resolution that preserves relationships wherever possible.",
    ],
    offerings: [
      { title: "Wills", text: "Drafting and registration of wills that reflect a person's wishes clearly." },
      { title: "Succession", text: "Probate, letters of administration and succession certificates." },
      { title: "Trusts", text: "Setting up private family trusts for asset protection and succession planning." },
      { title: "Family Settlements", text: "Partition and family arrangements that divide property amicably." },
      { title: "Powers of Attorney", text: "Drafting general and specific powers of attorney, including for NRIs." },
      { title: "Inheritance Disputes", text: "Representation in disputes over wills, estates and family property." },
    ],
    clients: ["Individuals and families", "Senior citizens", "Non-resident Indians", "Family businesses"],
    faqs: [
      { q: "Does a will need to be registered?", a: "Registration is not mandatory, but it can add a layer of evidentiary value. A will must be properly executed and attested by two witnesses to be valid." },
      { q: "What happens if someone dies without a will?", a: "Their estate passes according to the succession law that applies to them, which depends largely on their religion. This can lead to outcomes they did not intend, and sometimes to disputes." },
      { q: "What is probate and when is it needed?", a: "Probate is a court's certification of a will. Whether it is required depends on where the will was made and where the property is located. We advise on what applies to each estate." },
    ],
  },
  {
    title: "Real Estate",
    tagline: "Title due diligence, property transactions, leases and property disputes.",
    overview: [
      "Property is often the most significant investment a person or business makes. Our Real Estate practice advises buyers, sellers, landlords, tenants and developers on transactions and disputes, with careful attention to title and documentation.",
      "We conduct due diligence, draft and negotiate agreements, assist with registration and represent clients in property litigation, including complaints under the Real Estate (Regulation and Development) Act, 2016.",
    ],
    offerings: [
      { title: "Title Due Diligence", text: "Title searches and reports that identify risks before a purchase or loan." },
      { title: "Sale & Purchase", text: "Agreements to sell, sale deeds and support with stamp duty and registration." },
      { title: "Leases & Licences", text: "Residential and commercial leases and leave and licence agreements." },
      { title: "RERA Matters", text: "Complaints and representation of homebuyers and developers before RERA authorities." },
      { title: "Property Disputes", text: "Suits for possession, partition, specific performance and eviction." },
      { title: "Development Agreements", text: "Joint development and collaboration agreements between landowners and developers." },
    ],
    clients: ["Homebuyers", "Landlords and tenants", "Developers", "Businesses acquiring property"],
    faqs: [
      { q: "Why is title due diligence important?", a: "It confirms that the seller has clear and marketable title and that the property is free from encumbrances and disputes. Problems discovered after purchase are far harder to fix." },
      { q: "What can a homebuyer do if possession is delayed?", a: "Depending on the project, a homebuyer may approach the RERA authority for interest, compensation or a refund. Other forums may also be available. We assess the best route for each case." },
      { q: "Is it necessary to register a lease?", a: "Leases for more than eleven months generally require registration. Unregistered leases may face difficulties as evidence, and stamp duty consequences also arise." },
    ],
  },
  {
    title: "Tax",
    tagline: "Direct and indirect tax advisory, assessments and tax litigation.",
    overview: [
      "Tax affects nearly every personal and business decision. Our Tax practice advises individuals and businesses on income tax and GST, helping them plan responsibly, stay compliant and respond to assessments and disputes.",
      "We represent clients before tax authorities, appellate forums and courts, and we keep pace with changes to the law, including the transition to the Income-tax Act, 2025.",
    ],
    offerings: [
      { title: "Income Tax Advisory", text: "Advice on the tax implications of personal and business transactions." },
      { title: "GST", text: "Registration, classification, input tax credit and compliance under GST laws." },
      { title: "Assessments & Notices", text: "Replies to notices, scrutiny assessments and reassessment proceedings." },
      { title: "Appeals", text: "Representation before the Commissioner (Appeals), the ITAT and GST appellate forums." },
      { title: "Tax Litigation", text: "Writ petitions and appeals on tax matters before the High Court." },
      { title: "Transaction Structuring", text: "Tax-efficient structuring of transactions, reorganisations and succession." },
    ],
    clients: ["Individuals and HNIs", "Businesses", "Start-ups", "Non-resident Indians"],
    faqs: [
      { q: "What should I do if I receive a tax notice?", a: "Read it carefully, note the deadline and seek advice before responding. A considered, well-documented reply at the first stage can often prevent a long dispute." },
      { q: "Can a tax demand be stayed during an appeal?", a: "In many cases, yes, usually on payment of a prescribed portion of the demand or on conditions set by the authority. We advise on the requirements in each forum." },
      { q: "How does the Income-tax Act, 2025 affect me?", a: "The new Act replaces the Income-tax Act, 1961 from 1 April 2026. It largely restructures and simplifies the law, but transitional issues can arise. We help clients understand what changes for them." },
    ],
  },
  {
    title: "Technology",
    tagline: "Legal support on technology contracts, data protection and digital businesses.",
    overview: [
      "Technology businesses move quickly, and their legal needs move with them. Our Technology practice advises start-ups, software companies and businesses adopting technology on contracts, data protection, intellectual property and regulatory issues.",
      "We help clients navigate the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, so that innovation is built on a sound legal foundation.",
    ],
    offerings: [
      { title: "Technology Contracts", text: "Software licences, SaaS agreements, development and IT services contracts." },
      { title: "Data Protection", text: "Compliance programmes under the DPDP Act, including notices, consent and data processing terms." },
      { title: "Platform Terms", text: "Terms of use, privacy policies and other terms for websites and apps." },
      { title: "IT Act Compliance", text: "Intermediary obligations, cyber incident reporting and other IT Act requirements." },
      { title: "Cybercrime", text: "Assisting victims of cyber fraud and data breaches with complaints and remedies." },
      { title: "Technology IP", text: "Ownership and protection of software, code and other digital assets." },
    ],
    clients: ["Start-ups", "Software and SaaS companies", "E-commerce platforms", "Businesses going digital"],
    faqs: [
      { q: "Does the DPDP Act apply to my business?", a: "It applies to the processing of digital personal data in India, and to processing outside India in connection with offering goods or services to people in India. Most businesses that handle customer or employee data will be covered." },
      { q: "Who owns software developed by a contractor?", a: "Ownership depends on the contract. Without a clear written assignment, the developer may retain rights in the code, so the agreement should address ownership expressly." },
      { q: "What should I do after a data breach?", a: "Contain the incident, preserve evidence and seek advice promptly. Reporting obligations to authorities and affected individuals may apply within short timelines." },
    ],
  },
];

export type Service = ServiceDetail & { slug: string; summary: string; icon: PracticeIcon };

export const services: Service[] = practiceAreas.map((area) => {
  const detail = details.find((d) => d.title === area.title);
  if (!detail) throw new Error(`Missing service page content for "${area.title}"`);
  return { ...detail, slug: serviceSlug(area.title), summary: area.text, icon: area.icon };
});

export const getService = (slug: string) => services.find((s) => s.slug === slug);
