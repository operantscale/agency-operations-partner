export const siteConfig = {
  companyName: "OperantScale",
  domain: "https://operantscale.com",
  email: "sabeeh@operantscale.com",
  ogImage: "/og-image.svg",
  ogImageAlt: "OperantScale brand mark for AI-powered operational systems for growing businesses",
  social: {
    linkedin: "https://www.linkedin.com/company/operantscale",
    instagram: null as string | null,
    facebook: null as string | null,
  },
} as const;

export const defaultPageTitle = `${siteConfig.companyName} | AI-Powered Operational Systems for Growing Businesses`;
export const defaultPageDescription =
  "OperantScale designs and implements practical automation for lead follow-up, customer workflows, scheduling, CRM, communication, and internal operations, built around the systems businesses already use.";

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
