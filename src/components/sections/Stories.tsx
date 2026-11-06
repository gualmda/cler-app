// Componente da seção original do CLER — conteúdo e imagens preservados.
import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

export function Stories() {
  return (
    <section className="section peach" id="historias-reais">
      <div className="container">
        <div className="section-head">
          <div data-aos="fade-up" data-aos-duration="570">
            <div className="eyebrow">
              <Tr id="m96" />
            </div>
            <h2><Tr id="m97" /></h2>
          </div>
          <p className="lead" data-aos="fade-up" data-aos-duration="570"><Tr id="m98" /></p>
        </div>
        <div className="real-story-grid">
          <article className="real-story" data-aos="fade-up" data-aos-duration="570" data-aos-delay="0">
            <span className="story-kicker"><Tr id="m99" /></span>
            <h3><Tr id="m100" /></h3>
            <p><Tr id="m101" /></p>
            <div className="story-solution">
              <strong><Tr id="m102" /></strong>
              <p><Tr id="m103" /></p>
            </div>
          </article>
          <article className="real-story" data-aos="fade-up" data-aos-duration="570" data-aos-delay="90">
            <span className="story-kicker"><Tr id="m104" /></span>
            <h3><Tr id="m105" /></h3>
            <p><Tr id="m106" /></p>
            <div className="story-solution">
              <strong><Tr id="m107" /></strong>
              <p><Tr id="m108" /></p>
            </div>
          </article>
          <article className="real-story" data-aos="fade-up" data-aos-duration="570" data-aos-delay="180">
            <span className="story-kicker"><Tr id="m109" /></span>
            <h3><Tr id="m110" /></h3>
            <p><Tr id="m111" /></p>
            <div className="story-solution">
              <strong><Tr id="m112" /></strong>
              <p><Tr id="m113" /></p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
