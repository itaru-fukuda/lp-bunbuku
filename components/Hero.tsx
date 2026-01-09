"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import content from "@/data/content.json";

export default function Hero() {
    const { hero } = content;

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-primary to-accent">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 text-white/30 animate-pulse">
                <Sparkles size={48} />
            </div>
            <div className="absolute bottom-20 right-10 text-white/30 animate-pulse delay-700">
                <Sparkles size={64} />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white/90 tracking-wide mb-2 drop-shadow-md">
                        {hero.subtext}
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-lg tracking-tight leading-tight">
                        {hero.catchphrase}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-10"
                >
                    <Link
                        href={hero.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        {hero.ctaText}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
