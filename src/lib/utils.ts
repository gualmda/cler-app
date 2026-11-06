/** Compatibilidade com os componentes distribuídos pelo Lucide Animated. */
export function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}
