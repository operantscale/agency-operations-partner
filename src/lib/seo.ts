export const siteConfig = {
  companyName: "OperantScale",
  domain: "https://operantscale.com",
  email: "sabeeh@operantscale.com",
  ogImage: "/og-image.svg",
  ogImageAlt: "OperantScale lead recovery and booking systems for auto-detailing businesses",
  social: {
    linkedin: "https://www.linkedin.com/company/operantscale",
    instagram: null as string | null,
    facebook: null as string | null,
  },
} as const;

export const defaultPageTitle = `${siteConfig.companyName} | Detailing Lead Recovery & Booking Systems`;
export const defaultPageDescription =
  "OperantScale helps auto-detailing businesses recover missed leads, improve response time, and turn more inquiries into booked appointments with better follow-up and booking workflows.";

export function getCanonicalUrl(path = "/") {
  return new URL(path, siteConfig.domain).toString();
}

export function getAbsoluteImageUrl(path = siteConfig.ogImage) {
  return new URL(path, siteConfig.domain).toString();
}

export function getOrganizationSchema() {
  const sameAs = [siteConfig.social.linkedin].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    url: siteConfig.domain,
    email: siteConfig.email,
    description: defaultPageDescription,
    sameAs,
  };
}
