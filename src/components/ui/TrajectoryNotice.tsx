"use client";
import type { ReactNode } from "react";
import { useApp } from "@/contexts/AppContext";
export function TrajectoryNotice({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { locale, notify } = useApp();
  const message =
    locale === "pt"
      ? "A página da trajetória do CLER está em desenvolvimento."
      : "The CLER journey page is under development.";
  return (
    <button
      type="button"
      className={className}
      title={message}
      aria-label={message}
      onClick={() => notify(message)}
    >
      {children}
    </button>
  );
}
