// Componente da seção original do CLER — conteúdo e imagens preservados.
import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

export function Benefits() {
  return (
    <section className="section soft" id="beneficios">
      <div className="container">
        <div className="section-head">
          <div data-aos="fade-up" data-aos-duration="570">
            <div className="eyebrow">
              <Tr id="m33" />
            </div>
            <h2><Tr id="m34" /></h2>
          </div>
          <p className="lead" data-aos="fade-up" data-aos-duration="570"><Tr id="m35" /></p>
        </div>
        <div className="benefits-layout">
          <div className="benefit-mini-grid">
            <article className="benefit-mini" data-aos="fade-up" data-aos-duration="570" data-aos-delay="0">
              <div className="benefit-icon al-icon-wrapper">
                <AnimatedIcon name="house" size={25} className="lucide-icon lucide-house" />
              </div>
              <h3><Tr id="m37" /></h3>
              <p><Tr id="m38" /></p>
              <span className="gain"><Tr id="m39" /></span>
            </article>
            <article className="benefit-mini" data-aos="fade-up" data-aos-duration="570" data-aos-delay="90">
              <div className="benefit-icon al-icon-wrapper">
                <AnimatedIcon name="users" size={25} className="lucide-icon lucide-users" />
              </div>
              <h3><Tr id="m41" /></h3>
              <p><Tr id="m42" /></p>
              <span className="gain"><Tr id="m43" /></span>
            </article>
            <article className="benefit-mini" data-aos="fade-up" data-aos-duration="570" data-aos-delay="180">
              <div className="benefit-icon al-icon-wrapper">
                <AnimatedIcon name="bell" size={25} className="lucide-icon lucide-bell" />
              </div>
              <h3><Tr id="m45" /></h3>
              <p><Tr id="m46" /></p>
              <span className="gain"><Tr id="m47" /></span>
            </article>
            <article className="benefit-mini" data-aos="fade-up" data-aos-duration="570" data-aos-delay="270">
              <div className="benefit-icon al-icon-wrapper">
                <AnimatedIcon name="scan-text" size={25} className="lucide-icon lucide-scan-text" />
              </div>
              <h3><Tr id="m49" /></h3>
              <p><Tr id="m50" /></p>
              <span className="gain"><Tr id="m51" /></span>
            </article>
          </div>
          <aside className="report-feature" data-aos="fade-up" data-aos-duration="570">
            <div>
              <div className="benefit-icon al-icon-wrapper">
                <AnimatedIcon name="chart-line" size={25} className="lucide-icon lucide-chart-line" />
              </div>
              <h3><Tr id="m53" /></h3>
              <p><Tr id="m54" /></p>
              <span className="gain"><Tr id="m55" /></span>
            </div>
            <div>
              <div className="report-shot">
                <SafeImage
                  altKey="report"
                  alt="Exemplo de relatório de medicações em uso gerado pelo CLER, com dados pessoais ocultados"
                  decoding="async"
                  loading="lazy"
                  width={210}
                  height={287}
                  src="/assets/relatorio-cler.png" />
              </div>
              <span className="report-caption"><Tr id="m56" /></span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
