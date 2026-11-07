"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { useApp } from "@/contexts/AppContext";
import styles from "./JourneyTeaser.module.css";

/** Convite breve à página de trajetória, sem repetir a linha do tempo na landing. */
export function JourneyTeaser() {
  const { t } = useApp();

  return (
    <section className={styles.section} aria-labelledby="journey-teaser-title">
      <div className="container">
        <div
          className={styles.card}
          data-aos="fade-up"
          data-aos-duration="650"
          data-aos-once="true"
        >
          <div className={styles.content}>
            <span className={`eyebrow ${styles.eyebrow}`}>
              {t("journeyTeaserEyebrow")}
            </span>

            <h2 id="journey-teaser-title" className={styles.heading}>
              {t("journeyTeaserHeading")}
              <span>{t("journeyTeaserHighlight")}</span>
            </h2>

            <p className={styles.description}>
              {t("journeyTeaserDescription")}
            </p>

            <div className={styles.actions}>
              <Link href="/trajetoria" className={`btn primary ${styles.cta}`}>
                <span>{t("journeyTeaserCta")}</span>
                <span className={styles.ctaIcon}>
                  <AnimatedIcon name="chevron-down" size={20} />
                </span>
              </Link>
              <span className={styles.period}>
                {t("journeyTeaserPeriod")}
                <small className={styles.ongoing}>{t("journeyTeaserOngoing")}</small>
              </span>
            </div>
          </div>

          <div className={styles.visual} role="group" aria-label={t("journeyTeaserPhotosLabel")}>
            <div className={styles.glow} aria-hidden="true" />
            <figure className={`${styles.photo} ${styles.photoCare}`}>
              <Image
                src="/assets/trajectory/p2-2.webp"
                alt={t("journeyTeaserCareAlt")}
                fill
                sizes="(max-width: 760px) 72vw, (max-width: 1180px) 36vw, 390px"
                className={styles.photoImage}
              />
              <figcaption className={styles.photoBadge}>2024</figcaption>
            </figure>
            <figure className={`${styles.photo} ${styles.photoEvent}`}>
              <Image
                src="/assets/trajectory/p5-3.webp"
                alt={t("journeyTeaserEventAlt")}
                fill
                sizes="(max-width: 760px) 44vw, (max-width: 1180px) 21vw, 230px"
                className={styles.photoImage}
              />
              <figcaption className={styles.photoBadge}>2026</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
