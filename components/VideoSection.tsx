"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import YouTubeCard from "./YouTubeCard";

interface VideoItem {
    videoId: string;
    title: string;
    description: string;
    note?: string;
}

interface VideoSectionProps {
    id?: string;
    title: string;
    subtitle: string;
    items: VideoItem[];
    color?: "primary" | "accent" | "tertiary";
    bgColor?: string;
}

export default function VideoSection({ id, title, subtitle, items, color = "primary", bgColor = "bg-white" }: VideoSectionProps) {
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

                {/* Asymmetric offsets: 2nd column pushes down slightly to create a masonry magazine look */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:pb-12">
                    {items.map((item, index) => {
                        // Offset the second card in MD and LG viewports to break symmetry
                        const offsetClass = index % 3 === 1 ? "md:translate-y-6 lg:translate-y-10" : "";
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.08, duration: 0.6, type: "spring", stiffness: 120 }}
                                className={offsetClass}
                            >
                                <YouTubeCard {...item} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
