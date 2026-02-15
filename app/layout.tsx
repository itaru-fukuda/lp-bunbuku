import type { Metadata } from "next";
import { Noto_Sans_JP, Poppins, Mochiy_Pop_P_One } from "next/font/google";
import "./globals.css";

import BackgroundDecoration from "@/components/BackgroundDecoration";
import ScheduleWidget from "@/components/ScheduleWidget";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
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
  metadataBase: new URL("https://bunbuku-arisa.creative-garden.com/"),
  manifest: "/manifest.json",
  title: {
    default: "分福ありさ Unofficial Fan Site | 歌とゲームで福を届けるVtuber",
    template: "%s | 分福ありさ Fan Site",
  },
  description: "Vtuber分福ありさ（Bunbuku Arisa）の非公式ファンサイト。プロフィール、配信スケジュール、歌ってみた動画、アーカイブ情報を掲載中。あなたに福のお裾分け！",
  keywords: ["分福ありさ", "Vtuber", "Bunbuku Arisa", "歌ってみた", "ゲーム実況", "個人勢Vtuber"],
  authors: [{ name: "Fan Community" }],
  openGraph: {
    title: "分福ありさ Unofficial Fan Site",
    description: "歌とゲームで福を届けるVtuber、分福ありさの非公式ファンサイトです。",
    url: "https://bunbuku-arisa.creative-garden.com/",
    siteName: "分福ありさ Unofficial Fan Site",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "分福ありさ Unofficial Fan Site",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "分福ありさ Unofficial Fan Site",
    description: "歌とゲームで福を届けるVtuber、分福ありさの非公式ファンサイトです。",
    creator: "@bunbukuarisa", // Official account
    images: ["/opengraph-image.png"],
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
      "name": "分福ありさ Unofficial Fan Site",
      "url": "https://bunbuku-arisa.creative-garden.com/",
      "description": "Vtuber分福ありさの非公式ファンサイト",
      "inLanguage": "ja",
    },
    {
      "@type": "Person",
      "name": "分福ありさ",
      "alternateName": "Bunbuku Arisa",
      "url": "https://www.youtube.com/channel/UCerNAq_y5avwJIV0arI5pCQ",
      "image": "https://bunbuku-arisa.creative-garden.com/images/profile/full_body_002.png",
      "description": "歌とゲームで福を届ける狸のVtuber",
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
        className={`${notoSansJP.variable} ${poppins.variable} ${mochiy.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BackgroundDecoration />
        <ScheduleWidget />
        {children}
      </body>
    </html>
  );
}
