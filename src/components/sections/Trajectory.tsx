"use client";

import Image from "next/image";
import { useApp } from "@/contexts/AppContext";
import {
  journeyLabels, journeyYears,
  type Pair, type JourneyYear, type JourneyGroup,
} from "@/lib/trajectory";
import styles from "./Trajectory.module.css";

/** Timeline acessível com a mesma seleção PT/EN e tema da landing. */
export function Trajectory() {
  const { locale } = useApp();
  const tr = (pair: Pair) => pair[locale];
  const label = (key: string) => tr(journeyLabels[key]);

  const renderGroup = (group: JourneyGroup, year: string, index: number) => {
    const titleId = `trajetoria-${year}-${index + 1}`;
    return <div className={styles.group} key={titleId}>
      <h3 id={titleId} className={styles.groupTitle}>{tr(group.heading)}</h3>
      <ol className={styles.events} aria-labelledby={titleId}>
        {group.events.map((event, eventIndex) => <li key={`${titleId}-${eventIndex}`} className={styles.event}>
          {event.date
            ? <time className={styles.period} dateTime={event.date}>{tr(event.when)}</time>
            : <span className={styles.period}>{tr(event.when)}</span>}
          <p>{tr(event.detail)}</p>
        </li>)}
      </ol>
      <div className={styles.galleryWrap}>
        <p className={styles.galleryHeading}>{label("photos")}</p>
        <div className={styles.gallery}>
          {group.photos.map(photo => <a
            key={photo.file}
            href={photo.file}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.photo}
            title={label("openPhoto")}
            aria-label={`${label("openPhoto")}: ${tr(photo.alt)}`}>
            <Image
              src={photo.file}
              fill
              className={styles.photoImg}
              alt={tr(photo.alt)}
              sizes="(max-width: 540px) 44vw, (max-width: 900px) 28vw, 240px"
              loading="lazy" />
          </a>)}
        </div>
      </div>
    </div>;
  };

  const renderYear = (year: JourneyYear) => <article key={year.year} data-year={year.year}
    className={styles.yearCard} data-aos="fade-up" data-aos-duration="650">
    <div className={styles.yearLeft}>
      <h2 className={styles.yearNumber}>{year.year}</h2>
      <span className={styles.yearDivider} aria-hidden="true" />
    </div>
    <div className={styles.yearRight}>
      {year.groups.map((group, index) => renderGroup(group, year.year, index))}
    </div>
  </article>;

  return <section className={`section ${styles.section}`} id="trajetoria" aria-labelledby="trajetoria-titulo">
    <div className="container">
      <div className={styles.intro} data-aos="fade-up" data-aos-duration="650">
        <div>
          <span className="eyebrow">{label("eyebrow")}</span>
          <h1 id="trajetoria-titulo" className={styles.title}>{label("years")}</h1>
        </div>
        <p className={`lead ${styles.introLead}`}>{label("lead")}</p>
      </div>
      <div className={styles.years}>
        {journeyYears.map(renderYear)}
      </div>
      <div className={styles.next} data-aos="fade-up" data-aos-duration="650">
        <span className="eyebrow">{label("nextEyebrow")}</span>
        <h2 className={styles.nextTitle}>{label("next")}</h2>
        <div className={styles.nextGrid}>
          <article className={styles.nextCard}>
            <span className={styles.nextIndex} aria-hidden="true">01</span>
            <h3>{label("deploy")}</h3>
            <p>{label("deployBody")}</p>
          </article>
          <article className={styles.nextCard}>
            <span className={styles.nextIndex} aria-hidden="true">02</span>
            <h3>{label("product")}</h3>
            <p>{label("productBody")}</p>
          </article>
        </div>
      </div>
      <aside className={styles.closing} data-aos="fade-up" data-aos-duration="650">
        <h2>{label("closing")}</h2>
        <p>{label("closingBody")}</p>
        <strong>{label("tagline")}</strong>
      </aside>
    </div>
  </section>;
}
