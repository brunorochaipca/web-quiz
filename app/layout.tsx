import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Teste modelo · Programação em Java",
  description:
    "Pratica o teste modelo de Algoritmia e Programação: 31 questões de escolha múltipla, 200 pontos, com correção e resolução.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
