import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { BRAND_NAME, OWNER_NAME } from "@/lib/whatsapp";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const DEFAULT_TITLE = "Caméras de surveillance et réseau à Rabat, Salé, Témara | AMINE AIT YAHYA";
const DEFAULT_DESCRIPTION =
  "Packs caméras de surveillance 2MP et 5MP en matériel seul ou installés à domicile, câblage réseau, Wi-Fi et dépannage à Rabat, Salé, Témara et Ain Aouda.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${OWNER_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: BRAND_NAME,
  authors: [{ name: `${OWNER_NAME} – ${BRAND_NAME}` }],
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    locale: "fr_MA",
    siteName: BRAND_NAME,
    url: "/",
    images: [{ url: "/images/kit-cameras-enregistreur.webp", width: 640, height: 640 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
