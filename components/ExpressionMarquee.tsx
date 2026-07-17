"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface ExpressionMarqueeProps {
    images: string[];
    comicDecorations?: Record<string, string>;
    title?: string;
    subtitle?: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    scale: number;
    rotate: number;
    icon: string;
    color: string;
    delay: number;
}

const PANEL_LAYOUTS = [
    "col-span-2 row-span-2 md:col-span-3 md:row-span-2",
    "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
    "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
    "col-span-1 row-span-2 md:col-span-2 md:row-span-2",
    "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
    "col-span-2 row-span-1 md:col-span-3 md:row-span-1",
];

const INITIAL_VISIBLE_COUNT = 15;

export default function ExpressionMarquee({ images, comicDecorations = {}, title, subtitle }: ExpressionMarqueeProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showAll, setShowAll] = useState(false);
    const reduceMotion = useReducedMotion();

    // 3D Tilt and Glare State
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glareX, setGlareX] = useState(50);
    const [glareY, setGlareY] = useState(50);
    const [glareOpacity, setGlareOpacity] = useState(0);

    const displayedImages = showAll ? images : images.slice(0, INITIAL_VISIBLE_COUNT);

    const handleImageClick = useCallback((src: string) => {
        setSelectedImage(src);

        // Generate burst particles on image selection
        const count = reduceMotion ? 0 : 28;
        const icons = ["🐾", "⭐", "❤️", "🫧", "✨", "💖"];
        const colors = [
            "text-pink-400", 
            "text-yellow-400", 
            "text-blue-400", 
            "text-purple-400", 
            "text-rose-400", 
            "text-amber-400",
            "text-teal-300"
        ];
        
        const newParticles = Array.from({ length: count }).map((_, i) => {
            const angle = (i * (360 / count) + Math.random() * 15) * (Math.PI / 180);
            const distance = 160 + Math.random() * 180;
            return {
                id: i,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0.6 + Math.random() * 0.8,
                rotate: Math.random() * 360,
                icon: icons[Math.floor(Math.random() * icons.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.08
            };
        });
        setParticles(newParticles);
    }, [reduceMotion]);

    const handleCloseModal = useCallback(() => {
        setSelectedImage(null);
        setParticles([]);
        setRotateX(0);
        setRotateY(0);
        setGlareOpacity(0);
    }, []);

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (reduceMotion) return;
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - box.left - box.width / 2;
        const y = touch.clientY - box.top - box.height / 2;
        
        // 3D Tilt max rotation (12 degrees)
        const factor = 12;
        const rx = -(y / (box.height / 2)) * factor;
        const ry = (x / (box.width / 2)) * factor;
        
        const clampedRx = Math.max(-factor, Math.min(factor, rx));
        const clampedRy = Math.max(-factor, Math.min(factor, ry));

        setRotateX(clampedRx);
        setRotateY(clampedRy);

        // Glare calculation
        const px = ((touch.clientX - box.left) / box.width) * 100;
        const py = ((touch.clientY - box.top) / box.height) * 100;
        
        const clampedPx = Math.max(0, Math.min(100, px));
        const clampedPy = Math.max(0, Math.min(100, py));

        setGlareX(clampedPx);
        setGlareY(clampedPy);
        setGlareOpacity(0.35);
    };

    const handleTouchEnd = () => {
        setRotateX(0);
        setRotateY(0);
        setGlareOpacity(0);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduceMotion) return;
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left - box.width / 2;
        const y = e.clientY - box.top - box.height / 2;
        
        // 3D Tilt max rotation (12 degrees)
        const factor = 12;
        const rx = -(y / (box.height / 2)) * factor;
        const ry = (x / (box.width / 2)) * factor;
        
        setRotateX(rx);
        setRotateY(ry);

        // Glare calculation
        const px = ((e.clientX - box.left) / box.width) * 100;
        const py = ((e.clientY - box.top) / box.height) * 100;
        setGlareX(px);
        setGlareY(py);
        setGlareOpacity(0.35);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlareOpacity(0);
    };

    return (
        <>
            <section id="expression-gallery" className="relative z-20 overflow-hidden bg-[rgba(255,249,252,0.90)] py-16 md:py-20">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.16]"
                    style={{
                        backgroundImage: "radial-gradient(#C879D8 1.2px, transparent 1.2px)",
                        backgroundSize: "18px 18px",
                    }}
                />
                <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-pink-200/20 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-16 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />

                {title && (
                    <div className="container relative z-30 mx-auto mb-10 px-4 md:mb-14">
                        <SectionTitle title={title} subtitle={subtitle} color="tertiary" />
                        <p className="mx-auto -mt-7 max-w-xl text-center text-sm leading-7 text-text-sub sm:text-base">
                            くるくる変わる表情をお裾分け。配信でも見れるよ！
                        </p>
                    </div>
                )}

                <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-5">
                    <motion.div
                        layout={!reduceMotion}
                        className="grid auto-rows-[112px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[145px] sm:gap-4 md:grid-cols-6 md:auto-rows-[150px]"
                    >
                        {displayedImages.map((src, index) => {
                            const layout = PANEL_LAYOUTS[index % PANEL_LAYOUTS.length];
                            const word = comicDecorations[src];

                            return (
                                <motion.button
                                    layout={!reduceMotion}
                                    key={src}
                                    type="button"
                                    aria-label={`表情ギャラリー ${index + 1}枚目を拡大`}
                                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
                                    whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.45, delay: Math.min((index % 8) * 0.05, 0.25), ease: "easeOut" }}
                                    whileHover={reduceMotion ? undefined : { y: -4 }}
                                    whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                                    onClick={() => handleImageClick(src)}
                                    className={`group relative isolate overflow-hidden rounded-[1.15rem] border-[3px] border-[#4B3045] bg-white text-left shadow-[5px_6px_0_rgba(75,48,69,0.14)] transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[7px_9px_0_rgba(255,110,180,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none sm:rounded-[1.5rem] ${layout}`}
                                >
                                    <Image
                                        src={src}
                                        alt=""
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 520px"
                                        className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                        draggable={false}
                                    />
                                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4B3045]/25 via-transparent to-white/5" />
                                    <span aria-hidden="true" className="pointer-events-none absolute left-2.5 top-2.5 rounded-full border border-white/70 bg-[#4B3045]/75 px-2 py-1 font-[family-name:var(--font-poppins)] text-[9px] font-bold tracking-wider text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:text-[10px]">
                                        SCENE {String(index + 1).padStart(2, "0")}
                                    </span>
                                    {word && (
                                        <motion.span
                                            aria-hidden="true"
                                            animate={reduceMotion ? undefined : { rotate: [-5, -2, -5], scale: [1, 1.04, 1] }}
                                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                                            className="pointer-events-none absolute bottom-2.5 right-2.5 -rotate-3 rounded-full border-2 border-[#4B3045] bg-white/95 px-2.5 py-1 font-[family-name:var(--font-mochiy)] text-[11px] text-primary shadow-sm sm:bottom-4 sm:right-4 sm:px-3 sm:text-sm"
                                        >
                                            {word}
                                        </motion.span>
                                    )}
                                    <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-16 w-16 rounded-full border-[10px] border-white/15 transition-transform duration-500 group-hover:scale-125 motion-reduce:transition-none" />
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {images.length > INITIAL_VISIBLE_COUNT && (
                        <div className="mt-10 flex justify-center">
                            <button
                                type="button"
                                aria-expanded={showAll}
                                onClick={() => setShowAll((current) => !current)}
                                className="group inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-primary/30 bg-white/90 px-6 py-3 text-sm font-bold text-primary shadow-[0_8px_24px_rgba(255,110,180,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_12px_28px_rgba(255,110,180,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none"
                            >
                                <span aria-hidden="true" className="text-base">{showAll ? "−" : "＋"}</span>
                                {showAll ? "少なく表示" : `すべての表情を見る（${images.length}枚）`}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 cursor-pointer"
                        onClick={handleCloseModal}
                    >
                        {/* Particle Layer (behind the card) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                            {particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                                    animate={{ 
                                        x: p.x, 
                                        y: p.y, 
                                        opacity: 0, 
                                        scale: p.scale, 
                                        rotate: p.rotate 
                                    }}
                                    transition={{ 
                                        duration: 1.4, 
                                        ease: [0.1, 0.8, 0.3, 1], // easeOutExpo
                                        delay: p.delay 
                                    }}
                                    className={`absolute pointer-events-none text-3xl select-none filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)] ${p.color}`}
                                >
                                    {p.icon}
                                </motion.div>
                            ))}
                        </div>

                        {/* Polaroid Card Wrapper (Floating Animation layer) */}
                        <motion.div
                            initial={reduceMotion ? false : { scale: 0.6, rotate: -12, opacity: 0 }}
                            animate={reduceMotion ? { scale: 1, rotate: 0, opacity: 1, y: 0 } : {
                                scale: 1,
                                rotate: 0,
                                opacity: 1,
                                y: [0, -8, 0],
                                transition: {
                                    scale: { type: "spring", stiffness: 280, damping: 18 },
                                    rotate: { type: "spring", stiffness: 280, damping: 18 },
                                    opacity: { duration: 0.25 },
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }
                            }}
                            exit={reduceMotion ? { opacity: 0 } : { scale: 0.6, rotate: 12, opacity: 0, transition: { duration: 0.25 } }}
                            className="relative max-w-[420px] w-full z-10 cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Polaroid Card Body (3D Tilt & Touch/Mouse listener layer) */}
                            <div 
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onTouchCancel={handleTouchEnd}
                                style={{
                                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                                    transition: rotateX === 0 && rotateY === 0 ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.05s ease-out",
                                    transformStyle: "preserve-3d"
                                }}
                                className="bg-white p-4 pb-20 rounded-3xl shadow-[0_35px_80px_rgba(0,0,0,0.6)] border-4 border-white flex flex-col items-center relative select-none"
                            >
                                {/* Masking Tape decoration */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-36 h-10 bg-pink-300/75 backdrop-blur-[2px] shadow-sm -rotate-2 border-x-4 border-dashed border-white/30 pointer-events-none select-none z-20" />
                                
                                {/* Close button */}
                                <button
                                    type="button"
                                    aria-label="拡大表示を閉じる"
                                    onClick={handleCloseModal}
                                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-30"
                                >
                                    <X size={18} strokeWidth={3} />
                                </button>
                                
                                {/* Image Container with inner shadow */}
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-pink-50/20 border border-gray-100 shadow-inner">
                                    <Image
                                        src={selectedImage}
                                        alt="Expanded expression"
                                        fill
                                        sizes="(max-width: 768px) 380px, 420px"
                                        className="object-cover pointer-events-none"
                                        draggable={false}
                                        priority
                                    />
                                    
                                    {/* 3D Glare (Shiny reflect overlay) */}
                                    <div 
                                        className="absolute inset-0 pointer-events-none mix-blend-overlay"
                                        style={{
                                            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`,
                                            opacity: glareOpacity,
                                            transition: "opacity 0.2s ease-out"
                                        }}
                                    />
                                    {/* Hologram subtle color layer */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-pink-500/5 via-transparent to-blue-500/5 mix-blend-color-burn" />
                                </div>

                                {/* Handwritten-style signature and doodles */}
                                <div className="absolute bottom-5 left-0 right-0 text-center font-mochiy text-2xl font-black text-gray-800 tracking-wider select-none flex items-center justify-center gap-1.5 opacity-90">
                                    <span className="text-pink-400 text-xl">🫧</span>
                                    <span>Bunbuku Arisa</span>
                                    <span className="text-pink-400 text-xl">🐾</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
