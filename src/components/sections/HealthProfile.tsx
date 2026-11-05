import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";

export function HealthProfile() {
  return (
    <section className="section blue-soft" id="informacoes-saude">
      <div className="container">
        <div className="health-head" data-aos="fade-up" data-aos-duration="570">
          <div className="eyebrow">
            <Tr id="m57" />
          </div>
          <h2>
            <Tr id="m58" />
          </h2>
          <p className="lead">
            <Tr id="m59" />
          </p>
        </div>
        <div className="health-layout">
          <div
            className="health-shot health-shot-large"
            data-aos="fade-up"
            data-aos-duration="570"
          >
            <SafeImage
              altKey="health"
              alt="Tela real do CLER com tipo sanguíneo, doenças preexistentes e alergias"
              decoding="async"
              loading="lazy"
              src="/assets/perfil-saude-cler.jpg"
            />
          </div>
          <div
            className="health-info"
            data-aos="fade-up"
            data-aos-duration="570"
          >
            <h3>
              <Tr id="m60" />
            </h3>
            <ul className="health-list">
              <li>
                <Tr id="m61" />
              </li>
              <li>
                <Tr id="m62" />
              </li>
              <li>
                <Tr id="m63" />
              </li>
              <li>
                <Tr id="m64" />
              </li>
              <li>
                <Tr id="m65" />
              </li>
              <li>
                <Tr id="m66" />
              </li>
              <li>
                <Tr id="m67" />
              </li>
            </ul>
          </div>
        </div>
        <div className="health-closing">
          <Tr id="m68" />
        </div>
      </div>
    </section>
  );
}
