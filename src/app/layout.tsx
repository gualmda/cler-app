import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";

import "./globals.css";
import "aos/dist/aos.css";

import { AppProvider } from "@/contexts/AppContext";
import { RouteScrollTop } from "@/components/ui/RouteScrollTop";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const socialTitle = "CLER — Cuidar nunca foi tão simples";
const socialDescription =
  "Cler é um aplicativo que organiza, lembra e acompanha o uso de medicamentos — para você cuidar de quem ama com mais tranquilidade e confiança";
const socialImage = "/assets/cler-social.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://cler.app"),
  title: "CLER | Medicação e informações de saúde organizadas",
  description:
    "Organize medicações e mantenha informações importantes de saúde acessíveis em um só lugar com o CLER.",
  openGraph: {
    type: "website",
    title: socialTitle,
    description: socialDescription,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: socialTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialImage],
  },
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
      <body className={`${inter.variable} ${poppins.variable}`}>
        <AppProvider>
          <RouteScrollTop />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
