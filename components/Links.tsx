"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Youtube, ShoppingBag } from "lucide-react";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";

export default function Links() {
    const { links } = content;
    const reduceMotion = useReducedMotion();

    // Bouncing animation variants for social icons
    const iconVariants = {
        hover: {
            y: [0, -8, 2, -4, 0],
            rotate: [0, -6, 6, -3, 0],
            transition: {
                duration: 0.5,
                ease: "easeInOut" as const
            }
        }
    };

    return (
        <section id="links" className="relative z-20 overflow-hidden bg-gradient-to-b from-white/90 via-rose-50/80 to-white/90 py-16 md:py-20">
            {/* Background huge typography */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center">
                <div className="text-[18vw] font-black text-primary/[0.012] uppercase tracking-widest whitespace-nowrap font-[family-name:var(--font-poppins)]">
                    FOLLOW ME ON SOCIAL • ONLINE LINKS •
                </div>
            </div>

            {/* Subtle traditional Japanese pattern overlay */}
            <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(#24130d_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-5xl text-center relative z-20">
                <div className="mb-14">
                    <SectionTitle title="Links" subtitle="リンク" color="primary" />
                </div>

                <div className="grid grid-cols-4 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 mt-10 sm:mt-12 max-w-5xl mx-auto px-2 sm:px-4">
                    
                    {/* YouTube Link */}
                    <motion.a
                        href={links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={reduceMotion ? undefined : "hover"}
                        whileTap={{ scale: 0.96 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        aria-label="YouTube"
                        className="group relative flex aspect-square items-center justify-center rounded-full border border-white/80 bg-white/75 p-2 shadow-[0_8px_24px_rgba(36,19,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/20 hover:shadow-[0_20px_45px_rgba(220,38,38,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 motion-reduce:hover:translate-y-0 motion-reduce:transition-none sm:aspect-auto sm:h-44 sm:flex-col sm:gap-4 sm:rounded-3xl sm:p-8 sm:glass-panel"
                    >
                        {/* Glow indicator on hover */}
                        <div className="absolute -z-10 w-24 h-24 rounded-full bg-red-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        {/* Red Seal stamp effect on hover */}
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-md border border-red-500 hidden sm:flex items-center justify-center text-[9px] font-serif font-black text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                            画
                        </div>

                        <motion.div 
                            variants={iconVariants}
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-red-500/10 text-red-600 rounded-full flex items-center justify-center transition-colors group-hover:bg-red-500 group-hover:text-white"
                        >
                            <Youtube size={26} className="drop-shadow-sm" />
                        </motion.div>
                        <span className="sr-only sm:not-sr-only sm:text-base sm:font-serif sm:font-black sm:text-dark sm:tracking-wider sm:group-hover:text-red-600 sm:transition-colors">YouTube</span>
                    </motion.a>

                    {/* Twitter Link */}
                    {links.twitter && (
                        <motion.a
                            href={links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={reduceMotion ? undefined : "hover"}
                            whileTap={{ scale: 0.96 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.08 }}
                            aria-label="X"
                            className="group relative flex aspect-square items-center justify-center rounded-full border border-white/80 bg-white/75 p-2 shadow-[0_8px_24px_rgba(36,19,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-800/20 hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800 motion-reduce:hover:translate-y-0 motion-reduce:transition-none sm:aspect-auto sm:h-44 sm:flex-col sm:gap-4 sm:rounded-3xl sm:p-8 sm:glass-panel"
                        >
                            <div className="absolute -z-10 w-24 h-24 rounded-full bg-neutral-800/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-md border border-neutral-600 hidden sm:flex items-center justify-center text-[9px] font-serif font-black text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                                呟
                            </div>

                            <motion.div 
                                variants={iconVariants}
                                className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-800/10 text-neutral-800 rounded-full flex items-center justify-center transition-colors group-hover:bg-neutral-800 group-hover:text-white"
                            >
                                <svg width="22" height="22" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
                                </svg>
                            </motion.div>
                            <span className="sr-only sm:not-sr-only sm:text-base sm:font-serif sm:font-black sm:text-dark sm:tracking-wider sm:group-hover:text-neutral-800 sm:transition-colors">X (Twitter)</span>
                        </motion.a>
                    )}

                    {/* BOOTH Link */}
                    {links.booth && (
                        <motion.a
                            href={links.booth}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={reduceMotion ? undefined : "hover"}
                            whileTap={{ scale: 0.96 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.16 }}
                            aria-label="BOOTH"
                            className="group relative flex aspect-square items-center justify-center rounded-full border border-white/80 bg-white/75 p-2 shadow-[0_8px_24px_rgba(36,19,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/20 hover:shadow-[0_20px_45px_rgba(252,77,80,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-500 motion-reduce:hover:translate-y-0 motion-reduce:transition-none sm:aspect-auto sm:h-44 sm:flex-col sm:gap-4 sm:rounded-3xl sm:p-8 sm:glass-panel"
                        >
                            <div className="absolute -z-10 w-24 h-24 rounded-full bg-rose-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-md border border-red-500 hidden sm:flex items-center justify-center text-[9px] font-serif font-black text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                                店
                            </div>

                            <motion.div 
                                variants={iconVariants}
                                className="w-12 h-12 sm:w-14 sm:h-14 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center transition-colors group-hover:bg-rose-500 group-hover:text-white"
                            >
                                <ShoppingBag size={26} className="drop-shadow-sm" />
                            </motion.div>
                            <span className="sr-only sm:not-sr-only sm:text-base sm:font-serif sm:font-black sm:text-dark sm:tracking-wider sm:group-hover:text-rose-500 sm:transition-colors">BOOTH Shop</span>
                        </motion.a>
                    )}

                    {/* TikTok Link */}
                    {links.tiktok && (
                        <motion.a
                            href={links.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={reduceMotion ? undefined : "hover"}
                            whileTap={{ scale: 0.96 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.24 }}
                            aria-label="TikTok"
                            className="group relative flex aspect-square items-center justify-center rounded-full border border-white/80 bg-white/75 p-2 shadow-[0_8px_24px_rgba(36,19,13,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-800/20 hover:shadow-[0_20px_45px_rgba(17,24,39,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-800 motion-reduce:hover:translate-y-0 motion-reduce:transition-none sm:aspect-auto sm:h-44 sm:flex-col sm:gap-4 sm:rounded-3xl sm:p-8 sm:glass-panel"
                        >
                            <div className="absolute -z-10 w-24 h-24 rounded-full bg-slate-800/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-md border border-slate-600 hidden sm:flex items-center justify-center text-[9px] font-serif font-black text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                                踊
                            </div>

                            <motion.div 
                                variants={iconVariants}
                                className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-800/10 text-slate-800 rounded-full flex items-center justify-center transition-colors group-hover:bg-slate-800 group-hover:text-white"
                            >
                                <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor" className="drop-shadow-sm">
                                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                </svg>
                            </motion.div>
                            <span className="sr-only sm:not-sr-only sm:text-base sm:font-serif sm:font-black sm:text-dark sm:tracking-wider sm:group-hover:text-slate-800 sm:transition-colors">TikTok</span>
                        </motion.a>
                    )}
                </div>
            </div>
        </section>
    );
}
