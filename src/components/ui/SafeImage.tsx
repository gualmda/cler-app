"use client";

import { useState, type ImgHTMLAttributes } from "react";
import { useApp } from "@/contexts/AppContext";

type Props = ImgHTMLAttributes<HTMLImageElement> & { altKey?: string };
const englishAlts: Record<string, string> = {
  heroAlt: "Screens of the CLER application",
  screen1: "Screen 1 of 4 of the CLER application",
  screen2: "Screen 2 of 4 of the CLER application",
  screen3: "Screen 3 of 4 of the CLER application",
  screen4: "Screen 4 of 4 of the CLER application",
  founder: "Kycia Cordeiro, founder of CLER",
  report:
    "Example of a CLER medication report, with personal information hidden",
  health:
    "CLER screen showing blood type, pre-existing conditions and allergies",
  comparison:
    "Comparison of manually shared medication information and information organized in CLER",
  selfCare: "Person managing their own healthcare",
  familyCare: "Family member caring for an older person",
  professionalCare: "Professional caregiver accompanying an older person",
};

/** Imagens originais preservadas, com texto alternativo coerente com o idioma. */
export function SafeImage({ altKey, alt = "", onError, ...props }: Props) {
  const { locale } = useApp();
  const [failed, setFailed] = useState(false);
  return (
    <img
      {...props}
      alt={locale === "en" && altKey ? (englishAlts[altKey] ?? alt) : alt}
      onError={(event) => {
        setFailed(true);
        const fallback =
          event.currentTarget.parentElement?.querySelector<HTMLElement>(
            ".brand-fallback,.photo-fallback",
          );
        if (fallback)
          fallback.style.display = fallback.classList.contains("photo-fallback")
            ? "grid"
            : "block";
        onError?.(event);
      }}
      style={{ ...props.style, ...(failed ? { display: "none" } : {}) }}
    />
  );
}
