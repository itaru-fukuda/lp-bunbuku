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

export default function SectionDivider({ colorClass, inverted = false, animate = true }: SectionDividerProps) {
    // Hand-drawn cloud-like / raccoon tail puffy wave curves
    // A sequence of round bumps.
    const mocomocoPath1 = "M0,75 C60,35 100,35 160,75 C220,35 260,35 320,75 C380,35 420,35 480,75 C540,35 580,35 640,75 C700,35 740,35 800,75 C860,35 900,35 960,75 C1020,35 1060,35 1120,75 C1180,35 1220,35 1280,75 C1340,35 1380,35 1440,75 L1440,120 L0,120 Z";
    const mocomocoPath2 = "M0,65 C60,25 100,25 160,65 C220,25 260,25 320,65 C380,25 420,25 480,65 C540,25 580,25 640,65 C700,25 740,25 800,65 C860,25 900,25 960,65 C1020,25 1060,25 1120,65 C1180,25 1220,25 1280,65 C1340,25 1380,25 1440,65 L1440,120 L0,120 Z";

    return (
        <div className={`w-full overflow-hidden leading-[0] select-none pointer-events-none relative z-30 ${inverted ? "transform rotate-180 -mt-[1px]" : "-mb-[1px]"}`}>
            <svg
                viewBox="0 0 1440 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-full h-auto ${colorClass}`}
            >
                {animate ? (
                    <motion.path
                        d={mocomocoPath1}
                        animate={{
                            d: [mocomocoPath1, mocomocoPath2, mocomocoPath1]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        fill="currentColor"
                    />
                ) : (
                    <path d={mocomocoPath1} fill="currentColor" />
                )}
            </svg>
        </div>
    );
}
