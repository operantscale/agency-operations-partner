export const GOOGLE_ANALYTICS_ID = "G-HLKG9LVVNN";

type AnalyticsEventName =
  | "cta_click"
  | "contact_page_view"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "email_click"
  | "linkedin_click";

type AnalyticsParameters = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let lastTrackedPath: string | undefined;

function sendToGoogleAnalytics(
  command: "config" | "event",
  name: string,
  parameters?: AnalyticsParameters,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag(command, name, parameters);
}

export function trackPageView(pathname: string): boolean {
  if (lastTrackedPath === pathname) return false;
  lastTrackedPath = pathname;

  sendToGoogleAnalytics("event", "page_view", {
    page_location: `${window.location.origin}${pathname}`,
    page_path: pathname,
    page_title: document.title,
  });

  return true;
}

export function trackEvent(name: AnalyticsEventName, parameters: AnalyticsParameters = {}): void {
  sendToGoogleAnalytics("event", name, parameters);
}
