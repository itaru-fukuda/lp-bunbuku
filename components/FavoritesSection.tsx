"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import content from "@/data/content.json";

export default function FavoritesSection() {
    const { favorites } = content;

    if (!favorites) return null;

    return (
        <section className="py-20 bg-yellow-50 overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                <SectionTitle
                    title={
                        <>
                            ありさちゃんの
                            <br className="md:hidden" />
                            「ここ好き」
                        </>
                    }
                    subtitle={favorites.subtitle}
                    color="accent"
                />

                <div className="mt-8 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:justify-center md:gap-6">
                    {favorites.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 0, // Straighten on hover
                                zIndex: 10,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                            className={`relative w-full md:w-48 aspect-square flex flex-col items-center justify-center p-2 md:p-4 rounded-xl shadow-lg border-2 border-white/50 cursor-pointer ${item.color}`}
                            style={{ rotate: item.rotate }}
                        >
                            {/* Pin / Tape graphic could go here */}
                            <h3 className="font-mochiy font-bold text-gray-800 text-base md:text-3xl text-center whitespace-pre-wrap mb-1 md:mb-2 leading-relaxed drop-shadow-sm">
                                {item.text}
                            </h3>
                            {/* Decorative line or element could replace icon */}
                            {item.comment && (
                                <p className="text-[10px] md:text-base text-gray-700 text-center font-bold bg-white/80 px-2 md:px-3 py-1 md:py-2 rounded-lg w-full shadow-sm transform -rotate-1 border border-gray-100 leading-tight">
                                    {item.comment}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 text-6xl opacity-30 rotate-12">✨</div>
                <div className="absolute bottom-20 right-20 text-8xl opacity-30 -rotate-12">💖</div>
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>
        </section>
    );
}
