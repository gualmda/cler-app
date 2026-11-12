"use client";

import Image from "next/image";
import { useApp } from "@/contexts/AppContext";
import styles from "./GetStarted.module.css";
import { StoreLinks, CLER_GOOGLE_PLAY_URL } from "@/components/ui/StoreLinks";

/** Divulgação do app: Google Play ativo, App Store em breve e PWA preservado. */
export function GetStarted() {
  const { t } = useApp();

  return (
    <section className={styles.section} aria-labelledby="get-started-title">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.content} data-aos="fade-up" data-aos-duration="650">
            <span className={`eyebrow ${styles.eyebrow}`}>{t("m114")}</span>
            <h2 id="get-started-title" className={styles.heading}>
              {t("m115")}
            </h2>
            <p className={styles.description}>{t("m116")}</p>
            <p className={styles.supportText}>{t("m117")}</p>

            <div className={styles.storeArea}>
              <p className={styles.storeStatus}>{t("getStartedStoresSoon")}</p>
              <div className={styles.storeLayout}>
                <StoreLinks placement="get_started" />
                <div className={styles.qrPanel}>
                  <a
                    href={CLER_GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.qrLink}
                    aria-label={t("storeQrLinkAria")}
                  >
                    <Image
                      src="/assets/cler-google-play-qr.png"
                      alt={t("storeQrAlt")}
                      width={520}
                      height={520}
                      unoptimized
                      sizes="(max-width: 760px) 120px, 144px"
                      className={styles.qrImage}
                    />
                  </a>
                  <p className={styles.qrCaption}>{t("storeQrCaption")}</p>
                </div>
              </div>
            </div>

            {/* Botões originais preservados como as únicas ações de acesso. */}
            <div className={`actions ${styles.actions}`}>
              <a className="btn primary" href="https://pwa.cler.app/" rel="noopener noreferrer" target="_blank">
                {t("m118")}
              </a>
              <a className="btn secondary" href="https://pwa.cler.app/" rel="noopener noreferrer" target="_blank">
                {t("m119")}
              </a>
            </div>
          </div>
          <div className={styles.visual} data-aos="fade-left" data-aos-duration="700" aria-hidden="true">
            <div className={styles.glow} />
            <Image
              src="/assets/cler-app-phone.webp"
              alt=""
              width={2048}
              height={1414}
              sizes="(max-width: 760px) 100vw, (max-width: 1020px) 70vw, 610px"
              className={styles.phone}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
