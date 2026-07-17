"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Image from "next/image";

interface AboutProps {
    id: string;
    aboutArisa: {
        title: string;
        image?: string;
        description: string;
        tags?: string[];
    };
    aboutSite: {
        title: string;
        description: string;
    };
}

export default function About({ id, aboutArisa, aboutSite }: AboutProps) {
    // Mounted check to prevent Hydration mismatch with scroll transforms
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const mountTimer = window.setTimeout(() => setIsMounted(true), 0);
        return () => window.clearTimeout(mountTimer);
    }, []);

    // Scroll parallax logic
    const { scrollY } = useScroll();
    
    // Parallax movement for background elements & decorative shapes
    const xMarquee = useTransform(scrollY, [100, 1800], [60, -60]);
    const marqueeStyle = isMounted ? { x: xMarquee } : {};

    return (
        <section 
            id={id} 
            className="relative overflow-hidden bg-[rgba(255,249,252,0.90)] py-16 md:overflow-x-hidden md:overflow-y-visible md:py-20"
        >
            {/* Infinite scrolling bg text / Parallax big text */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center">
                <motion.div
                    style={marqueeStyle}
                    className="text-[12vw] font-black text-primary/[0.015] uppercase tracking-widest whitespace-nowrap font-[family-name:var(--font-poppins)]"
                >
                    ABOUT VTUBER • WELCOME • HAPPY BUNBUKU • ABOUT SITE •
                </motion.div>
            </div>

            {/* Background Glow Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute w-96 h-96 rounded-full blur-[120px] top-10 left-[-10%] bg-primary/5" />
                <div className="absolute w-96 h-96 rounded-full blur-[120px] bottom-10 right-[-10%] bg-accent/5" />
            </div>

            {/* Subtle traditional Japanese Kanoko background pattern overlay */}
            <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#24130d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />

            <div className="container mx-auto px-4 max-w-4xl relative z-20 flex flex-col gap-10 md:gap-14">
                
                {/* 1. About This Site (Upper Section) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="glass-panel relative overflow-hidden rounded-[2rem] border border-pink-100/80 p-6 shadow-[0_12px_32px_rgba(255,110,180,0.08)] sm:p-8"
                >
                    <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 text-[7rem] font-black leading-none text-primary/[0.035]">
                        ✦
                    </div>
                    <div aria-hidden="true" className="pointer-events-none absolute bottom-4 right-6 rotate-12 text-xl text-accent/15">
                        🐾
                    </div>

                    <div className="relative">
                        <div className="flex items-center gap-3">
                            <span aria-hidden="true" className="h-9 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
                            <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-black tracking-tight text-dark sm:text-3xl">
                                {aboutSite.title}
                            </h2>
                        </div>

                        <p className="mt-5 max-w-3xl whitespace-pre-wrap text-xs font-bold leading-loose tracking-wide text-text-sub sm:text-sm">
                            {aboutSite.description}
                        </p>

                        <nav aria-label="サイト内の主なコンテンツ" className="mt-6 flex flex-wrap gap-2.5">
                            {[
                                { label: "プロフィール", href: "#profile" },
                                { label: "表情ギャラリー", href: "#expression-gallery" },
                                { label: "推しポイント", href: "#favorites" },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/15 bg-white/85 px-4 py-2 text-xs font-bold text-[#624658] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-pink-50 hover:text-primary hover:shadow-[0_8px_18px_rgba(255,110,180,0.10)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none sm:text-sm"
                                >
                                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary/60 transition-transform duration-300 group-hover:scale-125" />
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </motion.div>

                {/* 2. About Arisa (Lower Section) */}
                
                {/* --- PC Layout (lg:block hidden) --- */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-12 gap-8 items-center">
                        {/* Left Side Image */}
                        <div className="col-span-4 flex justify-center relative">
                            <div className="absolute -inset-3 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full rotate-[4deg] -z-10 scale-95 pointer-events-none" />
                            <div className="absolute -inset-3 bg-white/80 backdrop-blur-sm rounded-full -rotate-[3deg] -z-20 scale-95 border border-primary/5 pointer-events-none" />
                            
                            <motion.div 
                                whileHover={{ scale: 1.03, rotate: 1, y: -3 }}
                                transition={{ type: "spring", stiffness: 260, damping: 15 }}
                                className="relative p-2 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-[0_15px_35px_rgba(36,19,13,0.08)] rotate-[-1.5deg] z-10 cursor-pointer pointer-events-auto"
                            >
                                <div className="relative w-52 h-52 rounded-full overflow-hidden border-[5px] border-white bg-white">
                                    {aboutArisa.image && (
                                        <Image
                                            src={aboutArisa.image}
                                            alt={aboutArisa.title}
                                            fill
                                            sizes="208px"
                                            className="object-cover"
                                            draggable={false}
                                            priority
                                        />
                                    )}
                                </div>
                                <motion.div 
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-2 -right-2 bg-accent text-dark w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md border-2 border-white select-none"
                                >
                                    🍂
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Right Side Text Grid */}
                        <div className="col-span-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/80 p-6 shadow-sm"
                            >
                                <div aria-hidden="true" className="pointer-events-none absolute -right-3 -top-5 font-[family-name:var(--font-poppins)] text-7xl font-black tracking-tight text-primary/[0.025]">
                                    ARISA
                                </div>

                                <div className="relative">
                                    <div className="mb-5 flex items-center gap-3">
                                        <span aria-hidden="true" className="h-9 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
                                        <h2 className="flex items-center gap-2 font-[family-name:var(--font-poppins)] text-2xl font-black tracking-tight text-dark">
                                            {aboutArisa.title}
                                            <Sparkles className="text-accent" size={16} aria-hidden="true" />
                                        </h2>
                                    </div>

                                    <p className="text-xs sm:text-sm text-text-sub leading-loose whitespace-pre-wrap mb-4 font-bold tracking-wide">
                                        {aboutArisa.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {aboutArisa.tags && aboutArisa.tags.map((tag: string, index: number) => (
                                            <motion.span 
                                                key={index} 
                                                whileHover={{ scale: 1.05, y: -1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="px-3.5 py-1.5 bg-white text-primary border border-primary/10 rounded-full text-[10px] font-black shadow-sm flex items-center gap-1.5 cursor-pointer hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300"
                                            >
                                                <Heart size={8} className="fill-current animate-pulse" />
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* --- Smartphone Layout (lg:hidden block) --- */}
                <div className="block lg:hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/80 p-5 shadow-sm"
                    >
                        <div aria-hidden="true" className="pointer-events-none absolute -right-3 -top-4 font-[family-name:var(--font-poppins)] text-6xl font-black tracking-tight text-primary/[0.025]">
                            ARISA
                        </div>

                        <div className="relative mb-5 flex items-center gap-3">
                            <span aria-hidden="true" className="h-9 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
                            <h2 className="flex items-center gap-2 font-[family-name:var(--font-poppins)] text-2xl font-black tracking-tight text-dark sm:text-3xl">
                                {aboutArisa.title}
                                <Sparkles className="text-accent" size={16} aria-hidden="true" />
                            </h2>
                        </div>

                        <div className="relative flex justify-center border-b border-primary/10 pb-5">
                            <div className="relative shrink-0">
                                <div className="absolute -inset-2.5 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full rotate-[3deg] -z-10 scale-95" />
                                <div className="relative p-2 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-md rotate-[-1.5deg]">
                                    <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-white bg-white">
                                        {aboutArisa.image && (
                                            <Image
                                                src={aboutArisa.image}
                                                alt={aboutArisa.title}
                                                fill
                                                sizes="208px"
                                                className="object-cover"
                                                draggable={false}
                                                priority
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -left-2 bg-accent text-dark w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shadow-md border border-white select-none">
                                    🍂
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 w-full">
                            <p className="text-xs leading-loose whitespace-pre-wrap mb-4 font-bold tracking-wide text-text-sub">
                                {aboutArisa.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {aboutArisa.tags && aboutArisa.tags.map((tag: string, index: number) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1.5 bg-white text-primary border border-primary/10 rounded-full text-[10px] font-black shadow-sm flex items-center gap-1"
                                    >
                                        <Heart size={8} className="fill-current animate-pulse" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
