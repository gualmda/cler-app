import type { Metadata, Viewport } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import { AppProvider } from "@/contexts/AppContext";
import { RouteScrollTop } from "@/components/ui/RouteScrollTop";

export const metadata: Metadata = {
  title: "CLER | Medicação e informações de saúde organizadas",
  description: "Organize medicações e mantenha informações importantes de saúde acessíveis em um só lugar com o CLER.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#2a1536" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return <html lang="pt-BR" suppressHydrationWarning><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
  </head><body><AppProvider><RouteScrollTop />{children}</AppProvider></body></html>;
}
