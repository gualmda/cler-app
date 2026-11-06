"use client";
import { useEffect, useState } from "react";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { useApp } from "@/contexts/AppContext";
export function BackToTop() {
  const { locale } = useApp();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY >= window.innerHeight);
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const label = locale === "pt" ? "Voltar ao topo" : "Back to top";
  return <button
    type="button"
    hidden={!visible}
    id="back-to-top"
    className="back-to-top al-icon-wrapper"
    aria-label={label}
    title={label}
    onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); document.getElementById("top")?.focus({ preventScroll: true }); }}>
    <AnimatedIcon name="arrow-up" size={24} className="lucide-icon lucide-arrow-up" />
  </button>;
}
