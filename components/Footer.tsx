import { ArrowUpRight } from "lucide-react";
import content from "@/data/content.json";
import Links from "./Links";
import styles from "./Footer.module.css";

export default function Footer() {
    const { footer } = content;
    const year = new Date().getFullYear();
    return <footer className={styles.footer}>
        <div className={styles.inner}>
            <Links />
            <div className={styles.information}>
                <div className={styles.brand}>
                    <p className={styles.brandName}>Bunbuku Arisa <span>Fan Site</span></p>
                    <p className={styles.notice}>{footer.notice}</p>
                </div>
                <div className={styles.credits}>
                    <h2>{footer.staff.title}</h2>
                    <p>{footer.staff.roles}</p>
                    <a href={footer.staff.url} target="_blank" rel="noopener noreferrer" className={styles.staffLink}>{footer.staff.name}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only">（新しいタブで開きます）</span></a>
                    {footer.staff.specialThanks && <p className={styles.thanks}><span>{footer.staff.specialThanks.title}</span>{footer.staff.specialThanks.name}</p>}
                </div>
            </div>
            <div className={styles.bottom}>
                <p>{footer.rights}</p>
                <p className={styles.copyright}>&copy; {year} Bunbuku Arisa Fan Site</p>
            </div>
        </div>
    </footer>;
}
