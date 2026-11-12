/** GA4: no network requests until the visitor opts in. No PII is ever sent. */
const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const allowUtm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type GAWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
  __clerAnalyticsEnabled?: boolean;
};

export const analyticsConfigured = Boolean(id && /^G-[A-Z0-9]+$/.test(id));

function safeCampaign(): string {
  try {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();
    for (const key of allowUtm) {
      const value = url.searchParams.get(key);
      if (value) params.set(key, value.replace(/[^\w.\-]/g, "").slice(0, 80));
    }
    return params.toString();
  } catch { return ""; }
}

export function enableAnalytics() {
  if (!analyticsConfigured || typeof window === "undefined") return;
  const win = window as GAWindow;
  if (win.__clerAnalyticsEnabled) return;
  win.__clerAnalyticsEnabled = true;
  win.dataLayer = win.dataLayer || [];
  win.gtag = (...args: unknown[]) => { win.dataLayer?.push(args); };
  win.gtag("js", new Date());
  win.gtag("config", id, {
    send_page_view: false,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id!)}`;
  script.id = "cler-analytics-script";
  document.head.append(script);
}

export function trackPageView(pathname: string) {
  if (!analyticsConfigured || typeof window === "undefined") return;
  const win = window as GAWindow;
  if (!win.__clerAnalyticsEnabled || !win.gtag) return;
  const utm = safeCampaign();
  const cleanPath = pathname.startsWith("/") ? pathname : "/";
  win.gtag("event", "page_view", {
    page_location: `${window.location.origin}${cleanPath}${utm ? `?${utm}` : ""}`,
    page_path: cleanPath,
    page_title: document.title,
    ...(utm ? Object.fromEntries(new URLSearchParams(utm).entries()) : {}),
  });
}

export function trackEvent(name: "pwa_click" | "contact_draft_opened" | "google_play_click", extra: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const win = window as GAWindow;
  if (win.__clerAnalyticsEnabled && win.gtag) win.gtag("event", name, extra);
}

/** Delete first-party GA cookies on withdrawal; reload removes the script. */
export function removeGoogleAnalyticsCookies() {
  if (typeof document === "undefined") return;
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.trim().split("=")[0];
    if (name === "_ga" || name.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    }
  });
}
