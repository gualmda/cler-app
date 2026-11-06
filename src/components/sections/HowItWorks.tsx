"use client";
// Componente da seção original do CLER — conteúdo e imagens preservados.
import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { useApp } from "@/contexts/AppContext";

export function HowItWorks() {
  const { locale } = useApp();
  return (
    <section className="section" id="como-funciona">
      <div className="container">
        <div className="screens-only-head" data-aos="fade-up" data-aos-duration="570">
          <div className="eyebrow">
            <Tr id="m32" />
          </div>
        </div>
        <div
          aria-label={locale === "pt" ? "Telas reais do CLER — versão atual usada como marcação" : "CLER application screens — current version"}
          className="screen-strip screens-only"
          data-aos="fade-up"
          data-aos-duration="570">
          <div className="phone-shot">
            <SafeImage
              altKey="screen1"
              alt="Tela 1 de 4 do aplicativo CLER"
              decoding="async"
              loading="lazy"
              src="https://framerusercontent.com/images/b04S0iPIKkACToSiZutrogWv6U.png?height=966&width=493" />
          </div>
          <div className="phone-shot">
            <SafeImage
              altKey="screen2"
              alt="Tela 2 de 4 do aplicativo CLER"
              decoding="async"
              loading="lazy"
              src="https://framerusercontent.com/images/EnIJXMMjhBZrS30nOt61oe9MRo.png?height=966&width=493" />
          </div>
          <div className="phone-shot">
            <SafeImage
              altKey="screen3"
              alt="Tela 3 de 4 do aplicativo CLER"
              decoding="async"
              loading="lazy"
              src="https://framerusercontent.com/images/DlFxdlIV6WdcUDgcQMEQND0Fq5I.png?height=966&width=493" />
          </div>
          <div className="phone-shot">
            <SafeImage
              altKey="screen4"
              alt="Tela 4 de 4 do aplicativo CLER"
              decoding="async"
              loading="lazy"
              src="https://framerusercontent.com/images/vrkgeppEMKHXzy2TjRYfaOClo.png?height=966&width=493" />
          </div>
        </div>
      </div>
    </section>
  );
}
