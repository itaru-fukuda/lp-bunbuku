"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
    /**
     * The color of the SVG path. Should match the background of the adjacent section.
     * e.g., "text-white", "text-pink-50", "text-gray-50", "text-[#FFFDF7]"
     */
    colorClass: string;
    /**
     * If true, flips the divider vertically.
     */
    inverted?: boolean;
    /**
     * Optional animate flag for subtle breathing motion.
     */
    animate?: boolean;
}

export default function SectionDivider({ colorClass, inverted = false, animate = false }: SectionDividerProps) {
    // 章の境界にだけ使う、余白を取りすぎない浅いウェーブ。
    const wavePath1 = "M0,34 C180,12 300,12 480,34 C660,56 780,56 960,34 C1140,12 1260,12 1440,34 L1440,64 L0,64 Z";
    const wavePath2 = "M0,32 C180,16 300,16 480,32 C660,48 780,48 960,32 C1140,16 1260,16 1440,32 L1440,64 L0,64 Z";

    return (
        <div aria-hidden="true" className={`relative z-30 h-8 w-full select-none overflow-hidden leading-[0] pointer-events-none md:h-12 ${inverted ? "-mt-px rotate-180" : "-mb-px"}`}>
            <svg
                viewBox="0 0 1440 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className={`h-full w-full ${colorClass}`}
            >
                {animate ? (
                    <motion.path
                        d={wavePath1}
                        animate={{
                            d: [wavePath1, wavePath2, wavePath1]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        fill="currentColor"
                    />
                ) : (
                    <path d={wavePath1} fill="currentColor" />
                )}
            </svg>
        </div>
    );
}
