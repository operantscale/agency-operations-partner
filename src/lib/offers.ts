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
      "A premium website that showcases your detailing services, builds credibility, and makes requesting a quote simple.",
    features: [
      "Premium, mobile-responsive design",
      "Up to five agreed pages or sections",
      "Services and detailing packages",
      "Before-and-after gallery with supplied assets",
      "Contact and quote-request forms",
      "Basic on-page SEO and launch setup",
    ],
    care: {
      name: "Website Care",
      price: "$80/month",
      description:
        "Technical maintenance, issue resolution, routine checks, and minor content updates.",
    },
    contactLabel: "Professional Detailing Website — $250 one-time development",
    contactWithCareLabel: "Professional Website + optional Website Care — $250 one-time, $80/month",
    cta: "Get Your Website",
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
      "A premium detailing website with a connected dashboard to capture inquiries, organize leads, and track potential bookings.",
    features: [
      "All Professional Website development features",
      "Secure business dashboard",
      "Integrated website inquiry forms",
      "Centralized customer and lead records",
      "Lead status and follow-up tracking",
      "Basic reporting and workflow setup",
    ],
    care: {
      name: "Website & Dashboard Care",
      price: "$150/month",
      description: "Maintenance, technical support, bug fixes, and minor approved improvements.",
    },
    contactLabel: "Website + Lead Dashboard — $500 one-time development",
    contactWithCareLabel:
      "Website + Dashboard + optional Website & Dashboard Care — $500 one-time, $150/month",
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
    price: "Tailored to Your Business",
    billing: "Custom implementation & ongoing support",
    description:
      "A connected system that helps manage inquiries, recover missed opportunities, automate follow-up, and streamline bookings.",
    featureIntro: "Potential capabilities, based on project scope.",
    features: [
      "Professional website and lead dashboard",
      "Automated inquiry and missed-lead follow-up",
      "Quote and booking workflows",
      "Appointment reminders and confirmations",
      "Customer rebooking and retention",
      "Tailored integrations and reporting",
    ],
    care: {
      name: "Tailored Implementation & Support",
      description:
        "Features, integrations, implementation, and ongoing support are defined during your workflow review.",
    },
    contactLabel: "Complete Booking & Lead Recovery System — Custom",
    cta: "Discuss Your System",
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
