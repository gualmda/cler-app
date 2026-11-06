"use client";

import { useEffect } from "react";
import { useApp } from "@/contexts/AppContext";

/**
 * AOS deve ser carregado uma única vez: em React Strict Mode, o useEffect é
 * executado duas vezes no desenvolvimento. O Promise compartilhado impede que
 * o AOS registre listeners duplicados e evita o race do evento de início.
 */
type AosApi = typeof import("aos");
let aosPromise: Promise<AosApi> | null = null;

function loadAos(): Promise<AosApi> {
  if (!aosPromise) {
    aosPromise = import("aos").then((mod) => {
      const AOS = ("default" in mod ? mod.default : mod) as AosApi;
      const root = document.documentElement;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (prefersReducedMotion.matches) {
        // A acessibilidade prevalece sobre efeitos visuais.
        root.classList.remove("aos-armed");
        return AOS;
      }

      // Evento personalizado: DOMContentLoaded pode ter ocorrido antes da
      // hidratação. Armamos o CSS antes de disparar o evento em outro frame,
      // para a transição inicial também ser perceptível.
      AOS.init({
        startEvent: "cler:aos:start",
        duration: 700,
        easing: "ease-out-cubic",
        offset: 64,
        once: true,
        mirror: false,
        disableMutationObserver: false,
      });

      root.classList.add("aos-armed");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.dispatchEvent(new Event("cler:aos:start"));
          AOS.refreshHard();
        });
      });
      return AOS;
    }).catch((error: unknown) => {
      // Se o carregamento falhar, o conteúdo continua visível.
      document.documentElement.classList.remove("aos-armed");
      aosPromise = null;
      throw error;
    });
  }
  return aosPromise;
}

export function AosInit() {
  const { locale, theme } = useApp();

  useEffect(() => {
    let active = true;
    let firstFrame = 0;
    let secondFrame = 0;
    let observer: ResizeObserver | undefined;
    let loadHandler: (() => void) | undefined;

    loadAos().then((AOS) => {
      if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const refresh = () => {
        cancelAnimationFrame(firstFrame);
        cancelAnimationFrame(secondFrame);
        firstFrame = requestAnimationFrame(() => {
          secondFrame = requestAnimationFrame(() => AOS.refreshHard());
        });
      };

      // Atualiza offsets após fontes/imagens; também cobre troca PT/EN e tema.
      refresh();
      void document.fonts?.ready.then(() => { if (active) refresh(); });
      if (document.readyState !== "complete") {
        loadHandler = refresh;
        window.addEventListener("load", loadHandler);
      }
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(refresh);
        const main = document.querySelector("main");
        if (main) observer.observe(main);
      }
    }).catch((error: unknown) => {
      console.error("Não foi possível iniciar o AOS:", error);
    });

    return () => {
      active = false;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer?.disconnect();
      if (loadHandler) window.removeEventListener("load", loadHandler);
    };
  }, [locale, theme]);

  return null;
}
