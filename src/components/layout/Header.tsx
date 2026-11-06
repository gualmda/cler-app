"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { SafeImage } from "@/components/ui/SafeImage";
import { Tr } from "@/components/ui/Tr";
import { useApp } from "@/contexts/AppContext";

const appUrl = "https://pwa.cler.app/";
export function Header() {
  const { locale, setLocale, theme, toggleTheme } = useApp();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onJourney = pathname === "/trajetoria";
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { active, onAnchorClick } = useSectionNavigation(onHome);
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
  function closeNavigation(mobile: boolean) {
    if (mobile) setMenuOpen(false);
    else setMoreOpen(false);
  }

  function navLink(id: string, key: string, mobile = false) {
    return (
      <Link
        href={onHome ? `#${id}` : `/#${id}`}
        aria-current={onHome && active === id ? "location" : undefined}
        onClick={(event) => {
          if (onHome) onAnchorClick(event, id);
          closeNavigation(mobile);
        }}
      >
        <Tr id={key} />
      </Link>
    );
  }

  // A trajetória é conteúdo complementar: acessível somente pelo menu Mais
  // e pelo rodapé, sem ocupar espaço na página inicial.
  function journeyLink(key: string, mobile = false) {
    return (
      <Link
        href="/trajetoria"
        aria-current={onJourney ? "page" : undefined}
        onClick={() => closeNavigation(mobile)}
      >
        <Tr id={key} />
      </Link>
    );
  }

  return (
    <header id="site-header" ref={navRef}>
      <div className="container nav">
        <Link
          className="brand"
          href={onHome ? "#top" : "/"}
          aria-label={locale === "pt" ? "CLER — início" : "CLER — home"}
          onClick={(event) => {
            if (onHome) onAnchorClick(event, "top");
            setMenuOpen(false);
            setMoreOpen(false);
          }}
        >
          <SafeImage
            className="brand-logo"
            src="https://framerusercontent.com/images/0idPQ1yveGHqGoYDtDfWza5Ho.png?height=162&scale-down-to=512&width=730"
            alt="CLER"
          />
          <span className="brand-fallback">cler</span>
        </Link>
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
            data-active={
              onJourney ||
              (onHome && (active === "parcerias" || active === "faq"))
            }
            ref={moreRef}
            open={moreOpen}
            onToggle={(event) => setMoreOpen(event.currentTarget.open)}
          >
            <summary
              className="more-trigger"
              aria-current={
                onJourney
                  ? "location"
                  : onHome && (active === "parcerias" || active === "faq")
                    ? "location"
                    : undefined
              }
            >
              <Tr id="m194" />
              <AnimatedIcon
                name="chevron-down"
                size={17}
                className="lucide-icon lucide-chevron-down"
              />
            </summary>
            <div className="more-panel">
              {journeyLink("m3")}
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
        {journeyLink("m13", true)}
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
