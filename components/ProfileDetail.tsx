"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import content from "@/data/content.json";
import Modal from "./Modal";
import styles from "./Profile.module.css";

export default function ProfileDetail() {
    const { profileDetail } = content;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const { images, stats } = profileDetail;
    const image = images[currentIndex];
    const move = (delta: number) => setCurrentIndex((index) => (index + delta + images.length) % images.length);
    return <section id="profile" aria-labelledby="profile-name" className={styles.profile}>
        <div className={styles.layout}>
            <div className={styles.identity}>
                <h2 id="profile-name">{profileDetail.name}</h2>
                <p>{profileDetail.enName}</p>
            </div>
            <div className={styles.visual}>
                <button type="button" className={styles.portrait} onClick={() => setExpanded(true)} aria-label={`${image.label}の立ち絵を拡大`}>
                    <Image src={image.src} alt={`${profileDetail.name}：${image.label}`} fill sizes="(max-width: 767px) 90vw, 460px" className={styles.character} />
                    <span className={styles.zoom}><ZoomIn size={17} aria-hidden="true" />拡大する</span>
                </button>
                <p className={styles.outfitLabel} aria-live="polite">{image.label}</p>
                <div role="group" aria-label="衣装を選択" className={styles.outfits}>
                    {images.map((outfit, index) => <button key={outfit.src} type="button" aria-pressed={currentIndex === index} onClick={() => setCurrentIndex(index)} className={styles.outfit}>
                        <Image src={outfit.icon || outfit.src} alt="" width={48} height={48} /><span>{outfit.label}</span>
                    </button>)}
                </div>
            </div>
            <dl className={styles.stats}>
                {stats.map((item) => <div key={item.label} className={['好きな食べ物', '嫌いな食べ物', '趣味', 'ハッシュタグ'].includes(item.label) ? styles.wideStat : styles.stat}>
                    <dt>{item.label}</dt>
                    <dd>{item.label === 'ハッシュタグ' ? <ul className={styles.tags}>
                        {item.value.split('\n').map((line) => {
                            const [label, tag] = line.split('：');
                            return <li key={tag}><span>{label}</span><a href={`https://x.com/search?q=${encodeURIComponent(tag)}&src=typed_query`} target="_blank" rel="noopener noreferrer">{tag}<ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">（Xの検索を新しいタブで開きます）</span></a></li>;
                        })}
                    </ul> : item.value}</dd>
                </div>)}
            </dl>
        </div>
        {expanded && <Modal label={`${profileDetail.name}の衣装拡大`} onClose={() => setExpanded(false)} className={styles.dialog} onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
            if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        }}>
            <div className={styles.modalHeader}><p aria-live="polite">{image.label}<span>{currentIndex + 1} / {images.length}</span></p><button type="button" onClick={() => setExpanded(false)} aria-label="拡大表示を閉じる"><X size={24} aria-hidden="true" /></button></div>
            <div className={styles.modalImage}><Image src={image.src} alt={`${profileDetail.name}：${image.label}`} fill sizes="(max-width: 767px) 90vw, 720px" className={styles.character} /></div>
            <div className={styles.modalControls}><button type="button" onClick={() => move(-1)}><ChevronLeft size={20} aria-hidden="true" />前の衣装</button><button type="button" onClick={() => move(1)}>次の衣装<ChevronRight size={20} aria-hidden="true" /></button></div>
        </Modal>}
    </section>;
}
