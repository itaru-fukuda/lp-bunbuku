"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import content from "@/data/content.json";
import HeroSequence from "./HeroSequence";

export default function Hero() {
    const { hero } = content;
    const sequence = hero.greetingSequence || [];

    // Mounted check to prevent Hydration Mismatch with server-side rendered initial styles
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Scroll diagnostics for parallax (defined unconditionally at top-level)
    const { scrollY } = useScroll();

    // Background movement: moves slower than scroll (parallax), fades out, scales up slightly
    const yBg = useTransform(scrollY, [0, 800], [0, 250]);
    const opacityBg = useTransform(scrollY, [0, 600], [1, 0]);
    const scaleBg = useTransform(scrollY, [0, 800], [1, 1.05]);

    // Content (Logo, CTA, Scroll indicator) movement
    const yContent = useTransform(scrollY, [0, 800], [0, -80]);
    const opacityContent = useTransform(scrollY, [0, 500], [1, 0]);

    // Additional parallax transforms defined unconditionally to respect Rules of Hooks
    const yCTA = useTransform(scrollY, [0, 800], [0, 80]);
    const opacityScroll = useTransform(scrollY, [0, 200], [0.9, 0]);

    // Define style values dynamically only after mounting to avoid hydration mismatch
    const logoStyle = isMounted ? { y: yContent, opacity: opacityContent } : {};
    const bgStyle = isMounted ? { y: yBg, opacity: opacityBg, scale: scaleBg } : {};
    const ctaContainerStyle = isMounted ? { y: yCTA, opacity: opacityContent } : {};
    const scrollIndicatorStyle = isMounted ? { opacity: opacityScroll } : {};

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-pink-50 z-20">
            {/* Elegant Site Logo (H1 for SEO) */}
            <div className="absolute top-6 left-6 md:top-8 md:left-10 z-40 pointer-events-none select-none">
                <motion.h1
                    initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    style={logoStyle}
                    className="flex flex-col gap-1 drop-shadow-sm"
                >
                    <span className="text-primary/70 font-black text-sm md:text-base tracking-[0.3em] relative mix-blend-multiply">
                        分福ありさ ファンサイト
                        {/* Decorative line */}
                        <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-primary/40 rounded-full"></span>
                    </span>
                    <span className="text-[0.65rem] md:text-xs text-primary/80 font-medium tracking-wider uppercase mt-1">
                        Bunbuku Arisa&apos;s Fan Site
                    </span>
                </motion.h1>
            </div>

            {/* Dynamic Sequence Background & Text (Parallax wrapper) */}
            <motion.div 
                style={bgStyle} 
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
            >
                <HeroSequence items={sequence} />
            </motion.div>

            {/* CTA Button (Fixed Overlay with Parallax) */}
            <motion.div 
                style={ctaContainerStyle}
                className="absolute bottom-28 md:bottom-24 left-0 right-0 z-30 flex flex-col items-center justify-center gap-3 pointer-events-none"
            >
                <motion.div 
                    initial={isMounted ? { opacity: 0, y: 40 } : false}
                    animate={isMounted ? { opacity: 1, y: 0 } : false}
                    transition={{ duration: 1, delay: 0.8, type: "spring", bounce: 0.3 }}
                    className="pointer-events-auto"
                >
                    <Link
                        href={hero.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group btn-shine-container inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-rose-400 text-white rounded-full text-xl font-bold shadow-[0_8px_30px_rgba(255,110,180,0.3)] border-2 border-white/60 transition-all duration-300"
                    >
                        <motion.span 
                            className="flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {hero.ctaText}
                            <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
                        </motion.span>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator (Fades out quickly on scroll) */}
            <motion.div 
                style={scrollIndicatorStyle}
                className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-none"
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="w-[26px] h-[42px] border-2 border-white/80 rounded-full flex justify-center p-1.5 backdrop-blur-sm bg-black/30 shadow-lg">
                        <motion.div 
                            animate={{
                                y: [0, 16, 0],
                                opacity: [1, 0.3, 1]
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-1.5 h-2.5 bg-white rounded-full"
                        />
                    </div>
                    <span className="text-white text-[10px] font-bold tracking-[0.25em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">SCROLL</span>
                </div>
            </motion.div>
        </section>
    );
}
