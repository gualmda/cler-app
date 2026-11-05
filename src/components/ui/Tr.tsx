"use client";
import { useApp } from "@/contexts/AppContext";
export function Tr({ id }: { id: string }) {
  const { t } = useApp();
  return <>{t(id)}</>;
}
