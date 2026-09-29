import Link from "next/link";
import styles from "@/components/Profile.module.css";
import ProfileDetail from "@/components/ProfileDetail";
import FavoritesSection from "@/components/FavoritesSection";
import QnASection from "@/components/QnASection";
import SectionReveal from "@/components/SectionReveal";
import PageLink from "@/components/PageLink";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/profile");
export default function ProfilePage() {
  return <main id="main-content">
    <header className={styles.header}>
      <div className={styles.container}>
        <nav aria-label="パンくず"><Link href="/">TOP</Link><span aria-hidden="true">/</span><span aria-current="page">プロフィール</span></nav>
        <h1>プロフィール</h1>
      </div>
    </header>
    <SectionReveal><ProfileDetail /></SectionReveal>
    <SectionReveal><QnASection /></SectionReveal>
    <SectionReveal><FavoritesSection /></SectionReveal>
    <div className="relative z-20 flex flex-wrap justify-center gap-4 bg-pink-50 px-4 py-12"><PageLink href="/videos">動画・配信を楽しむ</PageLink><PageLink href="/gallery">ギャラリーを見る</PageLink></div>
  </main>;
}
