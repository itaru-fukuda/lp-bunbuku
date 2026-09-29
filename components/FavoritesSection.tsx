import Link from "next/link";
import { ArrowUpRight, Music2, Smile, Gamepad2, MessagesSquare, Heart } from "lucide-react";
import content from "@/data/content.json";
import styles from "./Profile.module.css";

const related: Record<string, { href: string; label: string; icon: typeof Heart }> = {
    voice: { href: "/songs", label: "歌ってみた", icon: Music2 },
    cute: { href: "/gallery", label: "表情ギャラリー", icon: Smile },
    gameSkill: { href: "/videos#playlists", label: "プレイリスト", icon: Gamepad2 },
    talk: { href: "/videos#videos", label: "配信アーカイブ", icon: MessagesSquare },
    distance: { href: "/videos#videos", label: "配信アーカイブ", icon: Heart },
};

export default function FavoritesSection() {
    const { favorites } = content;
    return <section id="favorites" aria-labelledby="favorites-title" className={styles.section}>
        <div className={styles.container}>
            <h2 id="favorites-title" className={styles.sectionTitle}>{favorites.heading}</h2>
            <p className={styles.note}>サイト運営者の視点による紹介です。</p>
            <ul className={styles.points}>
                {favorites.points.map((point) => {
                    const item = related[point.key];
                    const Icon = item.icon;
                    return <li key={point.key} className={styles.point}>
                        <h3><Icon size={22} aria-hidden="true" />{point.label}</h3>
                        <p>{point.description}</p>
                        <Link href={item.href}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>
                    </li>;
                })}
            </ul>
        </div>
    </section>;
}
