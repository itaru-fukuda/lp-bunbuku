"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import content from "@/data/content.json";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

interface ProfileImage {
    src: string;
    label: string;
    icon?: string;
}

interface ProfileStat {
    label: string;
    value: string;
}

export default function ProfileDetail() {
    const { profileDetail } = content;
    const [currentIndex, setCurrentIndex] = useState(0);

    // Mounted check to prevent Hydration Mismatch with scroll transforms
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!profileDetail) return null;

    const images = profileDetail.images;

    // Background glow colors mapped to each outfit
    const outfitGlowColors = [
        "from-pink-300/40 to-rose-300/30",       // 通常衣装
        "from-amber-200/40 to-orange-300/30",    // 夏衣装
        "from-blue-200/40 to-teal-300/30",       // 冬衣装
        "from-purple-300/40 to-indigo-300/30",   // 1周年
        "from-red-300/40 to-pink-400/30",        // 2周年
        "from-yellow-600/20 to-amber-700/20"     // たぬき (本当の姿)
    ];

    // Scroll diagnostics for parallax (defined unconditionally)
    const { scrollY } = useScroll();

    // Background orb slow parallax movement linked to scroll
    const yOrb = useTransform(scrollY, [600, 2600], [-30, 90]);
    const orbStyle = isMounted ? { y: yOrb } : {};

    // Framer motion variants for staggered items in Profile Data
    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, x: 20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { type: "spring", stiffness: 120, damping: 14 }
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-pink-50 overflow-hidden md:overflow-x-hidden md:overflow-y-visible relative z-20">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                    {/* Visual Area (Left or Top) - Static Blended Image */}
                    <div className="relative min-h-[400px] md:min-h-[600px] h-auto w-full flex items-end justify-center group z-30">
                        
                        {/* Dynamic Background Glow Orb linked to the selected outfit with parallax */}
                        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={`glow-${currentIndex}`}
                                    initial={{ opacity: 0, scale: 0.7, rotate: -45 }}
                                    animate={{ opacity: 0.85, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.7, rotate: 45 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    style={orbStyle}
                                    className={`w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr ${outfitGlowColors[currentIndex % outfitGlowColors.length]} blur-[60px] pointer-events-none`}
                                />
                            </AnimatePresence>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full md:-mb-32 mb-0 z-40 pointer-events-none"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={images[currentIndex].src}
                                        alt={profileDetail.name}
                                        fill
                                        className="object-contain drop-shadow-2xl pointer-events-none"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Selected Outfit Label (Mobile Only) */}
                        <div className="absolute top-4 left-4 z-50 md:hidden pointer-events-none">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl border-2 border-primary/20 text-gray-800 font-bold text-sm flex items-center gap-2"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-primary/80 animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
                                {images[currentIndex].label}
                            </motion.div>
                        </div>

                        {/* Outfit Switcher - Icon Buttons with Hover Reveal (Top-Right) */}
                        <div className="absolute top-4 right-4 z-50 flex flex-col gap-4 items-end">
                            {images.map((img: ProfileImage, index: number) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    initial="collapsed"
                                    animate={currentIndex === index ? "expanded" : "collapsed"}
                                    whileHover="expanded"
                                    className={`relative flex items-center rounded-full shadow-lg transition-all flex-row-reverse group border max-w-[64px] md:max-w-none ${
                                        currentIndex === index
                                            ? "bg-white border-primary/30 shadow-primary/10"
                                            : "bg-white/60 hover:bg-white border-white/50"
                                    }`}
                                    style={{ height: "64px" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        variants={{
                                            collapsed: { width: "64px" },
                                            expanded: { width: "auto" }
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        className="flex items-center whitespace-nowrap h-full flex-row-reverse rounded-full max-w-[64px] md:max-w-none overflow-hidden"
                                    >
                                        {/* Icon Container */}
                                        <div className="w-[64px] h-[64px] flex items-center justify-center flex-shrink-0 relative">
                                            <div className={`relative w-[54px] h-[54px] rounded-full overflow-hidden border-2 transition-colors duration-300 ${
                                                currentIndex === index ? "border-primary" : "border-gray-200"
                                            } box-border shadow-sm`}>
                                                <Image
                                                    src={img.icon || img.src}
                                                    alt={`${profileDetail.name} - ${img.label}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Zoom Badge */}
                                            <div className="absolute -bottom-1 -right-1 z-10 flex items-center justify-center drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ZoomIn size={18} strokeWidth={3} className="text-primary" />
                                            </div>
                                        </div>

                                        {/* Text with reveal animation */}
                                        <motion.span
                                            variants={{
                                                collapsed: { opacity: 0, width: 0 },
                                                expanded: { opacity: 1, width: "auto" }
                                            }}
                                            className="font-bold text-gray-700 text-sm overflow-hidden hidden md:block"
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
                    <div className="flex flex-col justify-center relative z-30">
                        {/* Name Section */}
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-6 text-left"
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight leading-none mb-1 flex items-center gap-3">
                                {profileDetail.name}
                                <span className="text-xl px-3 py-1 rounded-full bg-pink-100 text-primary font-bold text-sm">たぬきVTuber</span>
                            </h2>
                            <p className="font-poppins text-xl tracking-[0.2em] text-primary font-bold opacity-80">
                                {profileDetail.enName}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="glass-panel p-8 rounded-[2rem] shadow-xl border border-white/50 flex-grow"
                        >
                            {/* Header */}
                            <div className="mb-6 border-b border-primary/20 pb-4">
                                <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3 tracking-wider">
                                    <span className="w-2.5 h-7 bg-gradient-to-b from-primary to-rose-400 rounded-full"></span>
                                    PROFILE DATA
                                </h3>
                            </div>

                            {/* Description */}
                            {profileDetail.description && (
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-8 font-medium">
                                    {profileDetail.description}
                                </p>
                            )}

                            {/* Stats Grid - 1 Column */}
                            <div className="grid grid-cols-1 gap-2.5">
                                {profileDetail.stats.map((item: ProfileStat, index: number) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="flex flex-col sm:flex-row border-b border-gray-100/50 py-3 last:border-0 hover:bg-pink-50/40 transition-colors px-3 rounded-xl"
                                    >
                                        <dt className="font-extrabold text-primary w-40 flex-shrink-0 flex items-center gap-2 mb-1 sm:mb-0">
                                            <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                                            {item.label}
                                        </dt>
                                        <dd className="text-gray-700 font-bold whitespace-pre-wrap pl-4 sm:pl-0 flex-grow">
                                            {item.value}
                                        </dd>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
