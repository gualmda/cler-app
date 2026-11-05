"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { SafeImage } from "@/components/ui/SafeImage";
import { Tr } from "@/components/ui/Tr";
import { TrajectoryNotice } from "@/components/ui/TrajectoryNotice";
import { useApp } from "@/contexts/AppContext";

const appUrl = "https://pwa.cler.app/";
export function Header() {
  const { locale, setLocale, theme, toggleTheme } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const moreRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
        if (moreOpen) {
          setMoreOpen(false);
          moreRef.current?.querySelector("summary")?.focus();
        }
      }
    }
    function onOutside(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!navRef.current?.contains(target)) setMenuOpen(false);
      if (!moreRef.current?.contains(target)) setMoreOpen(false);
    }
    function onResize() {
      if (window.innerWidth > 1120) setMenuOpen(false);
      else setMoreOpen(false);
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("pointerdown", onOutside);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, moreOpen]);
  useEffect(() => {
    const sections = [
      "como-funciona",
      "sobre",
      "para-quem",
      "parcerias",
      "faq",
    ];
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const candidates = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (candidates[0]) setActive(candidates[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.2] },
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  const menuLabel = locale === "pt" ? "Fechar menu" : "Close menu";
  const openLabel = locale === "pt" ? "Abrir menu" : "Open menu";
  const themeLabel =
    theme === "dark"
      ? locale === "pt"
        ? "Ativar modo claro"
        : "Switch to light mode"
      : locale === "pt"
        ? "Ativar modo escuro"
        : "Switch to dark mode";
  function navLink(id: string, key: string, mobile = false) {
    return (
      <a
        href={`#${id}`}
        aria-current={active === id ? "location" : undefined}
        onClick={() => {
          if (mobile) setMenuOpen(false);
          else setMoreOpen(false);
        }}
      >
        <Tr id={key} />
      </a>
    );
  }
  return (
    <header id="site-header" ref={navRef}>
      <div className="container nav">
        <a
          className="brand"
          href="#top"
          aria-label={locale === "pt" ? "CLER — início" : "CLER — home"}
          onClick={() => setMenuOpen(false)}
        >
          <SafeImage
            className="brand-logo"
            src="https://framerusercontent.com/images/0idPQ1yveGHqGoYDtDfWza5Ho.png?height=162&scale-down-to=512&width=730"
            alt="CLER"
          />
          <span className="brand-fallback">cler</span>
        </a>
        <nav
          className="navlinks"
          aria-label={
            locale === "pt" ? "Navegação principal" : "Main navigation"
          }
          id="desktop-navigation"
        >
          {navLink("como-funciona", "m1")}
          {navLink("sobre", "m2")}
          {navLink("para-quem", "m4")}
          <details
            className="more-nav"
            ref={moreRef}
            open={moreOpen}
            onToggle={(event) => setMoreOpen(event.currentTarget.open)}
          >
            <summary className="more-trigger">
              <Tr id="m194" />
              <AnimatedIcon
                name="chevron-down"
                size={17}
                className="lucide-icon lucide-chevron-down"
              />
            </summary>
            <div className="more-panel">
              <span onClick={() => setMoreOpen(false)}>
                <TrajectoryNotice className="trajectory-link link-button">
                  <Tr id="m3" />
                </TrajectoryNotice>
              </span>
              {navLink("parcerias", "m5")}
              {navLink("faq", "m6")}
              <a
                className="btn web"
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tr id="m9" />
              </a>
            </div>
          </details>
        </nav>
        <div className="navright">
          <div
            className="nav-controls"
            aria-label={
              locale === "pt" ? "Preferências da página" : "Page preferences"
            }
          >
            <div
              className="language-switch"
              role="group"
              aria-label={locale === "pt" ? "Idioma" : "Language"}
            >
              <button
                type="button"
                className="lang-option"
                lang="pt-BR"
                aria-pressed={locale === "pt"}
                onClick={() => setLocale("pt")}
              >
                PT
              </button>
              <button
                type="button"
                className="lang-option"
                lang="en"
                aria-pressed={locale === "en"}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              className="icon-btn theme-toggle al-icon-wrapper"
              onClick={toggleTheme}
              title={themeLabel}
              aria-label={themeLabel}
              aria-pressed={theme === "dark"}
            >
              <AnimatedIcon
                name="moon"
                size={20}
                className="lucide-icon lucide-moon theme-moon"
              />
              <AnimatedIcon
                name="sun"
                size={20}
                className="lucide-icon lucide-sun theme-sun"
              />
            </button>
          </div>
          <a
            className="btn primary"
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tr id="m8" />
          </a>
          <button
            ref={menuButton}
            className="hamb icon-btn al-icon-wrapper"
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? menuLabel : openLabel}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="toggle-glyph menu-glyph">
              <AnimatedIcon
                name="menu"
                size={22}
                className="lucide-icon lucide-menu"
              />
            </span>
            <span className="toggle-glyph close-glyph">
              <AnimatedIcon
                name="x"
                size={22}
                className="lucide-icon lucide-x"
              />
            </span>
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-menu"
        aria-label={
          locale === "pt"
            ? "Navegação para dispositivos móveis"
            : "Mobile navigation"
        }
        hidden={!menuOpen}
      >
        {navLink("como-funciona", "m11", true)}
        {navLink("sobre", "m12", true)}
        <span onClick={() => setMenuOpen(false)}>
          <TrajectoryNotice className="trajectory-link link-button">
            <Tr id="m13" />
          </TrajectoryNotice>
        </span>
        {navLink("para-quem", "m14", true)}
        {navLink("parcerias", "m15", true)}
        {navLink("faq", "m16", true)}
        <div className="actions inline-style-3">
          <a
            className="btn primary"
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tr id="m17" />
          </a>
          <a
            className="btn web"
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Tr id="m18" />
          </a>
        </div>
      </nav>
    </header>
  );
}
