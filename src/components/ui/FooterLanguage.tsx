"use client";
import { useApp } from "@/contexts/AppContext";
export function FooterLanguage() {
  const { locale, setLocale } = useApp();
  return (
    <button
      type="button"
      className="footer-language link-button"
      onClick={() => setLocale(locale === "pt" ? "en" : "pt")}
      aria-label={
        locale === "pt" ? "Alternar para inglês" : "Switch to Portuguese"
      }
    >
      PT | EN
    </button>
  );
}
