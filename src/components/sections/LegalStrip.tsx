// Componente da seção original do CLER — conteúdo e imagens preservados.
import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { LegalOpen } from "@/components/ui/LegalOpen";

export function LegalStrip() {
  return (
    <section className="legal-strip" id="seguranca">
      <div className="container legal-inline">
        <h3 data-aos="fade-up" data-aos-duration="570"><Tr id="m122" /></h3>
        <div className="actions" data-aos="fade-up" data-aos-duration="570">
          <LegalOpen section="terms" className="btn secondary legal-open"><Tr id="m123" /></LegalOpen>
          <LegalOpen section="privacy" className="btn secondary legal-open"><Tr id="m124" /></LegalOpen>
        </div>
      </div>
    </section>
  );
}
