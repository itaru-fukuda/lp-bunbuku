import { Youtube, ShoppingBag } from "lucide-react";
import content from "@/data/content.json";
import styles from "./Footer.module.css";

function XIcon() {
    return <svg width="22" height="22" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" /></svg>;
}
function TikTokIcon() {
    return <svg width="20" height="22" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg>;
}

export default function Links() {
    const { links } = content;
    const items = [
        { name: "YouTube", href: links.youtube, icon: <Youtube size={25} aria-hidden="true" /> },
        { name: "X", href: links.twitter, icon: <XIcon /> },
        { name: "BOOTH", href: links.booth, icon: <ShoppingBag size={23} aria-hidden="true" /> },
        { name: "TikTok", href: links.tiktok, icon: <TikTokIcon /> },
    ];
    return <nav id="links" aria-labelledby="footer-links-title" className={styles.links}>
        <h2 id="footer-links-title" className={styles.linksHeading}>Links</h2>
        <ul className={styles.linkGrid}>
            {items.filter((item) => item.href).map((item) => <li key={item.name}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <span className={styles.socialIcon}>{item.icon}</span>
                    <span className={styles.socialName}>{item.name}</span>
                </a>
            </li>)}
        </ul>
    </nav>;
}
