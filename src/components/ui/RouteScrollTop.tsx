"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Reinicia a rolagem apenas quando a ROTA muda (/, /trajetoria etc.).
 *
 * Links para seções (#sobre, #faq etc.) não são afetados: o posicionamento
 * dessas âncoras continua sob responsabilidade do useSectionNavigation.
 * Uma nova rota com hash também é respeitada.
 */
export function RouteScrollTop() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    // Ao voltar de /trajetoria para /#faq, preservar o destino da âncora.
    if (window.location.hash) return;

    const resetScroll = () => {
      // 'instant' ignora o scroll-behavior: smooth global apenas nesta ação.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    // O primeiro ajuste ocorre antes da pintura; o segundo, depois de o
    // App Router concluir o posicionamento nativo da nova tela.
    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
