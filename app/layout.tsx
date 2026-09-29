import type { Metadata } from "next";
import { Noto_Sans_JP, Poppins, Mochiy_Pop_P_One, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

import ScheduleWidget from "@/components/ScheduleWidget";
import SteamBackground from "@/components/SteamBackground";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import MotionProvider from "@/components/MotionProvider";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const mochiy = Mochiy_Pop_P_One({
  variable: "--font-mochiy",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bunbuku-arisa.rasu.jp/"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  verification: {
    google: "MUR79J14k5KGd39ygRnGJXeaSEOmyfwighc3fBQzp7A",
  },
  title: {
    default: "分福ありさ 非公式ファンサイト",
    template: "%s | 分福ありさ 非公式ファンサイト",
  },
  description: "Vtuber分福ありさ（Bunbuku Arisa）のファンサイト。プロフィール、配信スケジュール、歌ってみた動画、アーカイブ情報を掲載中。あなたに福のお裾分け！",
  keywords: ["分福ありさ", "Vtuber", "Bunbuku Arisa", "歌ってみた", "ゲーム実況", "個人勢Vtuber", "ファンサイト"],
  authors: [{ name: "Fan Community" }],
  openGraph: {
    title: "分福ありさ ファンサイト",
    description: "みんなに福を届ける完全セルフ受肉たぬきVtuber、分福ありさちゃんのファンサイトです。",
    url: "https://bunbuku-arisa.rasu.jp/",
    siteName: "分福ありさ ファンサイト",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/hero/linkage_pic.jpg",
        width: 1200,
        height: 630,
        alt: "分福ありさ ファンサイト",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "分福ありさ ファンサイト",
    description: "みんなに福を届ける完全セルフ受肉たぬ起Vtuber、分福ありさちゃんのファンサイトです。",
    creator: "@bunbukuarisa", // Official account
    images: ["/images/hero/linkage_pic.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "分福ありさ ファンサイト",
      "url": "https://bunbuku-arisa.rasu.jp/",
      "description": "Vtuber分福ありさのファンサイト",
      "inLanguage": "ja",
    },
    {
      "@type": "Person",
      "name": "分福ありさ",
      "alternateName": "Bunbuku Arisa",
      "url": "https://www.youtube.com/channel/UCerNAq_y5avwJIV0arI5pCQ",
      "image": "https://bunbuku-arisa.rasu.jp/images/profile/full_body_002.png",
      "description": "みんなに福を届ける完全セルフ受肉たぬきVtuber",
      "jobTitle": "Virtual YouTuber",
      "sameAs": [
        "https://twitter.com/bunbukuarisa",
        "https://www.youtube.com/channel/UCerNAq_y5avwJIV0arI5pCQ",
        "https://bunbukuarisa.booth.pm/"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} ${poppins.variable} ${mochiy.variable} antialiased w-full overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main-content" className="skip-link">本文へスキップ</a>
        <MotionProvider>
        <SteamBackground />
        <FloatingNav />
        <ScheduleWidget />
        {children}
        <Footer />
        <ScrollToTop />
        </MotionProvider>
      </body>
    </html>
  );
}
