"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import content from "@/data/content.json";
import styles from "./Profile.module.css";

export default function QnASection() {
    const [playing, setPlaying] = useState(false);
    const { qna } = content;
    return <section id="qna" aria-labelledby="qna-title" className={styles.section}>
        <div className={styles.container}>
            <h2 id="qna-title" className={styles.sectionTitle}>一問一答自己紹介</h2>
            <div className={styles.video}>
                {playing ? <iframe src={`https://www.youtube.com/embed/${qna.videoId}?autoplay=1`} title="分福ありさの一問一答自己紹介" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    : <button type="button" onClick={() => setPlaying(true)} aria-label="一問一答自己紹介を再生">
                        <Image src={`https://i.ytimg.com/vi/${qna.videoId}/hqdefault.jpg`} alt="" fill sizes="(max-width: 767px) 90vw, 800px" className={styles.thumbnail} />
                        <span className={styles.play}><Play size={24} fill="currentColor" aria-hidden="true" /></span>
                    </button>}
            </div>
        </div>
    </section>;
}
