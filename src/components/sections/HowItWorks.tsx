"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import styles from "./HowItWorks.module.css";

/** Demonstração do CLER, sem carregar o MP4 durante o primeiro paint da landing. */
export function HowItWorks() {
  const { t } = useApp();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const loadVideo = () => {
      setAutoPlay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setShouldLoad(true);
    };

    if (!("IntersectionObserver" in window)) {
      loadVideo();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        loadVideo();
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || videoError) return;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pausedByVisibility = false;

    const onMotionChange = () => {
      if (motion.matches) video.pause();
    };

    const onVisibilityChange = () => {
      if (document.hidden && !video.paused) {
        pausedByVisibility = true;
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          pausedByVisibility = true;
          video.pause();
        } else if (
          entry.isIntersecting &&
          !document.hidden &&
          pausedByVisibility &&
          !motion.matches
        ) {
          pausedByVisibility = false;
          void video.play().catch(() => {
            // O navegador pode exigir uma interação: os controles continuam acessíveis.
          });
        }
      },
      { threshold: 0.15 },
    );

    if ("IntersectionObserver" in window) observer.observe(frame);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [shouldLoad, retryCount, videoError]);

  return (
    <section
      id="como-funciona"
      className={`section ${styles.section}`}
      aria-labelledby="how-it-works-title"
    >
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.videoColumn} ref={frameRef}>
            <div className={styles.videoFrame}>
              {videoError ? (
                <div className={styles.fallback} role="alert">
                  <p>{t("howVideoError")}</p>
                  <button
                    type="button"
                    className={styles.retryButton}
                    onClick={() => {
                      setVideoError(false);
                      setRetryCount((value) => value + 1);
                    }}
                  >
                    {t("howVideoRetry")}
                  </button>
                </div>
              ) : shouldLoad ? (
                <video
                  key={retryCount}
                  ref={videoRef}
                  className={styles.video}
                  src="/assets/tutorial-cler.mp4"
                  autoPlay={autoPlay}
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label={t("howVideoAriaLabel")}
                  onError={() => setVideoError(true)}
                >
                  {t("howVideoFallback")}
                </video>
              ) : (
                <div className={styles.placeholder} aria-hidden="true">
                  <span className={styles.placeholderSymbol}>▶</span>
                </div>
              )}
            </div>
            <p className={styles.videoCaption}>{t("howVideoCaption")}</p>
          </div>

          <div className={styles.content} data-aos="fade-up" data-aos-duration="570">
            <span className="eyebrow">{t("m32")}</span>
            <h2 id="how-it-works-title" className={styles.heading}>
              {t("howVideoTitle")}
            </h2>
            <p className={styles.lead}>{t("howVideoLead")}</p>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.dot} aria-hidden="true" />
                <div>
                  <h3>{t("howVideoFeature1Title")}</h3>
                  <p>{t("howVideoFeature1Description")}</p>
                </div>
              </div>
              <div className={styles.highlight}>
                <span className={styles.dot} aria-hidden="true" />
                <div>
                  <h3>{t("howVideoFeature2Title")}</h3>
                  <p>{t("howVideoFeature2Description")}</p>
                </div>
              </div>
            </div>

            <p className={styles.playbackNote}>{t("howVideoPlaybackNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
