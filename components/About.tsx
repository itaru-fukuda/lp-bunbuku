"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

interface AboutProps {
    id: string;
    data: {
        title: string;
        image?: string;
        description: string;
        tags?: string[];
    };
    bgColor?: string;
}

export default function About({ id, data, bgColor = "bg-white" }: AboutProps) {
    const { title, image, description, tags } = data;

    // Mounted check to prevent Hydration mismatch with scroll transforms
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Scroll parallax logic defined unconditionally at top level
    const { scrollY } = useScroll();
    
    // Parallax movement for background elements & decorative shapes
    const yOrb1 = useTransform(scrollY, [200, 1800], [-30, 120]);
    const yOrb2 = useTransform(scrollY, [200, 1800], [50, -100]);
    const yImageBgShape = useTransform(scrollY, [300, 1600], [0, 80]);

    // Apply parallax style only after mount
    const orb1Style = isMounted ? { y: yOrb1 } : {};
    const orb2Style = isMounted ? { y: yOrb2 } : {};
    const imageBgStyle = isMounted ? { y: yImageBgShape } : {};

    const isPinkBg = bgColor.includes("pink");

    return (
        <section 
            id={id} 
            className={`py-20 relative overflow-hidden md:overflow-x-hidden md:overflow-y-visible ${bgColor}`}
        >
            {/* Background Glow Orbs - pointer-events-none is crucial for scroll smoothness */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div 
                    style={orb1Style}
                    animate={{
                        x: [0, 30, -20, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`absolute top-10 left-[-5%] w-80 h-80 rounded-full blur-[90px] ${
                        isPinkBg ? "bg-primary/10" : "bg-tertiary/15"
                    }`}
                />
                <motion.div 
                    style={orb2Style}
                    animate={{
                        x: [0, -40, 10, 0],
                    }}
                    transition={{
                        duration: 24,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className={`absolute bottom-10 right-[-5%] w-96 h-96 rounded-full blur-[100px] ${
                        isPinkBg ? "bg-accent/10" : "bg-primary/10"
                    }`}
                />
            </div>

            <div className="container mx-auto px-4 max-w-5xl relative z-20">
                {image ? (
                    /* Layout with Image (e.g. About Arisa) - Side by Side Grid with overflowing Image */
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center text-left">
                        
                        {/* Visual Column */}
                        <div className="md:col-span-5 flex justify-center relative pointer-events-none">
                            {/* Scroll parallax layer (Only handles translation, pointer-events-none) */}
                            <motion.div 
                                style={imageBgStyle}
                                className="absolute inset-0 flex items-center justify-center z-0"
                            >
                                {/* Animated background shape layer (Only handles scale and rotation for performance) */}
                                <motion.div 
                                    animate={{
                                        scale: [1, 1.08, 0.95, 1],
                                        rotate: [0, 90, 180, 360]
                                    }}
                                    transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-56 h-56 rounded-3xl bg-gradient-to-tr from-primary/25 via-secondary/20 to-accent/25 opacity-70 blur-xl"
                                />
                            </motion.div>
                            
                            {/* Image Container with rotation, neon glow, and responsive margin (overflows only on desktop) */}
                            <motion.div 
                                whileHover={{ scale: 1.04, rotate: 1, y: -4 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="relative p-[3px] rounded-[2.5rem] bg-gradient-to-tr from-primary/60 via-secondary/40 to-accent/50 shadow-[0_20px_50px_rgba(255,110,180,0.22)] md:rotate-[-3deg] rotate-0 cursor-pointer z-45 md:-mb-40 mb-4 pointer-events-auto"
                            >
                                <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-[2.3rem] overflow-hidden border-4 border-white bg-white">
                                    <Image
                                        src={image}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Content Column with premium Glassmorphism plate */}
                        <div className="md:col-span-7 flex flex-col items-start pb-8 md:pb-0 z-30 pointer-events-auto">
                            <motion.div 
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="glass-panel p-6 md:p-10 rounded-[2.2rem] border border-white/60 shadow-[0_15px_35px_rgba(255,182,193,0.12)] w-full"
                            >
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 relative tracking-tight inline-block">
                                    {title}
                                    <span className="absolute -bottom-2 left-0 w-14 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                                </h2>
                                <p className="text-base md:text-lg text-text-sub leading-relaxed whitespace-pre-wrap mb-8 font-medium">
                                    {description}
                                </p>

                                <div className="flex flex-wrap gap-2.5">
                                    {tags && tags.map((tag: string, index: number) => (
                                        <motion.span 
                                            key={index} 
                                            whileHover={{ scale: 1.08, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                            className="px-5 py-2.5 bg-white text-primary border border-pink-100 rounded-full text-sm font-bold shadow-sm flex items-center gap-2 cursor-pointer hover:bg-pink-50/50 hover:border-pink-200 transition-colors"
                                        >
                                            <Heart size={14} className="text-primary fill-primary animate-pulse" />
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    /* Layout without Image (e.g. About Site) - Centered Premium Glass Panel */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="glass-panel p-8 md:p-14 rounded-[2rem] shadow-xl max-w-3xl mx-auto border border-white/50 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 relative inline-block tracking-tight">
                            {title}
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
                        </h2>
                        <p className="text-base md:text-lg text-text-sub leading-relaxed whitespace-pre-wrap font-medium">
                            {description}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
