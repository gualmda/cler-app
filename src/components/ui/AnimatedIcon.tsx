"use client";

/**
 * Cada ícone abaixo é um componente TSX do repositório OFICIAL
 * lucide-animated.com, instalado em src/components/icons por `npm install`.
 * As variantes e o controle das animações vêm de cada componente original;
 * não usamos lucide-react nem substituímos o motion original por CSS.
 */
import { ArrowUpIcon } from "@/components/icons/arrow-up";
import { BellIcon } from "@/components/icons/bell";
import { ChartLineIcon } from "@/components/icons/chart-line";
import { ChevronDownIcon } from "@/components/icons/chevron-down";
import { HomeIcon } from "@/components/icons/home";
import { MenuIcon } from "@/components/icons/menu";
import { MoonIcon } from "@/components/icons/moon";
import { PlayIcon } from "@/components/icons/play";
import { ScanTextIcon } from "@/components/icons/scan-text";
import { SunIcon } from "@/components/icons/sun";
import { UsersIcon } from "@/components/icons/users";
import { XIcon } from "@/components/icons/x";

const icons = {
  "arrow-up": ArrowUpIcon,
  bell: BellIcon,
  "chart-line": ChartLineIcon,
  "chevron-down": ChevronDownIcon,
  house: HomeIcon, // a coleção oficial usa `home` para esta representação
  menu: MenuIcon,
  moon: MoonIcon,
  play: PlayIcon,
  "scan-text": ScanTextIcon,
  sun: SunIcon,
  users: UsersIcon,
  x: XIcon,
} as const;

export type AnimatedIconName = keyof typeof icons;

export function AnimatedIcon({
  name,
  size = 24,
  className = "",
}: {
  name: AnimatedIconName;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name];
  // Animar ao pairar sobre o ícone vem de cada componente; ao focar,
  // a interação visual de foco no elemento acionável continua disponível.
  return <Icon size={size} className={`animated-icon lucide-icon ${className}`} aria-hidden="true" />;
}
