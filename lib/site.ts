import type { Metadata } from "next";

export const SITE_URL = "https://bunbuku-arisa.rasu.jp";
export const SITE_NAME = "分福ありさ 非公式ファンサイト";
export const sitePages = [
  { href: "/", label: "TOP", title: SITE_NAME, subtitle: "あなたに福のお裾分け！", description: "分福ありささんの非公式ファンサイト。プロフィール、動画・配信、表情ギャラリーから魅力をお届けします。", priority: 1, changeFrequency: "daily" },
  { href: "/profile", label: "PROFILE", title: "プロフィール", subtitle: "もっと知る、分福ありさ。", description: "分福ありささんのプロフィールと衣装、ファン目線の推しポイント、一問一答自己紹介をご紹介。", priority: 0.8, changeFrequency: "monthly" },
  { href: "/videos", label: "VIDEOS", title: "動画・配信", subtitle: "今日も一緒に過ごそう", description: "最新アーカイブとチャンネルのプレイリスト一覧", priority: 0.9, changeFrequency: "daily" },
  { href: "/songs", label: "SONGS", title: "おすすめ歌ってみた", subtitle: "おすすめ歌ってみた", description: "分福ありささんのおすすめ歌ってみた動画を紹介。ソロ楽曲やコラボ楽曲を掲載しています。", priority: 0.8, changeFrequency: "monthly" },
  { href: "/gallery", label: "GALLERY", title: "ギャラリー", subtitle: "くるくる変わる表情をお裾分け！", description: "色々な表情を集めたビジュアルギャラリー", priority: 0.8, changeFrequency: "monthly" },
] as const;

export type SitePath = (typeof sitePages)[number]["href"];
export function pageMetadata(href: SitePath): Metadata {
  const page = sitePages.find((item) => item.href === href)!;
  const title = href === "/" ? SITE_NAME : `${page.title} | ${SITE_NAME}`;
  return {
    title: { absolute: title }, description: page.description,
    alternates: { canonical: href },
    openGraph: { title, description: page.description, url: href, siteName: SITE_NAME, locale: "ja_JP", type: "website", images: ["/images/hero/linkage_pic.jpg"] },
    twitter: { card: "summary_large_image", title, description: page.description, images: ["/images/hero/linkage_pic.jpg"] },
  };
}
