"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/contexts/AppContext";
import { LegalContent } from "@/components/layout/LegalContent";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { Tr } from "@/components/ui/Tr";

export function LegalModal() {
  const { legalSection, closeLegal, locale } = useApp();
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = legalSection !== null;
  useEffect(() => {
    if (!open) return;
    lastFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const copy = dialog.current?.querySelector<HTMLElement>(".legal-copy");
    if (copy) copy.scrollTop = 0;
    if (legalSection === "privacy") {
      requestAnimationFrame(() => {
        const heading = copy?.querySelector<HTMLElement>("#privacy-heading");
        if (heading && copy)
          copy.scrollTop = heading.offsetTop - copy.offsetTop - 18;
      });
    }
    function keydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLegal();
      }
      if (e.key !== "Tab" || !dialog.current) return;
      const focusables = Array.from(
        dialog.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.getClientRects().length > 0);
      const first = focusables[0],
        last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", keydown);
      lastFocus.current?.focus();
    };
  }, [open, legalSection, closeLegal]);
  return (
    <div
      ref={dialog}
      id="legal-modal"
      className={`modal${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-title"
      aria-hidden={!open}
      hidden={!open}
      aria-description={
        locale === "en"
          ? "The English translation is for convenience; Portuguese is the original."
          : undefined
      }
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeLegal();
      }}
    >
      <div className="modal-card">
        <div className="modal-head">
          <strong id="legal-title">
            <Tr id="m193" />
          </strong>
          <button
            className="modal-close"
            type="button"
            ref={closeButton}
            aria-label={locale === "pt" ? "Fechar janela" : "Close dialog"}
            onClick={closeLegal}
          >
            <AnimatedIcon name="x" size={20} className="lucide-icon lucide-x" />
          </button>
        </div>
        <LegalContent />
      </div>
    </div>
  );
}
