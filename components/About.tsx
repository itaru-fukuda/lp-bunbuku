import Image from "next/image";
import { Gamepad2, Brush, Music2, MessagesSquare, Leaf, Sparkles } from "lucide-react";
import styles from "./About.module.css";

interface AboutProps {
    id: string;
    aboutArisa: {
        title: string;
        visual: string;
        greeting: string;
        tags?: string[];
    };
}

const activityIcons = [Gamepad2, Brush, Music2, MessagesSquare];

export default function About({ id, aboutArisa }: AboutProps) {
    const phrases = aboutArisa.greeting.match(/[^！]+！?/g) ?? [aboutArisa.greeting];
    return <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
        <div className={styles.inner}>
            <div className={styles.visual}>
                <div aria-hidden="true" className={styles.halo} />
                <span aria-hidden="true" className={styles.verticalName}>BUNBUKU ARISA</span>
                <Image src={aboutArisa.visual} alt="たぬきモチーフのピンクの衣装で笑顔を見せる分福ありさ" fill sizes="(max-width: 767px) 90vw, 480px" className={styles.portrait} />
                <Leaf aria-hidden="true" className={styles.leaf} />
                <Sparkles aria-hidden="true" className={styles.sparkles} />
            </div>
            <div className={styles.copy}>
                <h2 id={`${id}-title`} className={styles.eyebrow}>{aboutArisa.title}</h2>
                <p className={styles.name}>分福ありさ<span>個人勢たぬきVTuber</span></p>
                <blockquote className={styles.greeting}>
                    {phrases.map((phrase, index) => <span key={index} className={index === 0 ? styles.hello : index === phrases.length - 1 ? styles.fortune : styles.phrase}>{phrase}</span>)}
                </blockquote>
                <div className={styles.activities}>
                    <p className={styles.activitiesLabel}>主な活動内容</p>
                    <ul className={styles.activityList}>
                        {aboutArisa.tags?.map((tag, index) => {
                            const Icon = activityIcons[index] ?? Sparkles;
                            return <li key={tag}><Icon size={20} strokeWidth={1.6} aria-hidden="true" /><span>{tag}</span></li>;
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </section>;
}
