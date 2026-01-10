"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import content from "@/data/content.json";
import HeroSequence from "./HeroSequence";

export default function Hero() {
    const { hero } = content;
    const sequence = hero.greetingSequence || [];

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-pink-50 z-20">

            {/* Dynamic Sequence Background & Text */}
            <HeroSequence items={sequence} />

            {/* CTA Button (Fixed Overlay) */}
            <div className="absolute bottom-20 left-0 right-0 z-30 flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <Link
                        href={hero.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/50"
                    >
                        {hero.ctaText}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

