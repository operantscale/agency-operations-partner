export const siteConfig = {
  companyName: "OperantScale",
  domain: "https://operantscale.com",
  email: "sabeeh@operantscale.com",
  ogImage: "/og-image.svg",
  ogImageAlt:
    "OperantScale brand mark for AI-powered operational systems for independent P&C insurance agencies",
  social: {
    linkedin: "https://www.linkedin.com/company/operantscale",
    instagram: null as string | null,
    facebook: null as string | null,
  },
} as const;

export const defaultPageTitle = `${siteConfig.companyName} | AI-Powered Operational Systems for Independent P&C Insurance Agencies`;
export const defaultPageDescription =
  "OperantScale helps independent P&C insurance agencies reduce repetitive administrative work, improve workflow visibility, and create practical operational capacity with AI-powered systems.";

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
    description:
      "AI-powered operational systems for independent P&C insurance agencies focused on workflow improvement, internal coordination, and practical automation.",
    sameAs,
  };
}
