"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

/** Ordem real das seções na página (não a ordem visual dos itens do menu). */
const SECTION_IDS = ["sobre", "como-funciona", "para-quem", "parcerias", "faq"] as const;
const CONTENT_GAP = 20;

function getNavigationHeight(): number {
  // A altura total do <header> muda quando o menu mobile está aberto.
  // Medir somente a barra evita rolar para uma posição errada no mobile.
  return document.querySelector<HTMLElement>("#site-header .nav")?.getBoundingClientRect().height ?? 76;
}

function sectionLandmark(id: string): HTMLElement | null {
  const section = document.getElementById(id);
  if (!section) return null;

  // Rolar até o conteúdo visível da seção, e não até a borda que tem
  // 68–96 px de padding antes do primeiro título.
  return section.querySelector<HTMLElement>(".eyebrow") ??
    section.querySelector<HTMLElement>("h2, h3") ?? section;
}

function absoluteTop(element: HTMLElement): number {
  // getBoundingClientRect inclui o translateY dos elementos com AOS.
  // offsetTop/offsetParent fornece a posição de LAYOUT, estável antes,
  // durante e depois da animação de surgimento.
  let top = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

function targetPosition(id: string): number | null {
  if (id === "top") return 0;
  const landmark = sectionLandmark(id);
  if (!landmark) return null;
  return Math.max(0, Math.round(absoluteTop(landmark) - getNavigationHeight() - CONTENT_GAP));
}

function reduceMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useSectionNavigation(enabled = true) {
  const [active, setActive] = useState<string>("");
  const pendingTarget = useRef<string | null>(null);
  const scrollFrame = useRef<number>(0);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActive = useCallback(() => {
    // Durante a rolagem programática o indicador permanece no item clicado,
    // não passa por todos os links que ficam no caminho.
    if (pendingTarget.current) return;

    const cursor = window.scrollY + getNavigationHeight() + CONTENT_GAP + 7;
    let current = "";
    for (const id of SECTION_IDS) {
      const landmark = sectionLandmark(id);
      if (landmark && absoluteTop(landmark) <= cursor) current = id;
    }
    setActive(current);
  }, []);

  const navigateTo = useCallback((id: string, options?: {
    history?: boolean;
    focus?: boolean;
    behavior?: ScrollBehavior;
  }) => {
    const target = document.getElementById(id);
    const destination = targetPosition(id);
    if (!target || destination === null) return false;

    if (settleTimeout.current) clearTimeout(settleTimeout.current);
    pendingTarget.current = id;
    setActive(id === "top" ? "" : id);

    if (options?.history !== false) {
      const nextUrl = id === "top"
        ? `${location.pathname}${location.search}`
        : `#${encodeURIComponent(id)}`;
      if (id === "top" ? !!location.hash : location.hash !== `#${id}`) {
        history.pushState(null, "", nextUrl);
      }
    }

    // Foco para leitores de tela sem um segundo salto de scroll pelo browser.
    if (options?.focus !== false) {
      if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }

    window.scrollTo({
      top: destination,
      behavior: options?.behavior ?? (reduceMotion() ? "instant" : "smooth"),
    });

    // Sem eventos de scroll (destino já visível), também soltamos o bloqueio.
    settleTimeout.current = setTimeout(() => {
      pendingTarget.current = null;
      updateActive();
    }, 250);
    return true;
  }, [updateActive]);

  const onAnchorClick = useCallback((event: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    // Preserva abrir em nova aba/janela e ações do navegador.
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!document.getElementById(id)) return;
    event.preventDefault();
    navigateTo(id);
  }, [navigateTo]);

  useEffect(() => {
    if (!enabled) return;

    const schedule = () => {
      if (scrollFrame.current) return;
      scrollFrame.current = requestAnimationFrame(() => {
        scrollFrame.current = 0;
        if (pendingTarget.current) {
          if (settleTimeout.current) clearTimeout(settleTimeout.current);
          // O último evento do scroll suave libera o cálculo pela posição real.
          settleTimeout.current = setTimeout(() => {
            pendingTarget.current = null;
            updateActive();
          }, 150);
        } else {
          updateActive();
        }
      });
    };
    const interrupt = () => {
      pendingTarget.current = null;
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
      schedule();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) interrupt();
    };
    let historyFrame = 0;
    const onHistoryNavigation = () => {
      // Voltar/avançar pode disparar popstate e hashchange no mesmo frame.
      cancelAnimationFrame(historyFrame);
      historyFrame = requestAnimationFrame(() => {
        const id = decodeURIComponent(location.hash.slice(1)) || "top";
        if (document.getElementById(id)) navigateTo(id, { history: false, focus: false });
      });
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onHistoryNavigation);
    window.addEventListener("hashchange", onHistoryNavigation);

    const main = document.querySelector("main");
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    if (main && observer) observer.observe(main);

    // Links compartilhados, recarregamento em #faq etc.: alinhar depois do
    // hydrate. Imagens/fontes podem ajustar a altura acima da seção.
    const initialId = decodeURIComponent(location.hash.slice(1));
    const initialFrame = requestAnimationFrame(() => {
      if (initialId && document.getElementById(initialId)) {
        navigateTo(initialId, { history: false, focus: false, behavior: "instant" });
      } else updateActive();
    });
    let canceled = false;
    if (initialId) {
      void document.fonts?.ready.then(() => {
        if (!canceled && location.hash === `#${encodeURIComponent(initialId)}`) {
          navigateTo(initialId, { history: false, focus: false, behavior: "instant" });
        }
      });
    }

    return () => {
      canceled = true;
      cancelAnimationFrame(initialFrame);
      cancelAnimationFrame(historyFrame);
      cancelAnimationFrame(scrollFrame.current);
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onHistoryNavigation);
      window.removeEventListener("hashchange", onHistoryNavigation);
    };
  }, [enabled, navigateTo, updateActive]);

  return { active, onAnchorClick };
}
