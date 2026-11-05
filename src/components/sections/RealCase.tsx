import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";

export function RealCase() {
  return (
    <section className="section" id="caso-real">
      <div className="container">
        <div className="case-head" data-aos="fade-up" data-aos-duration="570">
          <div className="eyebrow">
            <Tr id="m69" />
          </div>
          <h2>
            <Tr id="m70" />
          </h2>
          <p className="lead">
            <Tr id="m71" />
          </p>
        </div>
        <div
          className="case-image case-image-wide"
          data-aos="fade-up"
          data-aos-duration="570"
        >
          <SafeImage
            altKey="comparison"
            alt="Caso real comparando informações de medicamentos fornecidas manualmente e organizadas pelo CLER"
            decoding="async"
            loading="lazy"
            src="/assets/comparativo-cler.png"
          />
        </div>
        <div className="case-note centered">
          <Tr id="m72" />
        </div>
        <div
          className="case-points case-points-wide"
          data-aos="fade-up"
          data-aos-duration="570"
        >
          <div className="case-point">
            <strong>
              <Tr id="m73" />
            </strong>
            <p>
              <Tr id="m74" />
            </p>
          </div>
          <div className="case-point">
            <strong>
              <Tr id="m75" />
            </strong>
            <p>
              <Tr id="m76" />
            </p>
          </div>
        </div>
        <div className="case-closing centered">
          <Tr id="m77" />
        </div>
      </div>
    </section>
  );
}
