import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { LegalOpen } from "@/components/ui/LegalOpen";
export function Footer() {
  return (<footer>
    <div className="container">
      <div className="foot-grid">
        <div className="foot-brand">
          <a className="brand" href="#top">
            <SafeImage
              alt="CLER"
              className="brand-logo inline-style-10"
              decoding="async"
              loading="lazy"
              src="https://framerusercontent.com/images/0idPQ1yveGHqGoYDtDfWza5Ho.png?height=162&scale-down-to=512&width=730" />
            <span className="brand-fallback inline-style-10">{"cler"}</span>
          </a>
          <p><Tr id="m174" /></p>
        </div>
        <div>
          <h4><Tr id="m175" /></h4>
          <a href="#como-funciona">
            <Tr id="m176" />
          </a>
          <a href="#beneficios">
            <Tr id="m177" />
          </a>
          <a href="#informacoes-saude">
            <Tr id="m178" />
          </a>
          <a href="#para-quem">
            <Tr id="m179" />
          </a>
          <a href="#faq">
            <Tr id="m180" />
          </a>
        </div>
        <div>
          <h4>{"CLER"}</h4>
          <a href="#sobre">
            <Tr id="m182" />
          </a>
          <a href="#trajetoria">
            <Tr id="m183" />
          </a>
          <a href="#parcerias">
            <Tr id="m184" />
          </a>
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
