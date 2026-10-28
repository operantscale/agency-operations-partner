export const siteConfig = {
  companyName: "OperantScale",
  domain: "https://operantscale.com",
  email: "sabeeh@operantscale.com",
  ogImage: "/og-image.svg",
  ogImageAlt: "OperantScale websites and inquiry workflows for auto-detailing businesses",
  social: {
    instagram: "https://www.instagram.com/operantscale/",
  },
} as const;

export const defaultPageTitle = `${siteConfig.companyName} | Detailing Websites & Inquiry Workflows`;
export const defaultPageDescription =
  "Professional websites and practical inquiry workflows for independent auto detailing businesses.";

export function getCanonicalUrl(path = "/") {
  return new URL(path, siteConfig.domain).toString();
}

export function getAbsoluteImageUrl(path: string = siteConfig.ogImage) {
  return new URL(path, siteConfig.domain).toString();
}

export function getOrganizationSchema() {
  const sameAs = [siteConfig.social.instagram];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.domain}/#organization`,
    name: siteConfig.companyName,
    url: siteConfig.domain,
    email: siteConfig.email,
    description: defaultPageDescription,
    logo: getAbsoluteImageUrl("/operantscale-logo.png"),
    sameAs,
  };
}
