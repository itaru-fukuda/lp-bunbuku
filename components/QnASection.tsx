"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { MessageCircleQuestion, Sparkles } from "lucide-react";
import YouTubeCard from "./YouTubeCard";

export default function QnASection() {
    const { qna } = content;
    if (!qna) return null;

    return (
        <section id="qna" className="relative z-20 overflow-hidden bg-[rgba(255,253,247,0.90)] py-16 md:py-20">
            {/* Background huge text */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center">
                <div className="text-[20vw] font-black text-primary/[0.015] uppercase tracking-widest whitespace-nowrap font-[family-name:var(--font-poppins)]">
                    SELF INTRODUCTION
                </div>
            </div>

            {/* Glowing background light representing the fire under the tea kettle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-accent/8 rounded-full blur-[110px] pointer-events-none z-0" />

            {/* Small floating steam icons around the video section */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
                <motion.div 
                    animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 left-10 md:left-24 text-3xl md:text-4xl opacity-40"
                >
                    ♨️
                </motion.div>
                <motion.div 
                    animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-1/3 right-10 md:right-24 text-3xl md:text-4xl opacity-30"
                >
                    ♨️
                </motion.div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative z-20">
                {/* Header Section with vertical sub-phrase */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <div className="inline-flex items-center gap-2 text-primary font-black text-xs md:text-sm tracking-[0.2.5em] uppercase mb-4">
                            <MessageCircleQuestion size={16} />
                            <span>{qna.title}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-mochiy)] text-dark leading-tight flex items-center justify-center gap-2">
                            <span>{qna.subtitle}</span>
                            <Sparkles size={22} className="text-accent animate-pulse" />
                        </h2>
                    </motion.div>
                </div>

                {/* Self Introduction Video Container with skewed paper layers */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, rotate: -1 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.1 }}
                    className="max-w-4xl mx-auto relative p-2 md:p-5"
                >
                    {/* Double skewed decorative panels behind the video */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 to-primary/10 rounded-[2.5rem] rotate-2 -z-10 pointer-events-none scale-[0.98] shadow-md border border-accent/20" />
                    <div className="absolute inset-0 bg-white rounded-[2.5rem] -rotate-1 -z-20 border border-dark/10 pointer-events-none shadow-sm" />

                    {/* Small brush mark or tea pot illustration text badge */}
                    <div className="absolute -top-4 left-6 bg-dark text-accent text-[9px] font-black tracking-widest px-4 py-2 rounded-full uppercase shadow-md pointer-events-none select-none z-30">
                        🐾 INTRODUCTION
                    </div>

                    <div className="relative z-10">
                        <YouTubeCard
                            videoId={qna.videoId}
                            description={qna.description}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
