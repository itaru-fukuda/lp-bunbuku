"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import content from "@/data/content.json";
import HeroSequence from "./HeroSequence";

export default function Hero() {
    const { hero } = content;
    const sequence = hero.greetingSequence || [];

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-pink-50 z-20">
            {/* Elegant Site Logo (H1 for SEO) */}
            <div className="absolute top-6 left-6 md:top-8 md:left-10 z-40 pointer-events-none select-none">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col gap-1 drop-shadow-sm"
                >
                    <span className="text-primary/70 font-black text-sm md:text-base tracking-[0.3em] relative mix-blend-multiply">
                        分福ありさ ファンサイト
                        {/* Decorative line */}
                        <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-primary/40 rounded-full"></span>
                    </span>
                    <span className="text-[0.65rem] md:text-xs text-primary/80 font-medium tracking-wider uppercase mt-1">
                        Bunbuku Arisa's Fan Site
                    </span>
                </motion.h1>
            </div>

            {/* Dynamic Sequence Background & Text */}
            <HeroSequence items={sequence} />

            {/* CTA Button (Fixed Overlay) */}
            <div className="absolute bottom-28 md:bottom-24 left-0 right-0 z-30 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="pointer-events-auto">
                    <Link
                        href={hero.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/50"
                    >
                        {hero.ctaText}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center opacity-90 pointer-events-none animate-bounce">
                <div className="flex flex-row items-center justify-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-5 py-2 border border-white/20 shadow-lg">
                    <span className="text-white text-xs font-bold tracking-[0.2em] pt-[2px]">SCROLL</span>
                    <ChevronDown className="text-white" size={18} />
                </div>
            </div>
        </section>
    );
}

