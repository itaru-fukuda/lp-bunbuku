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
  title: "分福ありさ Unofficial Fan Site",
  description: "Vtuber分福ありさの非公式ファンサイトです。",
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
        <BackgroundDecoration />
        <ScheduleWidget />
        {children}
      </body>
    </html>
  );
}
