export const SOLUTIONS = [
  {
    id: "professional-website",
    package: "website",
    category: "01 / DIGITAL PRESENCE",
    name: "Professional Detailing Website",
    navDescription: "A branded website with services, a gallery, and quote requests.",
    description:
      "Give customers a clear, professional place to explore your services, view your work, and request a quote.",
    features: [
      "Mobile-responsive website with up to five agreed pages or sections",
      "Services, detailing packages, and image gallery",
      "Business information and service-area content",
      "Structured quote-request form",
      "Click-to-call and click-to-text contact options",
      "Basic technical and on-page SEO setup",
    ],
    contactLabel: "Professional Detailing Website",
    cta: "Request a Free Website Preview",
    featured: false,
  },
  {
    id: "website-dashboard",
    package: "website-dashboard",
    category: "02 / INQUIRY MANAGEMENT",
    name: "Website & Inquiry Management",
    navDescription: "A detailing website with connected inquiry and follow-up workflows.",
    description:
      "Capture quote requests and keep potential jobs organized, from the first inquiry through follow-up.",
    features: [
      "Everything in Professional Detailing Website",
      "Connected quote-request capture and business notifications",
      "Centralized inquiry and customer records",
      "Simple lead stages such as New, Contacted, Quote Sent, and Booked",
      "Follow-up reminders and an agreed follow-up workflow",
      "Basic inquiry and conversion reporting",
    ],
    contactLabel: "Website & Inquiry Management",
    cta: "Explore Inquiry Management",
    featured: true,
  },
  {
    id: "complete-system",
    package: "complete-system",
    category: "03 / BOOKING & RETENTION",
    name: "Booking & Customer Retention",
    navDescription: "Connect booking, reminders, and repeat-customer workflows.",
    description:
      "Connect booking, reminders, follow-ups, and repeat-customer workflows around how your business operates.",
    features: [
      "Everything in Website & Inquiry Management",
      "Booking or scheduling integrations where appropriate",
      "Appointment confirmations and reminders",
      "Missed-inquiry follow-up workflows",
      "Post-service review requests and rebooking reminders",
      "Custom integrations and reporting based on agreed requirements",
    ],
    contactLabel: "Booking & Customer Retention",
    cta: "Discuss Your Booking Workflow",
    featured: false,
  },
] as const;

export const NOT_SURE_CONTACT_OPTION = {
  label: "Not sure yet; recommend the best starting point",
} as const;

export function getContactInterest(packageId: string): string | undefined {
  const solution = SOLUTIONS.find((offer) => offer.package === packageId);
  return solution?.contactLabel;
}

export const CONTACT_INTEREST_OPTIONS = SOLUTIONS.map((offer) => ({
  value: offer.contactLabel,
  label: offer.contactLabel,
}));
