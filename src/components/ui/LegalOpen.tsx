"use client";
import type { ReactNode } from "react";
import { useApp } from "@/contexts/AppContext";
export function LegalOpen({ section, className = "", children }: { section: "terms" | "privacy"; className?: string; children: ReactNode; }) {
  const { openLegal } = useApp();
  return <button type="button" className={className} onClick={() => openLegal(section)}>
    {children}
  </button>;
}
