import VideoGrid, { type VideoItem } from "./VideoGrid";
import PageLink from "./PageLink";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";


interface VideoSectionProps {
    moreHref?: string;
    id?: string;
    title: string;
    subtitle: string;
    items: VideoItem[];
    color?: "primary" | "accent" | "tertiary";
    bgColor?: string;
}

export default function VideoSection({ moreHref, id, title, subtitle, items, color = "primary", bgColor = "bg-white" }: VideoSectionProps) {
    return (
        <section id={id} className={`relative z-20 overflow-hidden py-16 md:py-20 ${bgColor}`}>
            {/* Background huge typography underlay for depth */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center">
                <div className="text-[18vw] font-black text-primary/[0.012] uppercase tracking-widest whitespace-nowrap font-[family-name:var(--font-poppins)]">
                    ARCHIVE VIDEO • LATEST PLAY •
                </div>
            </div>

            {/* Subtle traditional Japanese Kanoko grid texture overlay */}
            <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#24130d_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-20 max-w-6xl">
                {/* Heading wrapper with stamp styled layout */}
                <div className="mb-16 relative">
                    <SectionTitle title={title} subtitle={subtitle} color={color} />
                    
                    {/* Small editorial stamp styled indicator */}
                    <div className="absolute top-0 right-0 writing-vertical font-serif text-[9px] text-accent tracking-[0.25em] font-black uppercase hidden md:block">
                        Bunbuku Streaming Archive
                    </div>
                </div>

                {items.length ? <VideoGrid items={items} /> : <p className="text-center text-sm leading-8 text-text-sub">現在、動画情報を取得できません。<br /><a href={content.links.youtube} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">YouTubeチャンネルで見る</a></p>}
                {moreHref && <div className="mt-10 text-center"><PageLink href={moreHref}>すべての動画を見る</PageLink></div>}
            </div>
        </section>
    );
}
