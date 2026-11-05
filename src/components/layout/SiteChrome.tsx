"use client";
import { useApp } from "@/contexts/AppContext";
import { BackToTop } from "@/components/ui/BackToTop";
import { LegalModal } from "@/components/layout/LegalModal";
import { AosInit } from "@/components/ui/AosInit";
export function SiteChrome() {
  const { notice } = useApp();
  return (
    <>
      <AosInit />
      <LegalModal />
      <div
        className="site-notice"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        hidden={!notice}
      >
        {notice}
      </div>
      <BackToTop />
    </>
  );
}
