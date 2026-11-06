import type { Metadata, Viewport } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import { AppProvider } from "@/contexts/AppContext";

export const metadata: Metadata = {
  title: "CLER | Medicação e informações de saúde organizadas",
  description:
    "Organize medicações e mantenha informações importantes de saúde acessíveis em um só lugar com o CLER.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2a1536",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="CLER — Cuidar nunca foi tão simples"
        />
        <meta
          property="og:description"
          content="Cler é um aplicativo que organiza, lembra e acompanha o uso de medicamentos — para você cuidar de quem ama com mais tranquilidade e confiança"
        />
        <meta
          property="og:image"
          content="https://framerusercontent.com/images/2uLaeXBnmQYUz5em29ob8cpNuM.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="CLER — Cuidar nunca foi tão simples"
        />
        <meta
          name="twitter:description"
          content="Cler é um aplicativo que organiza, lembra e acompanha o uso de medicamentos — para você cuidar de quem ama com mais tranquilidade e confiança"
        />
        <meta
          name="twitter:image"
          content="https://framerusercontent.com/images/2uLaeXBnmQYUz5em29ob8cpNuM.png"
        />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}