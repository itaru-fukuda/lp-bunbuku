"use client";

import { motion } from "framer-motion";
import { Youtube, ShoppingBag } from "lucide-react";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";

export default function Links() {
    const { links } = content;

    return (
        <section className="py-20 bg-gradient-to-t from-secondary/10 to-white">
            <div className="container mx-auto px-4 max-w-4xl text-center relative z-20">
                <SectionTitle title="Links" subtitle="リンク" color="primary" />

                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-6 mt-10">
                    <motion.a
                        href={links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-3 px-8 py-5 bg-red-600 text-white rounded-2xl shadow-lg hover:shadow-red-200/50 hover:shadow-xl transition-all"
                    >
                        <Youtube size={32} />
                        <span className="text-xl font-bold">YouTube</span>
                    </motion.a>

                    {links.twitter && (
                        <motion.a
                            href={links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-3 px-8 py-5 bg-black text-white rounded-2xl shadow-lg hover:shadow-gray-400/50 hover:shadow-xl transition-all"
                        >
                            <svg width="25" height="25" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
                            </svg>
                            <span className="text-xl font-bold">X (旧Twitter)</span>
                        </motion.a>
                    )}

                    {links.booth && (
                        <motion.a
                            href={links.booth}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-3 px-8 py-5 bg-[#fc4d50] text-white rounded-2xl shadow-lg hover:shadow-red-200/50 hover:shadow-xl transition-all"
                        >
                            <ShoppingBag size={32} />
                            <span className="text-xl font-bold">BOOTH</span>
                        </motion.a>
                    )}

                    {links.tiktok && (
                        <motion.a
                            href={links.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl shadow-lg hover:shadow-gray-400/50 hover:shadow-xl transition-all"
                        >
                            <svg width={25} height={25} viewBox="0 0 448 512" fill="currentColor">
                                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                            </svg>
                            <span className="text-xl font-bold">TikTok</span>
                        </motion.a>
                    )}
                </div>
            </div>
        </section>
    );
}
