"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "./Modal";
import PageLink from "./PageLink";
import SectionTitle from "./SectionTitle";

interface ExpressionMarqueeProps {
    images: string[];
    preview?: boolean;
    comicDecorations?: Record<string, string>;
    title?: string;
    subtitle?: string;
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

export default function ExpressionMarquee({ images, preview = false, comicDecorations = {}, title, subtitle }: ExpressionMarqueeProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const reduceMotion = useReducedMotion();
    const displayedImages = images.slice(0, visibleCount);
    const handleCloseModal = () => setSelectedIndex(null);
    const move = (direction: number) => setSelectedIndex((index) => index === null ? null : (index + direction + images.length) % images.length);

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
                            const layout = preview ? "col-span-1 row-span-2 md:col-span-3" : PANEL_LAYOUTS[index % PANEL_LAYOUTS.length];
                            const word = comicDecorations[src];

                            return (
                                <motion.button
                                    layout={!reduceMotion}
                                    key={src}
                                    type="button"
                                    aria-label={`表情ギャラリー ${index + 1}枚目を拡大`}
                                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
                                    animate={reduceMotion ? { opacity: 1, scale: 1, y: 0 } : undefined}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.45, delay: Math.min((index % 8) * 0.05, 0.25), ease: "easeOut" }}
                                    whileHover={reduceMotion ? undefined : { y: -4 }}
                                    whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                                    onClick={() => setSelectedIndex(index)}
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

                    {!preview && images.length > visibleCount && (
                        <div className="mt-10 flex justify-center">
                            <button
                                type="button"
                                aria-label="表情をさらに表示"
                                onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE_COUNT)}
                                className="group inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-primary/30 bg-white/90 px-6 py-3 text-sm font-bold text-[#82415f] shadow-[0_8px_24px_rgba(255,110,180,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_12px_28px_rgba(255,110,180,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none"
                            >
                                <span aria-hidden="true" className="text-base">＋</span>
                                さらに見る（{visibleCount} / {images.length}枚）
                            </button>
                        </div>
                    )}
                    {preview && <div className="mt-10 text-center"><PageLink href="/gallery">ギャラリーを見る</PageLink></div>}
                    {images.length === 0 && <p className="py-8 text-center text-text-sub">現在、画像を表示できません。</p>}
                </div>
            </section>

            {selectedIndex !== null && <Modal label="表情ギャラリーの拡大表示" onClose={handleCloseModal} className="gallery-dialog"
                onKeyDown={(event) => {
                    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
                    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
                }}>
                <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="font-mochiy text-sm text-[#82415f]">Bunbuku Arisa</p>
                    <button type="button" onClick={handleCloseModal} aria-label="拡大表示を閉じる" className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50"><X size={20} /></button>
                </div>
                <div className="relative h-[min(60dvh,600px)] w-full touch-pan-y overflow-hidden rounded-2xl bg-pink-50"
                    onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
                    onTouchCancel={() => { touchStart.current = null; }}
                    onTouchEnd={(event) => {
                        if (!touchStart.current) return;
                        const dx = event.changedTouches[0].clientX - touchStart.current.x;
                        const dy = event.changedTouches[0].clientY - touchStart.current.y;
                        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
                        touchStart.current = null;
                    }}>
                    <Image src={images[selectedIndex]} alt={`分福ありさの表情 ${selectedIndex + 1}${comicDecorations[images[selectedIndex]] ? `：${comicDecorations[images[selectedIndex]]}` : ""}`} fill sizes="(max-width: 768px) 90vw, 720px" className="object-contain" />
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                    <button type="button" onClick={() => move(-1)} aria-label="前の画像" className="flex min-h-11 items-center gap-1 rounded-full bg-pink-50 px-4"><ChevronLeft size={18} />前へ</button>
                    <p aria-live="polite" aria-atomic="true" className="text-sm tabular-nums">{selectedIndex + 1} / {images.length}</p>
                    <button type="button" onClick={() => move(1)} aria-label="次の画像" className="flex min-h-11 items-center gap-1 rounded-full bg-pink-50 px-4">次へ<ChevronRight size={18} /></button>
                </div>
            </Modal>}
        </>
    );
}
