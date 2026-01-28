import type { Metadata } from "next";
import "./globals.css";
import "../styles/animations.css";
import { Providers } from "./providers";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { METADATA } from "@/lib/constants/metadata";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: METADATA.TITLE,
  description: METADATA.DESCRIPTION,
  keywords: [...METADATA.KEYWORDS],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
