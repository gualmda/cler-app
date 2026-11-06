"use client";
// Componente da seção original do CLER — conteúdo e imagens preservados.
import { Tr } from "@/components/ui/Tr";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { useApp } from "@/contexts/AppContext";

export function About() {
  const { locale } = useApp();
  return (
    <section className="section story" id="sobre">
      <div className="container story-grid">
        <div className="story-copy" data-aos="fade-up" data-aos-duration="570">
          <div className="eyebrow">
            <Tr id="m25" />
          </div>
          <h2><Tr id="m26" /></h2>
          <p><Tr id="m27" /></p>
          <p><Tr id="m28" /></p>
        </div>
        <div data-aos="fade-up" data-aos-duration="570">
          <a
            aria-label={locale === "pt" ? "Assistir ao vídeo de Kycia Cordeiro no YouTube" : "Watch Kycia Cordeiro’s story on YouTube"}
            className="video-card"
            href="https://www.youtube.com/watch?v=b8LD9U3aBdA"
            rel="noopener noreferrer"
            target="_blank">
            <SafeImage
              altKey="founder"
              alt="Kycia Cordeiro, fundadora do CLER"
              decoding="async"
              loading="lazy"
              src="https://framerusercontent.com/images/7DasQCpiJmn46tCAf9RVGUac8c.jpeg?height=853&width=1280" />
            <span className="play al-icon-wrapper"><AnimatedIcon name="play" size={30} className="lucide-icon lucide-play" /></span>
            <span className="video-caption">
              <strong>{"Kycia Cordeiro"}</strong>
              <small><Tr id="m31" /></small>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
