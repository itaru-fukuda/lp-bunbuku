"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import content from "@/data/content.json";

export default function FavoritesSection() {
    const { favorites } = content;

    if (!favorites) return null;

    return (
        <section className="py-20 bg-[#FFFDF7] relative overflow-hidden">
            {/* Scrapbook Dot Grid Background */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply" 
                 style={{ backgroundImage: 'radial-gradient(#E2D9C8 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
            </div>

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

                {/* Scrapbook Board Container */}
                <div className="mt-16 flex flex-wrap justify-center items-start gap-x-6 gap-y-12 md:gap-x-12 md:gap-y-16 px-4 max-w-6xl mx-auto">
                    {favorites.items.map((item: any, index: number) => {
                        // Determine style: 0 = Sticky, 1 = Memo, 2 = Cheki
                        let typeIndex = index % 2; // Default behavior (alternates between Sticky and Memo)
                        
                        if (item.style === "sticky") typeIndex = 0;
                        else if (item.style === "memo") typeIndex = 1;
                        else if (item.style === "cheki") typeIndex = 2;
                        else if (item.image) typeIndex = 2; // Auto-fallback if image exists

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, y: 50, rotate: (index % 2 === 0 ? -10 : 10) }}
                                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: parseFloat(item.rotate || "0") }}
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, transition: { type: "spring", stiffness: 300 } }}
                                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                                className="relative cursor-pointer group"
                                style={{ zIndex: index }}
                            >
                                {/* Scrap Style A (Sticky Note) */}
                                {typeIndex === 0 && (
                                    <div className={`w-40 md:w-56 p-6 shadow-[2px_4px_12px_rgba(0,0,0,0.1)] rounded-sm ${item.color || "bg-yellow-100"}`}>
                                        {/* Washi Tape */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-300 opacity-60 -rotate-3 mix-blend-multiply shadow-sm"></div>
                                        <h3 className="font-mochiy font-bold text-gray-800 text-sm md:text-lg mb-3 drop-shadow-sm leading-relaxed whitespace-pre-wrap">{item.text}</h3>
                                        <p className="text-[11px] md:text-sm font-bold text-gray-700 leading-snug">{item.comment}</p>
                                    </div>
                                )}

                                {/* Scrap Style B (Torn/Dashed Memo) */}
                                {typeIndex === 1 && (
                                    <div className={`w-44 md:w-60 p-5 shadow-[3px_5px_15px_rgba(0,0,0,0.08)] bg-white border-t-4 border-dashed border-blue-300 rounded-b-md`}>
                                        {/* Corner Tape */}
                                        <div className="absolute -top-4 -left-4 w-12 h-5 bg-yellow-300 opacity-60 rotate-45 mix-blend-multiply shadow-sm"></div>
                                        <div className="absolute -bottom-2 -right-2 text-xl md:text-3xl opacity-40">
                                            {favorites.memoIcon ?? "🐾"}
                                        </div>
                                        <h3 className="font-mochiy font-bold text-pink-500 text-sm md:text-lg mb-3 leading-relaxed whitespace-pre-wrap">{item.text}</h3>
                                        <p className="text-[11px] md:text-sm font-bold text-gray-600 leading-snug">{item.comment}</p>
                                    </div>
                                )}

                                {/* Scrap Style C (Polaroid/Card) */}
                                {typeIndex === 2 && (
                                    <div className="w-36 md:w-48 p-3 pb-8 bg-white shadow-[2px_4px_16px_rgba(0,0,0,0.15)] rounded-sm">
                                        {/* Top Tape */}
                                        <div className="absolute -top-3 right-4 w-12 h-5 bg-blue-200 opacity-70 rotate-[15deg] mix-blend-multiply shadow-sm"></div>
                                        {/* Photo frame area */}
                                        <div className={`w-full aspect-square ${item.color || "bg-pink-50"} mb-3 flex items-center justify-center rounded-sm overflow-hidden relative shadow-inner`}>
                                            {item.image ? (
                                                <img src={item.image} alt={item.text} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <>
                                                    <span className="text-4xl md:text-6xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                                                        {favorites.placeholderIcon ?? "🫧"}
                                                    </span>
                                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="font-mochiy font-bold text-gray-800 text-xs md:text-base text-center mb-1 drop-shadow-sm whitespace-pre-wrap leading-tight">{item.text}</h3>
                                        <p className="text-[9px] md:text-xs font-bold text-gray-500 text-center leading-snug px-1 border-b border-gray-200 pb-1 inline-block mx-auto w-full border-dashed">{item.comment}</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Extra Decorative Scrapbook Elements (Stickers) */}
            <div className="absolute top-10 right-10 text-6xl opacity-30 rotate-12 pointer-events-none drop-shadow-md">
                {favorites.decorations?.[0] ?? "🎀"}
            </div>
            <div className="absolute bottom-20 left-10 text-7xl opacity-30 -rotate-12 pointer-events-none drop-shadow-md">
                {favorites.decorations?.[1] ?? "🎮"}
            </div>
            <div className="absolute top-1/2 right-4 w-24 h-24 rounded-full border-4 border-pink-200 border-dashed opacity-40 animate-spin-slow pointer-events-none"></div>
        </section>
    );
}
