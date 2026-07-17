"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import content from "@/data/content.json";
import Image from "next/image";
import { ZoomIn, Sparkles } from "lucide-react";
import SectionTitle from "./SectionTitle";

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
    const reduceMotion = useReducedMotion();

    // Mounted check to prevent Hydration Mismatch with scroll transforms
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const mountTimer = window.setTimeout(() => setIsMounted(true), 0);
        return () => window.clearTimeout(mountTimer);
    }, []);

    // Traditional style background glow colors mapped to each outfit
    const outfitGlowColors = [
        "from-primary/20 to-accent/15",          // 通常衣装
        "from-amber-400/20 to-orange-300/10",    // 夏衣装
        "from-blue-300/20 to-teal-300/10",       // 冬衣装
        "from-purple-400/20 to-rose-300/10",     // 1周年
        "from-red-400/20 to-accent/15",          // 2周年
        "from-accent/30 to-amber-700/15"         // たぬき (本当の姿)
    ];

    // Scroll diagnostics for parallax (defined unconditionally)
    const { scrollY } = useScroll();

    // Background orb slow parallax movement linked to scroll
    const yOrb = useTransform(scrollY, [600, 2600], [-50, 80]);
    const xText = useTransform(scrollY, [600, 2600], [-80, 80]);
    const orbStyle = isMounted ? { y: yOrb } : {};
    const textStyle = isMounted ? { x: xText } : {};

    if (!profileDetail) return null;

    const images = profileDetail.images;

    // Framer motion variants for staggered items in Profile Data
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 15 },
        visible: { 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 220, damping: 14 }
        }
    };

    return (
        <section id="profile" className="relative z-20 overflow-hidden bg-[rgba(255,249,252,0.90)] py-20 md:overflow-x-hidden md:overflow-y-visible md:py-24">
            {/* Parallax text underlay */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-start pt-16">
                <motion.div
                    style={textStyle}
                    className="text-[12vw] font-black text-primary/[0.015] uppercase tracking-widest whitespace-nowrap font-[family-name:var(--font-poppins)]"
                >
                    PROFILE • PROFILE • PROFILE •
                </motion.div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <SectionTitle
                    title="プロフィール"
                    subtitle="Profile"
                    color="primary"
                    className="mb-10 md:mb-14"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    {/* Mobile Title - show the profile name before the outfit image */}
                    <div className="lg:hidden relative z-30 border-b border-primary/20 pb-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-left"
                        >
                            <h2 className="text-4xl font-[family-name:var(--font-mochiy)] text-dark tracking-wide mb-2">
                                {profileDetail.name}
                            </h2>
                            <p className="font-poppins text-base tracking-[0.3em] text-primary font-black uppercase opacity-70">
                                {profileDetail.enName}
                            </p>
                        </motion.div>
                    </div>
                    
                    {/* Visual Area (Left or Top) - Switcher & Portrait with Parallax backdrop */}
                    <div className="lg:col-span-5 relative min-h-[500px] md:min-h-[650px] h-auto w-full flex items-end justify-center group z-30">
                        
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
                                    className={`w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr ${outfitGlowColors[currentIndex % outfitGlowColors.length]} blur-[80px] pointer-events-none`}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Character Stand Portrait (Crossfading) */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.96 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-[90%] md:h-full lg:-mb-16 mb-0 z-40 pointer-events-none"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={images[currentIndex].src}
                                        alt={profileDetail.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 500px"
                                        className="object-contain drop-shadow-[0_20px_40px_rgba(36,19,13,0.12)] pointer-events-none select-none"
                                        draggable={false}
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Selected Outfit Label (Mobile Only) */}
                        <div className="absolute top-4 left-4 z-50 lg:hidden pointer-events-none">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-md border border-primary/10 text-gray-800 font-bold text-sm flex items-center gap-2"
                            >
                                <span className="w-2.5 h-2.5 rounded-full bg-primary/80 animate-pulse" />
                                {images[currentIndex].label}
                            </motion.div>
                        </div>

                        {/* Outfit Switcher - Interactive Circle Icons */}
                        <div className="absolute top-4 right-4 z-50 flex flex-col gap-3 items-end">
                            {images.map((img: ProfileImage, index: number) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    initial="collapsed"
                                    animate={currentIndex === index ? "expanded" : "collapsed"}
                                    whileHover="expanded"
                                    className={`relative flex items-center rounded-full shadow-md transition-all flex-row-reverse group border max-w-[56px] lg:max-w-none ${
                                        currentIndex === index
                                            ? "bg-white border-primary/30 shadow-primary/5"
                                            : "bg-white/70 hover:bg-white border-white/40"
                                    }`}
                                    style={{ height: "56px" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        variants={{
                                            collapsed: { width: "56px" },
                                            expanded: { width: "auto" }
                                        }}
                                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                                        className="flex items-center whitespace-nowrap h-full flex-row-reverse rounded-full max-w-[56px] lg:max-w-none overflow-hidden"
                                    >
                                        {/* Icon Container */}
                                        <div className="w-[56px] h-[56px] flex items-center justify-center flex-shrink-0 relative">
                                            <div className={`relative w-[46px] h-[46px] rounded-full overflow-hidden border-2 transition-colors duration-300 ${
                                                currentIndex === index ? "border-primary" : "border-gray-200"
                                            } box-border shadow-sm`}>
                                                <Image
                                                    src={img.icon || img.src}
                                                    alt={`${profileDetail.name} - ${img.label}`}
                                                    fill
                                                    sizes="46px"
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Zoom Badge */}
                                            <div className="absolute -bottom-1 -right-1 z-10 flex items-center justify-center drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ZoomIn size={14} strokeWidth={3} className="text-primary" />
                                            </div>
                                        </div>

                                        {/* Text description */}
                                        <motion.span
                                            variants={{
                                                collapsed: { opacity: 0, width: 0 },
                                                expanded: { opacity: 1, width: "auto" }
                                            }}
                                            className="font-black text-text-main text-xs overflow-hidden hidden lg:block"
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

                    {/* Data Area (Right or Bottom) - Asymmetrical Magazine Style Stat Cards with vertical touch */}
                    <div className="lg:col-span-7 flex flex-col justify-center relative z-30">
                        {/* Title Section with vertical writing subtitle */}
                        <div className="hidden lg:flex justify-between items-end mb-10 border-b border-primary/20 pb-4">
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-left"
                            >
                                <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-mochiy)] text-dark tracking-wide mb-2">
                                    {profileDetail.name}
                                </h2>
                                <p className="font-poppins text-base tracking-[0.3em] text-primary font-black uppercase opacity-70">
                                    {profileDetail.enName}
                                </p>
                            </motion.div>
                            
                            <span className="writing-vertical font-serif text-[10px] text-accent tracking-[0.3em] font-black uppercase hidden sm:block">
                                Profile
                            </span>
                        </div>

                        {/* Stats Grid - Asymmetrical cards with fine gold borders like lacquerware */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 items-start"
                        >
                            {profileDetail.stats.map((item: ProfileStat, index: number) => {
                                const rotationDegrees = index % 3 === 0 ? "-1deg" : index % 3 === 1 ? "1.2deg" : "-0.8deg";
                                const isOdd = index % 2 !== 0;
                                return (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        style={{ rotate: isMounted ? rotationDegrees : "0deg" }}
                                        whileHover={reduceMotion ? undefined : { scale: 1.02, rotate: "0deg", zIndex: 10 }}
                                        className={`glass-panel p-5.5 rounded-2xl border-2 flex flex-col items-start gap-1.5 relative overflow-hidden transition-all duration-300 ${
                                            isOdd 
                                                ? "!bg-[#FFF8E8] border-amber-300/90 border-t-[3px] border-t-accent shadow-[0_10px_26px_rgba(229,168,35,0.10)] hover:border-accent hover:shadow-[0_14px_32px_rgba(229,168,35,0.16)]" 
                                                : "!bg-[#FFF1F7] border-pink-300/90 border-t-[3px] border-t-primary shadow-[0_10px_26px_rgba(255,110,180,0.10)] hover:border-primary hover:shadow-[0_14px_32px_rgba(255,110,180,0.16)]"
                                        }`}
                                    >
                                        {/* Tiny decoration icon (tanuki paw 🐾) */}
                                        <div className="absolute top-2.5 right-2.5 text-primary/8 select-none pointer-events-none text-xs">
                                            🐾
                                        </div>
                                        
                                        <dt className="font-serif font-black text-xs text-primary/90 tracking-widest uppercase flex items-center gap-1.5">
                                            <Sparkles size={9} className="text-accent animate-pulse" />
                                            {item.label}
                                        </dt>
                                        <dd className="text-dark font-bold text-[14px] leading-relaxed whitespace-pre-wrap">
                                            {item.value}
                                        </dd>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
