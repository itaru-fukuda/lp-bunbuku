"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import SectionTitle from "./SectionTitle";
import content from "@/data/content.json";

interface FavoriteItem {
    text: string;
    comment: string;
    color?: string;
    rotate?: string;
    style?: "sticky" | "memo" | "cheki";
    image?: string;
}

export default function FavoritesSection() {
    const { favorites } = content;
    
    // Parallax logic for stickers
    const { scrollY } = useScroll();
    const ySticker1 = useTransform(scrollY, [1000, 3000], [-30, 70]);
    const ySticker2 = useTransform(scrollY, [1000, 3000], [50, -50]);

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

                {/* Desktop Scrapbook Board (Visible on md and up) */}
                <div 
                    className="mt-16 hidden md:flex md:flex-wrap md:justify-center md:gap-x-12 md:gap-y-16 px-4 max-w-6xl mx-auto"
                    style={{ perspective: 1200 }}
                >
                    {favorites.items.map((item: FavoriteItem, index: number) => {
                        let typeIndex = index % 2;
                        
                        if (item.style === "sticky") typeIndex = 0;
                        else if (item.style === "memo") typeIndex = 1;
                        else if (item.style === "cheki") typeIndex = 2;
                        else if (item.image) typeIndex = 2;
                        
                        const tiltX = index % 2 === 0 ? 10 : -10;
                        const tiltY = index % 3 === 0 ? -8 : 8;

                        return (
                            <motion.div
                                key={`desktop-${index}`}
                                initial={{ opacity: 0, scale: 0.8, y: 50, rotate: (index % 2 === 0 ? -10 : 10) }}
                                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: parseFloat(item.rotate || "0") }}
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover={{ 
                                    scale: 1.08, 
                                    rotate: 0, 
                                    rotateX: tiltX,
                                    rotateY: tiltY,
                                    zIndex: 50,
                                    transition: { type: "spring", stiffness: 400, damping: 15 }
                                }}
                                transition={{ duration: 0.6, delay: index * 0.08, type: "spring", bounce: 0.3 }}
                                className="relative cursor-pointer group flex justify-center"
                                style={{ zIndex: index, transformStyle: "preserve-3d" }}
                            >
                                {/* Scrap Style A (Sticky Note) */}
                                {typeIndex === 0 && (
                                    <div className={`w-56 p-6 transition-all duration-300 rounded-sm ${item.color || "bg-yellow-100"} shadow-[2px_4px_12px_rgba(0,0,0,0.08)] group-hover:shadow-[15px_22px_35px_rgba(0,0,0,0.12)] border border-black/5`}>
                                        {/* Washi Tape */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-300 opacity-60 -rotate-3 mix-blend-multiply shadow-sm"></div>
                                        <h3 className="font-mochiy font-bold text-gray-800 text-lg mb-3 drop-shadow-sm leading-relaxed whitespace-pre-wrap">{item.text}</h3>
                                        <p className="text-sm font-bold text-gray-700 leading-snug">{item.comment}</p>
                                    </div>
                                )}

                                {/* Scrap Style B (Torn/Dashed Memo) */}
                                {typeIndex === 1 && (
                                    <div className={`w-60 p-5 transition-all duration-300 bg-white border-t-4 border-dashed border-blue-300 rounded-b-md shadow-[3px_5px_15px_rgba(0,0,0,0.06)] group-hover:shadow-[16px_25px_38px_rgba(0,0,0,0.1)]`}>
                                        {/* Corner Tape */}
                                        <div className="absolute -top-4 -left-4 w-12 h-5 bg-yellow-300 opacity-60 rotate-45 mix-blend-multiply shadow-sm"></div>
                                        <div className="absolute -bottom-2 -right-2 text-3xl opacity-40 transition-transform duration-300 group-hover:scale-110">
                                            {favorites.memoIcon ?? "🐾"}
                                        </div>
                                        <h3 className="font-mochiy font-bold text-pink-500 text-lg mb-3 leading-relaxed whitespace-pre-wrap">{item.text}</h3>
                                        <p className="text-sm font-bold text-gray-600 leading-snug">{item.comment}</p>
                                    </div>
                                )}

                                {/* Scrap Style C (Polaroid/Card) */}
                                {typeIndex === 2 && (
                                    <div className="w-48 p-3 pb-8 bg-white transition-all duration-300 rounded-sm shadow-[2px_4px_16px_rgba(0,0,0,0.12)] group-hover:shadow-[18px_28px_40px_rgba(0,0,0,0.18)] border border-gray-100">
                                        {/* Top Tape */}
                                        <div className="absolute -top-3 right-4 w-12 h-5 bg-blue-200 opacity-70 rotate-[15deg] mix-blend-multiply shadow-sm"></div>
                                        {/* Photo frame area */}
                                        <div className={`w-full aspect-square ${item.color || "bg-pink-50"} mb-3 flex items-center justify-center rounded-sm overflow-hidden relative shadow-inner`}>
                                            {item.image ? (
                                                <img src={item.image} alt={item.text} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
                                            ) : (
                                                <>
                                                    <span className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                                                        {favorites.placeholderIcon ?? "🫧"}
                                                    </span>
                                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="font-mochiy font-bold text-gray-800 text-base text-center mb-1 drop-shadow-sm whitespace-pre-wrap leading-tight">{item.text}</h3>
                                        <p className="text-xs font-bold text-gray-500 text-center leading-snug px-1 border-b border-gray-200 pb-1 inline-block mx-auto w-full border-dashed">{item.comment}</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile Scrapbook Board (Visible below md) */}
                <div className="mt-12 flex flex-col items-center gap-y-12 max-w-sm mx-auto px-4 md:hidden">
                    {favorites.items.map((item: FavoriteItem, index: number) => {
                        let typeIndex = index % 2;
                        
                        if (item.style === "sticky") typeIndex = 0;
                        else if (item.style === "memo") typeIndex = 1;
                        else if (item.style === "cheki") typeIndex = 2;
                        else if (item.image) typeIndex = 2;

                        const isEven = index % 2 === 0;
                        const mobileRotate = isEven ? -3 : 3;
                        const mobileTranslateX = isEven ? "-12px" : "12px";

                        return (
                            <motion.div
                                key={`mobile-${index}`}
                                initial={{ opacity: 0, scale: 0.9, y: 30, rotate: isEven ? -6 : 6 }}
                                whileInView={{ 
                                    opacity: 1, 
                                    scale: 1, 
                                    y: 0, 
                                    rotate: mobileRotate,
                                    x: mobileTranslateX
                                }}
                                viewport={{ once: true, margin: "-30px" }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                                className="relative w-full max-w-[270px] flex justify-center"
                                style={{ zIndex: index }}
                            >
                                {/* Scrap Style A (Sticky Note) */}
                                {typeIndex === 0 && (
                                    <div className={`w-full p-5 rounded-sm ${item.color || "bg-yellow-100"} shadow-[2px_4px_12px_rgba(0,0,0,0.08)] border border-black/5`}>
                                        {/* Washi Tape */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pink-300 opacity-60 -rotate-3 mix-blend-multiply shadow-sm"></div>
                                        <h3 className="font-mochiy font-bold text-gray-800 text-base mb-2 drop-shadow-sm leading-relaxed whitespace-pre-wrap">{item.text}</h3>
                                        <p className="text-sm font-bold text-gray-700 leading-snug">{item.comment}</p>
                                    </div>
                                )}

                                {/* Scrap Style B (Torn/Dashed Memo) */}
                                {typeIndex === 1 && (
                                    <div className={`w-full p-5 bg-white border-t-4 border-dashed border-blue-300 rounded-b-md shadow-[3px_5px_15px_rgba(0,0,0,0.06)]`}>
                                        {/* Corner Tape */}
                                        <div className="absolute -top-4 -left-4 w-12 h-5 bg-yellow-300 opacity-60 rotate-45 mix-blend-multiply shadow-sm"></div>
                                        <div className="absolute -bottom-1 -right-1 text-2xl opacity-40">
                                            {favorites.memoIcon ?? "🐾"}
                                        </div>
                                        <h3 className="font-mochiy font-bold text-pink-500 text-base mb-2 leading-relaxed whitespace-pre-wrap">{item.text}</h3>
                                        <p className="text-sm font-bold text-gray-600 leading-snug">{item.comment}</p>
                                    </div>
                                )}

                                {/* Scrap Style C (Polaroid/Card) */}
                                {typeIndex === 2 && (
                                    <div className="w-full p-3 pb-6 bg-white rounded-sm shadow-[2px_4px_16px_rgba(0,0,0,0.12)] border border-gray-100">
                                        {/* Top Tape */}
                                        <div className="absolute -top-3 right-4 w-12 h-5 bg-blue-200 opacity-70 rotate-[15deg] mix-blend-multiply shadow-sm"></div>
                                        {/* Photo frame area */}
                                        <div className={`w-full aspect-square ${item.color || "bg-pink-50"} mb-3 flex items-center justify-center rounded-sm overflow-hidden relative shadow-inner`}>
                                            {item.image ? (
                                                <img src={item.image} alt={item.text} className="w-full h-full object-cover" />
                                            ) : (
                                                <>
                                                    <span className="text-5xl drop-shadow-md">
                                                        {favorites.placeholderIcon ?? "🫧"}
                                                    </span>
                                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="font-mochiy font-bold text-gray-800 text-sm text-center mb-1 drop-shadow-sm whitespace-pre-wrap leading-tight">{item.text}</h3>
                                        <p className="text-xs font-bold text-gray-500 text-center leading-snug px-1 border-b border-gray-200 pb-1 inline-block mx-auto w-full border-dashed">{item.comment}</p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Extra Decorative Scrapbook Elements (Stickers) with Parallax */}
            <motion.div 
                style={{ y: ySticker1 }}
                className="absolute top-10 right-10 text-6xl opacity-35 rotate-12 pointer-events-none drop-shadow-lg"
            >
                {favorites.decorations?.[0] ?? "🎀"}
            </motion.div>
            <motion.div 
                style={{ y: ySticker2 }}
                className="absolute bottom-24 left-10 text-7xl opacity-35 -rotate-12 pointer-events-none drop-shadow-lg"
            >
                {favorites.decorations?.[1] ?? "🎮"}
            </motion.div>
            <div className="absolute top-1/2 right-4 w-24 h-24 rounded-full border-4 border-pink-200/50 border-dashed opacity-40 animate-spin-slow pointer-events-none"></div>
        </section>
    );
}
