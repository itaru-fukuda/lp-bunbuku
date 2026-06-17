"use client";

import { motion } from "framer-motion";
import { Youtube, ShoppingBag } from "lucide-react";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";

export default function Links() {
    const { links } = content;

    // Bouncing animation variants for social icons
    const iconVariants = {
        hover: {
            y: [0, -10, 2, -4, 0],
            rotate: [0, -8, 8, -3, 0],
            transition: {
                duration: 0.6,
                ease: "easeInOut" as const
            }
        }
    };

    return (
        <section className="py-20 bg-gradient-to-t from-secondary/10 to-white">
            <div className="container mx-auto px-4 max-w-4xl text-center relative z-20">
                <SectionTitle title="Links" subtitle="リンク" color="primary" />

                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 mt-12 px-4">
                    {/* YouTube Link */}
                    <motion.a
                        href={links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        viewport={{ once: true }}
                        className="group btn-shine-container flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-2xl shadow-[0_10px_25px_rgba(220,38,38,0.25)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.45)] border border-red-400/30 transition-all duration-300 min-w-[220px]"
                    >
                        <motion.div variants={iconVariants}>
                            <Youtube size={32} className="drop-shadow-md" />
                        </motion.div>
                        <span className="text-xl font-extrabold tracking-wide drop-shadow-sm">YouTube</span>
                    </motion.a>

                    {/* Twitter Link */}
                    {links.twitter && (
                        <motion.a
                            href={links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group btn-shine-container flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-br from-neutral-800 to-neutral-950 text-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] border border-neutral-700/40 transition-all duration-300 min-w-[220px]"
                        >
                            <motion.div variants={iconVariants}>
                                <svg width="28" height="28" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
                                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
                                </svg>
                            </motion.div>
                            <span className="text-xl font-extrabold tracking-wide drop-shadow-sm">X (Twitter)</span>
                        </motion.a>
                    )}

                    {/* BOOTH Link */}
                    {links.booth && (
                        <motion.a
                            href={links.booth}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group btn-shine-container flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-br from-[#ff6b6d] to-[#fc4d50] text-white rounded-2xl shadow-[0_10px_25px_rgba(252,77,80,0.25)] hover:shadow-[0_20px_40px_rgba(252,77,80,0.45)] border border-rose-400/30 transition-all duration-300 min-w-[220px]"
                        >
                            <motion.div variants={iconVariants}>
                                <ShoppingBag size={32} className="drop-shadow-md" />
                            </motion.div>
                            <span className="text-xl font-extrabold tracking-wide drop-shadow-sm">BOOTH</span>
                        </motion.a>
                    )}

                    {/* TikTok Link */}
                    {links.tiktok && (
                        <motion.a
                            href={links.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group btn-shine-container flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl shadow-[0_10px_25px_rgba(17,24,39,0.25)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.45)] border border-gray-700/40 transition-all duration-300 min-w-[220px]"
                        >
                            <motion.div variants={iconVariants}>
                                <svg width="26" height="26" viewBox="0 0 448 512" fill="currentColor" className="drop-shadow-md">
                                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                </svg>
                            </motion.div>
                            <span className="text-xl font-extrabold tracking-wide drop-shadow-sm">TikTok</span>
                        </motion.a>
                    )}
                </div>
            </div>
        </section>
    );
}
