"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SequenceItem = {
    text: string;
    image: string;
};

type Props = {
    items: SequenceItem[];
};

export default function HeroSequence({ items }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // One-shot sequence logic
    useEffect(() => {
        if (!items || items.length === 0) return;

        // Tempo configuration (ms)
        const INTERVAL = 3000;

        if (currentIndex < items.length - 1) {
            const timer = setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, INTERVAL);
            return () => clearTimeout(timer);
        }
    }, [items, currentIndex]);

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];



    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-pink-50 font-[family-name:var(--font-mochiy)]">
            <AnimatePresence mode="popLayout">
                {/* Background Image (Crossfade) */}
                <motion.div
                    key={`bg-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    {/* Layer 1: Blurred Fill (for mobile letterboxing) */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={currentItem.image}
                            alt=""
                            className="w-full h-full object-cover opacity-70 blur-sm scale-110"
                        />
                    </div>

                    {/* Layer 2: Main Image (Contain on mobile, Cover on desktop) */}
                    <img
                        src={currentItem.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-80"
                    />
                </motion.div>

                {/* Text Animation (MV Style) */}
                <motion.div
                    key={`text-container-${currentIndex}`}
                    className="absolute inset-0 z-10 flex items-center justify-center p-4 pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="max-w-5xl text-center">
                        {/* 
                           We render text as separate characters for impact 
                           style: "Mochiy Pop P One", big drop shadow (stroke effect)
                        */}
                        <p className="text-4xl md:text-6xl lg:text-8xl font-black text-white drop-shadow-[0_4px_4px_rgba(255,105,180,0.8)] leading-tight stroke-text whitespace-pre-wrap">
                            {currentItem.text}
                        </p>
                        <style jsx>{`
                            .stroke-text {
                                -webkit-text-stroke: 2px #FF6EB4; /* Pink Stroke */
                                text-shadow: 4px 4px 0px #FFB6C1; /* Hard shadow offset */
                            }
                        `}</style>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/90 pointer-events-none z-0" />
        </div>
    );
}

