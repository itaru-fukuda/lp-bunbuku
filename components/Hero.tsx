"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import content from "@/data/content.json";
import HeroSequence, { HERO_SEQUENCE_INTERVAL, HERO_SEQUENCE_TEXT_FADE_DURATION } from "./HeroSequence";

export default function Hero() {
    const { hero } = content;
    const sequence = hero.greetingSequence || [];

    const [isMounted, setIsMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [showHeroCopy, setShowHeroCopy] = useState(false);

    useEffect(() => {
        const mountTimer = window.setTimeout(() => setIsMounted(true), 0);
        const copyDelay = sequence.length > 0
            ? sequence.length * HERO_SEQUENCE_INTERVAL + HERO_SEQUENCE_TEXT_FADE_DURATION
            : 0;
        const copyTimer = window.setTimeout(() => setShowHeroCopy(true), copyDelay);
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.clearTimeout(mountTimer);
            window.clearTimeout(copyTimer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sequence.length]);

    // SSR view - simple background structure to prevent layout shifts
    if (!isMounted) {
        return (
            <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-white z-20" />
        );
    }

    // Parallax calculations using plain numeric state to prevent Framer Motion Hydration failures
    const yBg = (Math.min(scrollY, 800) * 250) / 800; 
    const scaleBg = 1 + (Math.min(scrollY, 800) * 0.05) / 800; 
    const yContent = (Math.min(scrollY, 800) * -80) / 800; 
    const yCTA = (Math.min(scrollY, 800) * 80) / 800; 
    const xText = (Math.min(scrollY, 1000) * -200) / 1000; 
    const opacityScroll = Math.max(0, 0.9 - (Math.min(scrollY, 200) * 0.9) / 200); 
    const renderLines = (text: string) =>
        text.split("\n").map((line, index) => (
            <span key={index} className="block">
                {line}
            </span>
        ));

    return (
        <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-white z-20">
            
            {/* Elegant Site Logo (H1 for SEO) - Parallax via standard div wrapper */}
            <div 
                style={{ transform: `translateY(${yContent}px)` }}
                className="absolute top-6 left-6 md:top-8 md:left-10 z-40 pointer-events-none select-none transition-transform duration-75 ease-out"
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
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

            {/* Massive Background Decorative Typography - Standard div for conflict-free translation */}
            <div 
                style={{ transform: `translateX(${xText}px)` }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden transition-transform duration-75 ease-out"
            >
                <div className="text-[22vw] font-black text-primary/[0.03] tracking-tighter uppercase whitespace-nowrap select-none font-[family-name:var(--font-poppins)]">
                    BUNBUKU ARISA
                </div>
            </div>

            {/* Elegant Vertical Japanese Editorial Text (Noto Serif JP) - Hidden on Mobile */}
            <div className="absolute right-6 md:right-20 top-[22%] bottom-[22%] z-30 pointer-events-none select-none hidden md:flex items-center">
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={showHeroCopy ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
                    className="writing-vertical font-serif text-dark h-full flex flex-col justify-between items-start tracking-[0.2em]"
                >
                    <span className="text-xl md:text-3xl font-black leading-none drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
                        {hero.catchphrase}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold opacity-60 mt-4 leading-loose max-h-[40%] overflow-hidden">
                        {renderLines(hero.subtext)}
                    </span>
                </motion.div>
            </div>

            {/* Mobile Horizontal Catchphrase - Visible only on Mobile */}
            <div className="absolute top-[18%] left-0 right-0 z-30 pointer-events-none select-none flex md:hidden flex-col items-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                    animate={showHeroCopy
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: -20, filter: "blur(5px)" }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    className="font-serif text-dark tracking-[0.15em] flex flex-col items-center gap-1.5"
                >
                    <span className="text-xl sm:text-2xl font-black leading-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)]">
                        {hero.catchphrase}
                    </span>
                    <div className="mt-3 flex items-center justify-center gap-3">
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-transparent to-primary/45" />
                        <div className="font-[family-name:var(--font-poppins)] text-[10px] font-bold leading-[1.9] tracking-[0.18em] text-[#4B3045]/80 drop-shadow-[0_1px_8px_rgba(255,255,255,1)] sm:text-[11px]">
                            {renderLines(hero.subtext)}
                        </div>
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-l from-transparent to-primary/45" />
                    </div>
                </motion.div>
            </div>

            {/* Dynamic Sequence Background & Text - Standard div for conflict-free scale & parallax */}
            <div 
                style={{ transform: `translateY(${yBg}px) scale(${scaleBg})` }}
                className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-transform duration-75 ease-out"
            >
                <HeroSequence items={sequence} />
            </div>

            {/* CTA Button (Fixed Overlay with Parallax) - Standard div for transform */}
            <div 
                style={{ transform: `translateY(${yCTA}px)` }}
                className="absolute bottom-28 md:bottom-24 left-0 right-0 z-30 flex flex-col items-center justify-center gap-3 pointer-events-none transition-transform duration-75 ease-out"
            >
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, type: "spring", bounce: 0.3 }}
                    className="pointer-events-auto"
                >
                    <Link
                        href={hero.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group btn-shine-container inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-rose-400 text-white rounded-full text-xl font-bold shadow-[0_8px_30px_rgba(255,110,180,0.3)] border-2 border-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(255,110,180,0.34)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
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
            </div>

            {/* Scroll Indicator (Fades out quickly on scroll) - Standard div for opacity */}
            <div 
                style={{ opacity: opacityScroll }}
                className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-none transition-opacity duration-75 ease-out"
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
            </div>
        </section>
    );
}
