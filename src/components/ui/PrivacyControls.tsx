"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { analyticsConfigured, enableAnalytics, removeGoogleAnalyticsCookies, trackEvent, trackPageView } from "@/lib/analytics";

const storageKey = "cler-analytics-consent-v1";
const sixMonths = 180 * 24 * 60 * 60 * 1000;
type Choice = "accepted" | "rejected" | "unknown";

export function PrivacyControls() {
  const { locale } = useApp();
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice>("unknown");
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) as { choice?: Choice; time?: number } : null;
      if (parsed && (parsed.choice === "accepted" || parsed.choice === "rejected") &&
          Date.now() - (parsed.time ?? 0) < sixMonths) setChoice(parsed.choice);
    } catch { /* Cookie-disabled browsers: ask again */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && choice === "accepted") enableAnalytics();
  }, [ready, choice]);

  useEffect(() => {
    if (ready && choice === "accepted") trackPageView(pathname);
  }, [ready, choice, pathname]);

  useEffect(() => {
    if (!ready || choice !== "accepted") return;
    function onExternalClick(e: MouseEvent) {
      const el = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[href^='https://pwa.cler.app']") : null;
      if (el) trackEvent("pwa_click", { placement: el.closest("header") ? "header" : el.closest("footer") ? "footer" : "content" });
    }
    document.addEventListener("click", onExternalClick, { capture: true });
    return () => document.removeEventListener("click", onExternalClick, { capture: true });
  }, [ready, choice]);

  const choose = useCallback((value: Exclude<Choice, "unknown">) => {
    try { localStorage.setItem(storageKey, JSON.stringify({ choice: value, time: Date.now() })); } catch {}
    if (choice === "accepted" && value === "rejected") {
      removeGoogleAnalyticsCookies();
      window.location.reload();
      return;
    }
    setChoice(value);
    setExpanded(false);
  }, [choice]);

  useEffect(() => {
    const open = () => setExpanded(true);
    window.addEventListener("cler-open-privacy-settings", open);
    return () => window.removeEventListener("cler-open-privacy-settings", open);
  }, []);

  if (!ready || !analyticsConfigured || (choice !== "unknown" && !expanded)) return null;
  const en = locale === "en";
  return <section className="cler-consent-banner" aria-labelledby="cler-privacy-title" role="region">
    <h2 id="cler-privacy-title">{en ? "Help us understand visits to CLER" : "Ajude-nos a entender as visitas ao CLER"}</h2>
    <p>{en
      ? "With your permission, we use Google Analytics to measure page visits and campaign performance (such as Web Summit QR codes). You may refuse without affecting the site, and change your decision at any time."
      : "Com sua autorização, usamos o Google Analytics para medir visitas e campanhas (como QR codes do Web Summit). Recusar não altera o funcionamento do site. Sua escolha pode ser modificada a qualquer momento."}</p>
    <div className="cler-consent-actions">
      <button type="button" onClick={() => choose("accepted")}>{en ? "Allow analytics" : "Permitir métricas"}</button>
      <button type="button" onClick={() => choose("rejected")}>{en ? "Reject analytics" : "Recusar métricas"}</button>
      {choice !== "unknown" && <button type="button" onClick={() => setExpanded(false)}>{en ? "Close" : "Fechar"}</button>}
    </div>
  </section>;
}

export function PrivacySettingsButton() {
  const { locale } = useApp();
  if (!analyticsConfigured) return null;
  return <button type="button" className="cler-privacy-settings" onClick={() => window.dispatchEvent(new Event("cler-open-privacy-settings"))}>
    {locale === "en" ? "Analytics preferences" : "Preferências de métricas"}
  </button>;
}
