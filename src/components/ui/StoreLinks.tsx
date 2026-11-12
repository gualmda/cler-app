"use client";

import { useApp } from "@/contexts/AppContext";
import { trackEvent } from "@/lib/analytics";
import styles from "./StoreLinks.module.css";

export const CLER_GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=app.cler.mobile";

type Props = {
  placement: "hero" | "get_started";
  className?: string;
};

/**
 * Google Play está disponível. App Store é apenas informativa até seu lançamento.
 * Os dois selos são compartilhados pela Hero e pelo CTA, evitando divergências.
 */
export function StoreLinks({ placement, className = "" }: Props) {
  const { t } = useApp();

  return (
    <div className={`${styles.stores} ${className}`} role="group" aria-label={t("storeLinksLabel")}>
      <a
        className={`${styles.badge} ${styles.googlePlay}`}
        href={CLER_GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("google_play_click", { placement })}
        aria-label={t("storeGooglePlayAria")}
      >
        <svg className={styles.playIcon} viewBox="0 0 28 30" fill="none" aria-hidden="true" focusable="false">
          <path d="M3.5 2.9C2.93 3.5 2.6 4.33 2.6 5.32v19.35c0 .98.32 1.8.9 2.4L14.7 15 3.5 2.9Z" fill="#32D0F0" />
          <path d="m18.4 11-3.7 4 3.7 4 5.1-3a1.85 1.85 0 0 0 0-2Z" fill="#FFD33D" />
          <path d="m3.5 2.9 11.2 12.1 3.7-4L6.1 3.9a3.14 3.14 0 0 0-2.6-1Z" fill="#45CD73" />
          <path d="M3.5 27.08a3.12 3.12 0 0 0 2.6-.99L18.4 19l-3.7-4L3.5 27.08Z" fill="#FB5858" />
        </svg>
        <span className={styles.label}>
          <small>{t("storeGooglePlayPrefix")}</small>
          <strong>Google Play</strong>
        </span>
      </a>

      <div className={styles.appleContainer}>
        <span className={`${styles.badge} ${styles.appleUnavailable}`} aria-label={t("storeAppleUnavailableAria")}>
          <svg className={styles.appleIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M17.05 12.536c-.027-3.087 2.523-4.56 2.64-4.63-1.445-2.114-3.687-2.405-4.489-2.429-1.911-.201-3.763 1.128-4.735 1.128-.982 0-2.532-1.104-4.133-1.074C4.206 5.559 2.76 6.85 1.725 8.41c-2.07 3.13-.525 7.746 1.49 10.288.987 1.249 2.167 2.65 3.716 2.599 1.512-.059 2.082-.843 3.891-.843 1.8 0 2.32.843 3.916.806 1.62-.027 2.643-1.177 3.62-2.432a11.07 11.07 0 0 0 1.634-3.36c-.039-.013-2.91-1.117-2.943-4.932zM15.93 3.407A5.072 5.072 0 0 0 17.102 0a4.98 4.98 0 0 0-3.24 1.7 4.747 4.747 0 0 0-1.206 3.3c1.21.092 2.45-.614 3.274-1.593z" />
          </svg>
          <span className={styles.label}>
            <small>{t("storeApplePrefix")}</small>
            <strong>App Store</strong>
          </span>
        </span>
        <span className={styles.soon}>{t("storeAppleSoon")}</span>
      </div>
    </div>
  );
}
