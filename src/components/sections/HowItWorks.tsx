"use client";

import Image from "next/image";
import { Tr } from "@/components/ui/Tr";
import { useApp } from "@/contexts/AppContext";
import styles from "./HowItWorks.module.css";

const screens = [
  {
    src: "/assets/tela-1-cler.webp",
    title: "howScreen1Title",
    description: "howScreen1Description",
    alt: "howScreen1Alt",
  },
  {
    src: "/assets/tela-2-cler.webp",
    title: "howScreen2Title",
    description: "howScreen2Description",
    alt: "howScreen2Alt",
  },
  {
    src: "/assets/tela-3-cler.webp",
    title: "howScreen3Title",
    description: "howScreen3Description",
    alt: "howScreen3Alt",
  },
  {
    src: "/assets/tela-4-cler.webp",
    title: "howScreen4Title",
    description: "howScreen4Description",
    alt: "howScreen4Alt",
  },
] as const;

/** Capturas atuais do app e suas explicações traduzíveis, fora das imagens. */
export function HowItWorks() {
  const { t } = useApp();

  return (
    <section
      className="section"
      id="como-funciona"
      aria-labelledby="how-it-works-title"
    >
      <div className="container">
        <div
          className="screens-only-head"
          data-aos="fade-up"
          data-aos-duration="570"
        >
          <h2 id="how-it-works-title" className="eyebrow">
            <Tr id="m32" />
          </h2>
        </div>

        <div
          className={`screen-strip screens-only ${styles.screens}`}
          data-aos="fade-up"
          data-aos-duration="570"
          role="region"
          aria-label={t("howScreensRegionLabel")}
          tabIndex={0}
        >
          {screens.map((screen) => (
            <figure className={styles.screen} key={screen.src}>
              <div className={`phone-shot ${styles.frame}`}>
                <Image
                  src={screen.src}
                  alt={t(screen.alt)}
                  width={591}
                  height={1280}
                  className={styles.image}
                  sizes="(max-width: 760px) 200px, (max-width: 1050px) 42vw, 260px"
                  loading="lazy"
                  unoptimized
                />
              </div>

              <figcaption className={styles.caption}>
                <h3 className={styles.title}>{t(screen.title)}</h3>
                <p className={styles.description}>{t(screen.description)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
