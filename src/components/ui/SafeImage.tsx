"use client";

import { useState, type ImgHTMLAttributes } from "react";
import { useApp } from "@/contexts/AppContext";

type Props = ImgHTMLAttributes<HTMLImageElement> & { altKey?: string; };
const englishAlts: Record<string, string> = {
  heroAlt: "Screens of the CLER application",
  screen1: "Screen 1 of 4 of the CLER application",
  screen2: "Screen 2 of 4 of the CLER application",
  screen3: "Screen 3 of 4 of the CLER application",
  screen4: "Screen 4 of 4 of the CLER application",
  founder: "Kycia Cordeiro, founder of CLER",
  report: "Example of a CLER medication report, with personal information hidden",
  health: "CLER screen showing blood type, pre-existing conditions and allergies",
  comparison: "Comparison of manually shared medication information and information organized in CLER",
  selfCare: "Person managing their own healthcare",
  familyCare: "Family member caring for an older person",
  professionalCare: "Professional caregiver accompanying an older person",
};

/** Imagens originais preservadas, com texto alternativo coerente com o idioma. */
export function SafeImage({ altKey, alt = "", onError, ...props }: Props) {
  const { locale } = useApp();
  const [failed, setFailed] = useState(false);
  const localWebp = typeof props.src === "string" && /^\/assets\/(?:brand-cler|hero-image|historia-cler|auto-cuidado|familia-cuidado|cuidado-profissional)\.webp$/.test(props.src);
  const stem = localWebp ? props.src!.slice(0, -5) : "";
  const srcSet = localWebp ? `${stem}-480.webp 480w, ${stem}-960.webp 960w, ${props.src} 1400w` : props.srcSet;
  const assetName = typeof props.src === "string" ? props.src.split("/").pop() : "";
  const sizes = localWebp
    ? assetName === "brand-cler.webp"
      ? "(max-width: 760px) 92px, 112px"
      : assetName === "hero-image.png"
        ? "(max-width: 1020px) 94vw, 48vw"
        : assetName?.startsWith("tela-")
          ? "(max-width: 760px) 150px, 240px"
          : "(max-width: 760px) 94vw, (max-width: 1200px) 49vw, 700px"
    : props.sizes;
  const dimensions: Record<string, [number, number]> = {
    "brand-cler.webp": [730, 162],
    "hero-image.png": [1188, 1242],
    "historia-cler.webp": [1280, 853],
    "tela-1-cler.webp": [591, 1280],
    "tela-2-cler.webp": [591, 1280],
    "tela-3-cler.webp": [591, 1280],
    "tela-4-cler.webp": [591, 1280],
    "auto-cuidado.webp": [1536, 1024],
    "familia-cuidado.webp": [1536, 1024],
    "cuidado-profissional.webp": [1536, 1024],
    "relatorio-cler.png": [210, 287],
  };
  const intrinsic = dimensions[assetName ?? ""];

  return <img
    {...props}
    width={props.width ?? intrinsic?.[0]}
    height={props.height ?? intrinsic?.[1]}
    srcSet={srcSet}
    sizes={sizes}
    alt={locale === "en" && altKey ? englishAlts[altKey] ?? alt : alt}
    onError={(event) => {
      setFailed(true);
      const fallback = event.currentTarget.parentElement?.querySelector<HTMLElement>(".brand-fallback,.photo-fallback");
      if (fallback) fallback.style.display = fallback.classList.contains("photo-fallback") ? "grid" : "block";
      onError?.(event);
    }}
    style={{ ...props.style, ...(failed ? { display: "none" } : {}) }}
  />;
}
