// Componente da seção original do CLER — conteúdo e imagens preservados.
import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">
            <Tr id="m19" />
          </div>
          <h1 id="hero-title"><span><Tr id="m20" /></span></h1>
          <p className="lead"><Tr id="m21" /></p>
          <div className="actions">
            <a className="btn primary" href="https://pwa.cler.app/" rel="noopener noreferrer" target="_blank">
              <Tr id="m22" />
            </a>
            <a className="btn web" href="https://pwa.cler.app/" rel="noopener noreferrer" target="_blank">
              <Tr id="m23" />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <SafeImage
            altKey="heroAlt"
            alt="Telas do aplicativo CLER"
            className="hero-product"
            decoding="async"
            fetchPriority="high"
            loading="eager"
            src="https://framerusercontent.com/images/wI77eRcUMB8iR9aevS9XFsbU28.png?height=1750&width=2532" />
          <div className="hero-badge">
            <Tr id="m24" />
          </div>
        </div>
      </div>
    </section>
  );
}
