import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Shell from "@/components/Shell";
import { pl } from "@/content/pl";
import "./globals.css";

const serif = Instrument_Serif({ subsets: ["latin", "latin-ext"], weight: "400", variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: pl.meta.title, template: `%s — ${pl.name}` },
  description: pl.meta.description,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0d0d0e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={pl.lang} className={`${serif.variable} ${mono.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
