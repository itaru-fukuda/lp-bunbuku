import type { Metadata } from "next";
import { Noto_Sans_JP, Poppins } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "分福ありさ 非公式ファンサイト",
  description: "Vtuber 分福ありさの非公式ファンサイトです。あなたに福のお裾分け！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
