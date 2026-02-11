"use client";

import { motion, AnimatePresence } from "framer-motion";
import content from "@/data/content.json";
import Image from "next/image";
import { useState } from "react";
import { ZoomIn } from "lucide-react";

export default function ProfileDetail() {
    const { profileDetail } = content;
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!profileDetail) return null;

    const images = profileDetail.images;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-pink-50 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                    {/* Visual Area (Left or Top) - Static Blended Image */}
                    <div className="relative min-h-[600px] h-auto w-full flex items-end justify-center group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={images[currentIndex].src}
                                        alt={profileDetail.name}
                                        fill
                                        className="object-contain mix-blend-multiply drop-shadow-xl"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Outfit Switcher - Icon Buttons with Hover Reveal (Top-Right) */}
                        <div className="absolute top-4 right-4 z-20 flex flex-col gap-4 items-end">
                            {images.map((img: any, index: number) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    initial="collapsed"
                                    animate="collapsed"
                                    whileHover="expanded"
                                    className={`relative flex items-center rounded-full shadow-lg transition-all flex-row-reverse group ${currentIndex === index
                                        ? "bg-white/90"
                                        : "bg-white/40 hover:bg-white/80"
                                        }`}
                                    style={{ height: "64px" }}
                                >
                                    <motion.div
                                        variants={{
                                            collapsed: { width: "64px" },
                                            expanded: { width: "auto" }
                                        }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="flex items-center whitespace-nowrap h-full flex-row-reverse rounded-full"
                                    >
                                        {/* Icon Container - No overflow hidden here to allow badge to stick out */}
                                        <div className="w-[64px] h-[64px] flex items-center justify-center flex-shrink-0 relative">
                                            {/* Image Circle - Has overflow hidden */}
                                            <div className={`relative w-[56px] h-[56px] rounded-full overflow-hidden border-4 ${currentIndex === index ? "border-primary" : "border-white"
                                                } box-border shadow-sm flex items-center justify-center bg-gray-100`}>
                                                {img.icon === "SECRET" ? (
                                                    <span className="text-2xl font-bold text-gray-400">?</span>
                                                ) : (
                                                    <Image
                                                        src={img.icon || img.src}
                                                        alt={img.label}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>

                                            {/* Zoom Badge - Sticking out */}
                                            <div className="absolute -bottom-1 -right-1 z-10 flex items-center justify-center drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]">
                                                <ZoomIn size={22} strokeWidth={3} className="text-gray-900" />
                                            </div>
                                        </div>

                                        {/* Text with overflow hidden for reveal animation */}
                                        <motion.span
                                            variants={{
                                                collapsed: { opacity: 0, width: 0, marginLeft: 0 },
                                                expanded: { opacity: 1, width: "auto", marginLeft: 0 }
                                            }}
                                            className="font-bold text-gray-700 text-sm overflow-hidden"
                                        >
                                            <span className="block px-4 whitespace-nowrap">
                                                {img.label}
                                            </span>
                                        </motion.span>
                                    </motion.div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Data Area (Right or Bottom) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        {/* Name Section - Moved Here */}
                        <div className="mb-6 text-left">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight leading-none mb-1">
                                {profileDetail.name}
                            </h2>
                            <p className="font-poppins text-xl tracking-[0.2em] text-primary font-bold opacity-80">
                                {profileDetail.enName}
                            </p>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-pink-100 flex-grow">
                            {/* Header */}
                            <div className="mb-8 border-b-2 border-primary/20 pb-4">
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-primary rounded-full"></span>
                                    PROFILE DATA
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-8">
                                {profileDetail.description}
                            </p>

                            {/* Stats Grid - 1 Column */}
                            <div className="grid grid-cols-1 gap-4">
                                {profileDetail.stats.map((item: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row border-b border-gray-100 py-3 last:border-0 hover:bg-pink-50/50 transition-colors px-2 rounded-lg"
                                    >
                                        <dt className="font-bold text-primary w-40 flex-shrink-0 flex items-center gap-2 mb-1 sm:mb-0">
                                            <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                                            {item.label}
                                        </dt>
                                        <dd className="text-gray-700 font-medium whitespace-pre-wrap pl-4 sm:pl-0 flex-grow">
                                            {item.value}
                                        </dd>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
