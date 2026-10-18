export const SOLUTIONS = [
  {
    id: "professional-website",
    package: "website",
    number: "01",
    category: "DIGITAL PRESENCE",
    name: "Professional Detailing Website",
    navDescription: "A branded website with service details, a gallery, and quote requests.",
    price: "$250",
    billing: "One-time development",
    description:
      "Give your detailing business a premium online presence that showcases your services, builds credibility, and makes it easier for customers to request a quote.",
    features: [
      "Premium, mobile-responsive design",
      "Up to five agreed pages or sections",
      "Services and detailing packages presentation",
      "Before-and-after gallery using supplied assets",
      "Contact and quote-request forms",
      "Basic on-page SEO and launch setup",
    ],
    care: {
      name: "Website Care",
      price: "$80/month",
      description:
        "Ongoing technical maintenance, issue resolution, routine checks, and minor website content updates within the agreed support scope.",
    },
    contactLabel: "Professional Website — $250 one-time development",
    contactWithCareLabel: "Website — $250 one-time + optional Website Care at $80/month",
    cta: "Get Your Professional Website",
    featured: false,
  },
  {
    id: "website-dashboard",
    package: "website-dashboard",
    number: "02",
    category: "LEAD MANAGEMENT",
    name: "Website + Lead Dashboard",
    navDescription: "A detailing website with its own inquiry dashboard.",
    price: "$500",
    billing: "One-time development",
    description:
      "A professional detailing website connected to your own lead dashboard, helping you capture inquiries, organize customer information, and manage potential bookings in one place.",
    features: [
      "Everything in the Professional Website package",
      "Secure business dashboard",
      "Integrated website inquiry forms",
      "Centralized customer and lead records",
      "Lead status and follow-up tracking",
      "Basic reporting and workflow setup",
    ],
    care: {
      name: "Website & Dashboard Care",
      price: "$150/month",
      description:
        "Ongoing website and dashboard maintenance, technical support, bug fixes, and minor improvements within an agreed monthly allowance.",
      scope:
        "Small approved changes fit the allowance; major modules, integrations, redesigns, or larger requests are scoped and quoted separately.",
    },
    contactLabel: "Website + Lead Dashboard — $500 one-time development",
    contactWithCareLabel:
      "Website + Dashboard — $500 one-time + optional Website & Dashboard Care at $150/month",
    cta: "Get Website + Dashboard",
    featured: true,
  },
  {
    id: "complete-system",
    package: "complete-system",
    number: "03",
    category: "COMPLETE BUSINESS SYSTEM",
    name: "Complete Booking & Lead Recovery System",
    navDescription: "A custom system for bookings, follow-up, and lead recovery.",
    price: "Custom Solution",
    billing: "Implementation and support scoped to your business",
    description:
      "A connected system built around your detailing operation—from capturing new inquiries and recovering missed opportunities to managing bookings, customer communication, and follow-up.",
    featureIntro: "Potential capabilities, scoped to your project",
    features: [
      "Professional customer-facing website",
      "Connected lead management dashboard",
      "Automated inquiry and missed-lead follow-up",
      "Quote and booking workflows",
      "Appointment reminders and confirmations",
      "Customer rebooking and retention workflows",
      "Custom integrations and reporting",
    ],
    care: {
      name: "Tailored Implementation & Support",
      description:
        "Features, integrations, development scope, and ongoing support are agreed during your workflow review, subject to technical feasibility and provider availability.",
      scope:
        "Automation, phone, SMS, email, payment, and third-party connections depend on feasibility and the approved project scope.",
    },
    contactLabel: "Complete Booking & Lead Recovery System — Custom",
    cta: "Discuss a Custom System",
    featured: false,
  },
] as const;

export const NOT_SURE_CONTACT_OPTION = {
  label: "Not sure yet — discuss the available options",
} as const;

export function getContactInterest(packageId: string): string | undefined {
  const solution = SOLUTIONS.find((offer) => offer.package === packageId);
  return solution?.contactLabel;
}

export const CONTACT_INTEREST_OPTIONS = SOLUTIONS.flatMap((offer) =>
  [
    offer.contactLabel,
    ...("contactWithCareLabel" in offer ? [offer.contactWithCareLabel] : []),
  ].map((label) => ({ value: label, label })),
);
