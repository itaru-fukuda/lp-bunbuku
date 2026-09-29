import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";
import SectionReveal from "./SectionReveal";
import styles from "./SiteExplore.module.css";

export default function SiteExplore() {
    const { explore } = content;
    return <section id="explore" aria-label="ありさちゃんをもっと楽しむ" className="relative z-20 bg-[#FFF9FC]/95 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
            <SectionTitle title={explore.title} subtitle={explore.subtitle} />
            <nav aria-label="PROFILE・VIDEOS・GALLERY" className="grid grid-cols-1 gap-5 md:gap-6">
                {explore.items.map((item, index) => (
                    <SectionReveal key={item.href}>
                        <Link href={item.href} className={styles.card} data-align={item.align} data-tone={item.href.slice(1)}>
                            <Image src={item.image} alt="" fill sizes="(max-width: 1024px) 100vw, 1024px" className={styles.image} style={{ objectPosition: item.position }} />
                            {item.backgroundBlur !== "none" && (
                                <div aria-hidden="true" data-background-blur={item.backgroundBlur} className={styles.blur} />
                            )}
                            <div aria-hidden="true" className={styles.shade} />
                            <div className={styles.copy}>
                                <div aria-hidden="true" className={styles.index}>
                                    <span>0{index + 1}</span><span className={styles.rule} />
                                </div>
                                <h3 className={styles.title}>{item.label}</h3>
                                <p className={styles.lead}>{item.title}</p>
                                <p className={styles.description}>{item.description}</p>
                                <span aria-hidden="true" className={styles.arrow}><ArrowUpRight size={22} strokeWidth={1.5} /></span>
                            </div>
                        </Link>
                    </SectionReveal>
                ))}
            </nav>
        </div>
    </section>;
}
