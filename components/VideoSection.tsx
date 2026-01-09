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
    title: string;
    subtitle: string;
    items: VideoItem[];
    color?: "primary" | "accent" | "tertiary";
    bgColor?: string;
}

export default function VideoSection({ title, subtitle, items, color = "primary", bgColor = "bg-white" }: VideoSectionProps) {
    return (
        <section className={`py-20 ${bgColor}`}>
            <div className="container mx-auto px-4">
                <SectionTitle title={title} subtitle={subtitle} color={color} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <YouTubeCard {...item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
