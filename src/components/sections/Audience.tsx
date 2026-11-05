import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";

export function Audience() {
  return (
    <section className="section soft" id="para-quem">
      <div className="container">
        <div className="section-head">
          <div data-aos="fade-up" data-aos-duration="570">
            <div className="eyebrow">
              <Tr id="m78" />
            </div>
            <h2>
              <Tr id="m79" />
            </h2>
          </div>
          <p className="lead" data-aos="fade-up" data-aos-duration="570">
            <Tr id="m80" />
          </p>
        </div>
        <div className="audience-grid">
          <article
            className="audience"
            data-aos="fade-up"
            data-aos-duration="570"
            data-aos-delay="0"
          >
            <div className="audience-photo">
              <SafeImage
                altKey="selfCare"
                alt="Pessoa cuidando da própria saúde"
                decoding="async"
                loading="lazy"
                src="https://framerusercontent.com/images/QKNdmnpruOoCYV0dUl1h68Oi7A.png?height=1024&width=1536"
              />
              <div aria-hidden="true" className="photo-fallback">
                <Tr id="m81" />
              </div>
            </div>
            <div className="audience-body">
              <span className="label">
                <Tr id="m82" />
              </span>
              <h3>
                <Tr id="m83" />
              </h3>
              <p>
                <Tr id="m84" />
              </p>
              <div className="gain">
                <Tr id="m85" />
              </div>
            </div>
          </article>
          <article
            className="audience"
            data-aos="fade-up"
            data-aos-duration="570"
            data-aos-delay="90"
          >
            <div className="audience-photo">
              <SafeImage
                altKey="familyCare"
                alt="Familiar acompanhando o cuidado de uma pessoa idosa"
                decoding="async"
                loading="lazy"
                src="https://framerusercontent.com/images/Rr4xTf8Uen8XvDbkjAIYoZHZD0.png?height=1024&width=1536"
              />
              <div aria-hidden="true" className="photo-fallback">
                <Tr id="m86" />
              </div>
            </div>
            <div className="audience-body">
              <span className="label">
                <Tr id="m87" />
              </span>
              <h3>
                <Tr id="m88" />
              </h3>
              <p>
                <Tr id="m89" />
              </p>
              <div className="gain">
                <Tr id="m90" />
              </div>
            </div>
          </article>
          <article
            className="audience"
            data-aos="fade-up"
            data-aos-duration="570"
            data-aos-delay="180"
          >
            <div className="audience-photo">
              <SafeImage
                altKey="professionalCare"
                alt="Cuidadora profissional acompanhando uma pessoa idosa"
                decoding="async"
                loading="lazy"
                src="https://images.unsplash.com/photo-1764006145420-df3006edf060?auto=format&fit=crop&fm=jpg&q=80&w=1600"
              />
              <div aria-hidden="true" className="photo-fallback">
                <Tr id="m91" />
              </div>
            </div>
            <div className="audience-body">
              <span className="label">
                <Tr id="m92" />
              </span>
              <h3>
                <Tr id="m93" />
              </h3>
              <p>
                <Tr id="m94" />
              </p>
              <div className="gain">
                <Tr id="m95" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
