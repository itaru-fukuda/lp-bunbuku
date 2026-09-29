"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

interface SequenceItem {
    text: string;
    image: string;
}

interface Props {
    items: SequenceItem[];
}

export const HERO_SEQUENCE_INTERVAL = 3000;
export const HERO_SEQUENCE_TEXT_FADE_DURATION = 700;

export default function HeroSequence({ items }: Props) {
    const reduceMotion = useReducedMotion();
    const [currentIndex, setCurrentIndex] = useState(0);

    // One-shot sequence looping logic
    useEffect(() => {
        if (!items || items.length === 0 || reduceMotion) return;

        if (currentIndex < items.length) {
            const timer = setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, HERO_SEQUENCE_INTERVAL);
            return () => clearTimeout(timer);
        }
    }, [items, currentIndex, reduceMotion]);

    if (!items || items.length === 0) {
        return (
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-pink-50" />
        );
    }

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-pink-50 font-[family-name:var(--font-mochiy)]">
            
            {/* Image Layers (Plain Tailwind Crossfade to prevent Framer Motion Hydration Mismatch) */}
            {items.map((item, index) => {
                const isActive = index === currentIndex || (currentIndex === items.length && index === items.length - 1);
                return (
                    <div
                        key={`img-layer-${index}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                    >
                        {/* Layer 1: Blurred Fill (for mobile letterboxing) */}
                        <div className="absolute inset-0 overflow-hidden opacity-60 blur-sm scale-110 pointer-events-none select-none">
                            <Image
                                src={item.image}
                                alt=""
                                fill
                                sizes="100vw"
                                className="object-cover"
                                draggable={false}
                                priority={index === 0}
                            />
                        </div>

                        {/* Layer 2: Main Image (Contain on mobile, Cover on desktop) */}
                        <Image
                            src={item.image}
                            alt={`分福ありさ`}
                            fill
                            sizes="100vw"
                            className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-80 pointer-events-none select-none"
                            draggable={false}
                            priority={index === 0}
                        />
                    </div>
                );
            })}

            {/* Speach bubble / Text Messages Overlay (Plain transition crossfade) */}
            <div aria-hidden={reduceMotion ? true : undefined} className={`absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none ${reduceMotion ? "hidden" : ""}`}>
                {items.map((item, index) => (
                    <div
                        key={`text-layer-${index}`}
                        className={`absolute transition-all duration-700 ease-out max-w-5xl text-center flex flex-col items-center gap-3 ${
                            index === currentIndex 
                                ? "opacity-100 transform translate-y-0 scale-100" 
                                : "opacity-0 transform translate-y-6 scale-95 pointer-events-none"
                        }`}
                    >
                        <div className="text-[clamp(1rem,4.5vw,2.25rem)] md:text-6xl lg:text-8xl font-extrabold text-white drop-shadow-[0_4px_12px_rgba(255,105,180,0.85)] leading-tight flex flex-col items-center gap-3">
                            {item.text.split("\n").map((line, lIdx) => (
                                <span key={lIdx} className="block whitespace-nowrap">
                                    {line}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Overlay gradient to soften the edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/90 pointer-events-none z-30" />
        </div>
    );
}
