"use client";
import { useApp } from "@/contexts/AppContext";
/** Exibe a cópia original ou a tradução, sem manipulação direta do DOM. */
export function Tr({ id }: { id: string; }) {
  const { t } = useApp();
  return <>{t(id)}</>;
}
