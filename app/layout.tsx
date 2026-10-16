import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b1120",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AMINE AIT YAHYA | Vente & Installation Caméras de Surveillance, Réseaux Wi-Fi & Réparation à Domicile",
  description: "Expert en installation de systèmes de vidéosurveillance CCTV & Caméras IP, extension et partage Wi-Fi, câblage réseau, et dépannage électronique à domicile. Intervention rapide à Ain Aouda, Rabat, Témara, Salé.",
  keywords: [
    "caméras de surveillance Rabat",
    "installation CCTV Témara",
    "installation caméra Salé",
    "caméra surveillance Ain Aouda",
    "Amine Ait Yahya",
    "1Gb Réseaux",
    "partage wifi maison",
    "réparation électronique à domicile",
    "dahua camera maroc",
    "pack camera surveillance 5mp",
    "cablage reseau informatique maroc"
  ],
  authors: [{ name: "Amine Ait Yahya - 1Gb Réseaux" }],
  openGraph: {
    title: "AMINE AIT YAHYA | Sécurité & Réseaux à Domicile",
    description: "Packs 4 & 8 Caméras de Surveillance Full HD / 5MP Audio avec installation propre à domicile. Ain Aouda, Rabat, Témara, Salé.",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
