"use client";

import Link from "next/link";
import { useApp } from "@/contexts/AppContext";
import { journeyLabels } from "@/lib/trajectory";

export function JourneyBreadcrumb() {
  const { locale } = useApp();

  return (
    <nav className="container journey-breadcrumb" aria-label={journeyLabels.breadcrumbNav[locale]}>
      <Link href="/">{journeyLabels.breadcrumbHome[locale]}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{journeyLabels.breadcrumbCurrent[locale]}</span>
    </nav>
  );
}

export function JourneyReturn() {
  const { locale } = useApp();

  return (
    <div className="container journey-return">
      <Link className="btn secondary" href="/">
        <span aria-hidden="true">←</span>
        {journeyLabels.backToLanding[locale]}
      </Link>
    </div>
  );
}
