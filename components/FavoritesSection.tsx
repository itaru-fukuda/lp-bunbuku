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

                <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 px-2">
                    {favorites.items.map((item: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            animate={{ 
                                y: [0, index % 2 === 0 ? -15 : -10, 0] 
                            }}
                            transition={{ 
                                y: {
                                    duration: 3.5 + index * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                opacity: { duration: 0.6, delay: index * 0.1 },
                                scale: { duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.5 }
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            className={`relative w-40 md:w-56 aspect-square flex flex-col items-center justify-center p-3 md:p-6 rounded-full shadow-[inset_0_4px_20px_rgba(255,255,255,0.9),0_10px_20px_rgba(0,0,0,0.05)] border border-white/60 backdrop-blur-md cursor-pointer ${item.color} bg-opacity-80`}
                        >
                            {/* Inner Bubble Reflection */}
                            <div className="absolute top-3 right-5 md:top-4 md:right-8 w-6 h-4 md:w-10 md:h-6 bg-white/70 rounded-[100%] rotate-[-45deg] blur-[2px] opacity-70 pointer-events-none"></div>
                            
                            {/* Small secondary bubble attached */}
                            <div className={`absolute -bottom-2 -left-2 w-8 h-8 rounded-full ${item.color} border border-white/60 shadow-[inset_0_2px_10px_rgba(255,255,255,0.9)] opacity-80 pointer-events-none`}></div>

                            <h3 className="font-mochiy font-bold text-gray-800 text-sm md:text-xl text-center whitespace-pre-wrap leading-relaxed drop-shadow-sm z-10" style={{ rotate: item.rotate }}>
                                {item.text}
                            </h3>
                            {item.comment && (
                                <span className="mt-2 md:mt-3 text-[10px] md:text-xs text-gray-700 text-center font-bold bg-white/80 px-3 py-1.5 rounded-full w-[105%] shadow-sm z-10 border border-white filter backdrop-blur-sm -rotate-2">
                                    {item.comment}
                                </span>
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
