"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { LegalOpen } from "@/components/ui/LegalOpen";
export function Footer() {
  const isHome = usePathname() === "/";
  const homeHref = (id: string) => isHome ? `#${id}` : `/#${id}`;

  return (<footer>
    <div className="container">
      <div className="foot-grid">
        <div className="foot-brand">
          <Link className="brand" href={isHome ? "#top" : "/"}>
            <SafeImage
              alt="CLER"
              className="brand-logo inline-style-10"
              decoding="async"
              loading="lazy"
              src="https://framerusercontent.com/images/0idPQ1yveGHqGoYDtDfWza5Ho.png?height=162&scale-down-to=512&width=730" />
            <span className="brand-fallback inline-style-10">cler</span>
          </Link>
          <p><Tr id="m174" /></p>
        </div>
        <div>
          <h4><Tr id="m175" /></h4>
          <Link href={homeHref("como-funciona")}>
            <Tr id="m176" />
          </Link>
          <Link href={homeHref("beneficios")}>
            <Tr id="m177" />
          </Link>
          <Link href={homeHref("informacoes-saude")}>
            <Tr id="m178" />
          </Link>
          <Link href={homeHref("para-quem")}>
            <Tr id="m179" />
          </Link>
          <Link href={homeHref("faq")}>
            <Tr id="m180" />
          </Link>
        </div>
        <div>
          <h4>CLER</h4>
          <Link href={homeHref("sobre")}>
            <Tr id="m182" />
          </Link>
          <Link href="/trajetoria">
            <Tr id="m183" />
          </Link>
          <Link href={homeHref("parcerias")}>
            <Tr id="m184" />
          </Link>
          <a href="mailto:contatocler.app@gmail.com">
            <Tr id="m185" />
          </a>
          <a href="https://pwa.cler.app/" rel="noopener noreferrer" target="_blank">
            <Tr id="m186" />
          </a>
        </div>
        <div>
          <h4><Tr id="m187" /></h4>
          <LegalOpen section="terms" className="legal-open inline-style-11"><Tr id="m188" /></LegalOpen>
          <LegalOpen section="privacy" className="legal-open inline-style-11"><Tr id="m189" /></LegalOpen>
        </div>
      </div>
      <div className="copy">
        <span><Tr id="m191" /></span>
        <span><Tr id="m192" /></span>
      </div>
    </div>
  </footer>);
}
