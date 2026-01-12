"use client";

import { motion } from "framer-motion";
import { Youtube, Twitter, ShoppingBag } from "lucide-react";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";

export default function Links() {
    const { links } = content;

    return (
        <section className="py-20 bg-gradient-to-t from-secondary/10 to-white">
            <div className="container mx-auto px-4 max-w-4xl text-center relative z-20">
                <SectionTitle title="Links" subtitle="リンク" color="primary" />

                <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
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
                        <span className="text-xl font-bold">YouTube Channel</span>
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
                            <Twitter size={32} />
                            <span className="text-xl font-bold">X (Twitter)</span>
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
                </div>
            </div>
        </section>
    );
}
