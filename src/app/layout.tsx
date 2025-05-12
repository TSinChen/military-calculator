import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Military Calculator | 兵役計算機",
  description: "兵役計算機，計算你的退伍日期",
  openGraph: {
    title: "Military Calculator | 兵役計算機",
    description: "兵役計算機，計算你的退伍日期",
    url: "https://military-calculator.vercel.app",
    siteName: "Military Calculator | 兵役計算機",
    locale: "zh-TW",
    type: "website",
    images: [
      {
        type: "image/png",
        url: "https://firebasestorage.googleapis.com/v0/b/tsinchen-cdn.firebasestorage.app/o/sob.png?alt=media",
        alt: "Military Calculator | 兵役計算機",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Military Calculator | 兵役計算機",
    description: "兵役計算機，計算你的退伍日期",
    creator: "@military_calculator",
    site: "@military_calculator",
    images: [
      {
        type: "image/png",
        url: "https://firebasestorage.googleapis.com/v0/b/tsinchen-cdn.firebasestorage.app/o/sob.png?alt=media",
        alt: "Military Calculator | 兵役計算機",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <GoogleTagManager gtmId="GTM-NP2VFSF3" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-JZ3NFT6C81" />
    </html>
  );
}
