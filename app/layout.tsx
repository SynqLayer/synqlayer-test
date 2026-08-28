import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsConsent } from "../components/analytics-consent";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SynqLayer AI Platform - Dutch Business AI Automation",
  description: "15 AI Skills Mastered. €5M+ Business Value Demonstrated. Production Ready for Dutch MKB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <AnalyticsConsent />
        </Providers>
      </body>
    </html>
  );
}