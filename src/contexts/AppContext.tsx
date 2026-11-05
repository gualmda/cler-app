"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { messages, type Locale } from "@/lib/translations";

type Theme = "light" | "dark";
type LegalSection = "terms" | "privacy";
type ContextValue = {
  locale: Locale;
  theme: Theme;
  setLocale: (value: Locale) => void;
  toggleTheme: () => void;
  t: (id: string) => string;
  notice: string;
  notify: (value: string) => void;
  legalSection: LegalSection | null;
  openLegal: (value: LegalSection) => void;
  closeLegal: () => void;
};
const AppContext = createContext<ContextValue | null>(null);

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* navegação privada */
  }
}
export function AppProvider({ children }: { children: ReactNode }) {
  // Estado inicial constante evita hydration mismatch entre servidor e cliente.
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [theme, setTheme] = useState<Theme>("light");
  const [notice, setNotice] = useState("");
  const [legalSection, setLegalSection] = useState<LegalSection | null>(null);
  useEffect(() => {
    const savedLang = readStorage("cler-language");
    const savedTheme = readStorage("cler-theme");
    setLocaleState(savedLang === "en" ? "en" : "pt");
    setTheme(
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
    );
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title =
      locale === "pt"
        ? "CLER | Medicação e informações de saúde organizadas"
        : "CLER | Organized medication and health information";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      locale === "pt"
        ? "Organize medicações e mantenha informações importantes de saúde acessíveis em um só lugar com o CLER."
        : "Organize medications and keep important health information at hand in one place with CLER.",
    );
  }, [locale]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#1a1023" : "#2a1536");
  }, [theme]);
  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(""), 4800);
    return () => window.clearTimeout(id);
  }, [notice]);
  const setLocale = useCallback((value: Locale) => {
    setLocaleState(value);
    writeStorage("cler-language", value);
  }, []);
  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      writeStorage("cler-theme", next);
      return next;
    });
  }, []);
  const t = useCallback(
    (id: string) => {
      const dictionary: Record<string, string> = messages[locale];
      const portuguese: Record<string, string> = messages.pt;
      return dictionary[id] ?? portuguese[id] ?? id;
    },
    [locale],
  );
  const notify = useCallback((message: string) => setNotice(message), []);
  const openLegal = useCallback(
    (section: LegalSection) => setLegalSection(section),
    [],
  );
  const closeLegal = useCallback(() => setLegalSection(null), []);
  const value = useMemo(
    () => ({
      locale,
      theme,
      setLocale,
      toggleTheme,
      t,
      notice,
      notify,
      legalSection,
      openLegal,
      closeLegal,
    }),
    [
      locale,
      theme,
      setLocale,
      toggleTheme,
      t,
      notice,
      notify,
      legalSection,
      openLegal,
      closeLegal,
    ],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
