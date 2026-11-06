// Componente da seção original do CLER — conteúdo e imagens preservados.
import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { ContactForm } from "@/components/ui/ContactForm";

export function Partnerships() {
  return (
    <section className="section dark" id="parcerias">
      <div className="container">
        <div className="intel-wrap">
          <div data-aos="fade-up" data-aos-duration="570">
            <div className="eyebrow inline-style-5">
              <Tr id="m125" />
            </div>
            <h2><Tr id="m126" /></h2>
            <p className="lead inline-style-6"><Tr id="m127" /></p>
            <div className="intel-claim">
              <Tr id="m128" />
              <span><Tr id="m129" /></span>
            </div>
          </div>
          <div className="intel-cards" data-aos="fade-up" data-aos-duration="570">
            <article className="intel-card" data-aos="fade-up" data-aos-duration="570" data-aos-delay="60">
              <h3><Tr id="m130" /></h3>
              <p><Tr id="m131" /></p>
            </article>
            <article className="intel-card" data-aos="fade-up" data-aos-duration="570" data-aos-delay="60">
              <h3><Tr id="m132" /></h3>
              <p><Tr id="m133" /></p>
            </article>
            <article className="intel-card" data-aos="fade-up" data-aos-duration="570" data-aos-delay="60">
              <h3><Tr id="m134" /></h3>
              <p><Tr id="m135" /></p>
            </article>
          </div>
        </div>
        <div className="partner-box">
          <div data-aos="fade-up" data-aos-duration="570">
            <h3><Tr id="m136" /></h3>
            <p className="inline-style-7"><Tr id="m137" /></p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
