import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NavWrapper } from "@/components/NavWrapper";
import { FooterWrapper } from "@/components/FooterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jared | Trouvez votre conseiller financier",
  description:
    "Le réseau de confiance pour trouver votre conseiller financier. Des professionnels vérifiés, proches de chez vous.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <NavWrapper />
        <main className="min-h-screen">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
