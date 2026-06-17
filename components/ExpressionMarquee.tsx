"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { useCallback, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import SectionTitle from "./SectionTitle";

interface ExpressionMarqueeProps {
    images: string[];
    /**
     * Speed of the auto-scroll. Higher usage number means faster scroll.
     * Default: 1
     */
    speed?: number;
    title?: string;
    subtitle?: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    scale: number;
    rotate: number;
    icon: string;
    color: string;
    delay: number;
}

export default function ExpressionMarquee({ images, speed = 1, title, subtitle }: ExpressionMarqueeProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [particles, setParticles] = useState<Particle[]>([]);

    // 3D Tilt and Glare State
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glareX, setGlareX] = useState(50);
    const [glareY, setGlareY] = useState(50);
    const [glareOpacity, setGlareOpacity] = useState(0);

    // Ensure enough images for seamless looping
    const MIN_IMAGES = 10;
    const marqueeImages = [...images];
    while (marqueeImages.length < MIN_IMAGES && marqueeImages.length > 0) {
        marqueeImages.push(...images);
    }

    // Embla Carousel setup with AutoScroll plugin
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
        AutoScroll({ playOnInit: true, stopOnInteraction: false, speed }),
    ]);

    const handleImageClick = useCallback((src: string) => {
        if (!emblaApi) return;
        setSelectedImage(src);

        // Generate burst particles on image selection
        const count = 28;
        const icons = ["🐾", "⭐", "❤️", "🫧", "✨", "💖"];
        const colors = [
            "text-pink-400", 
            "text-yellow-400", 
            "text-blue-400", 
            "text-purple-400", 
            "text-rose-400", 
            "text-amber-400",
            "text-teal-300"
        ];
        
        const newParticles = Array.from({ length: count }).map((_, i) => {
            const angle = (i * (360 / count) + Math.random() * 15) * (Math.PI / 180);
            const distance = 160 + Math.random() * 180;
            return {
                id: i,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0.6 + Math.random() * 0.8,
                rotate: Math.random() * 360,
                icon: icons[Math.floor(Math.random() * icons.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.08
            };
        });
        setParticles(newParticles);
    }, [emblaApi]);

    const handleCloseModal = useCallback(() => {
        setSelectedImage(null);
        setParticles([]);
        setRotateX(0);
        setRotateY(0);
        setGlareOpacity(0);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left - box.width / 2;
        const y = e.clientY - box.top - box.height / 2;
        
        // 3D Tilt max rotation (12 degrees)
        const factor = 12;
        const rx = -(y / (box.height / 2)) * factor;
        const ry = (x / (box.width / 2)) * factor;
        
        setRotateX(rx);
        setRotateY(ry);

        // Glare calculation
        const px = ((e.clientX - box.left) / box.width) * 100;
        const py = ((e.clientY - box.top) / box.height) * 100;
        setGlareX(px);
        setGlareY(py);
        setGlareOpacity(0.35);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlareOpacity(0);
    };

    return (
        <>
            <section className="py-12 bg-pink-50 overflow-hidden relative border-y border-pink-100 z-20">
                {title && (
                    <div className="container mx-auto px-4 relative z-30">
                        <SectionTitle title={title} subtitle={subtitle} color="tertiary" />
                    </div>
                )}
                {/* Gradient masks for smooth fade edges */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-pink-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-pink-50 to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex gap-8 px-4 backface-hidden touch-pan-y">
                        {marqueeImages.map((src, index) => (
                            <div
                                key={index}
                                className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 select-none cursor-pointer"
                                onClick={() => handleImageClick(src)}
                            >
                                <div className="absolute inset-0 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white transition-transform duration-300 hover:scale-105">
                                    <Image
                                        src={src}
                                        alt={`Expression ${index}`}
                                        fill
                                        className="object-cover pointer-events-none" // prevent image drag
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 cursor-pointer"
                        onClick={handleCloseModal}
                    >
                        {/* Particle Layer (behind the card) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                            {particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                                    animate={{ 
                                        x: p.x, 
                                        y: p.y, 
                                        opacity: 0, 
                                        scale: p.scale, 
                                        rotate: p.rotate 
                                    }}
                                    transition={{ 
                                        duration: 1.4, 
                                        ease: [0.1, 0.8, 0.3, 1], // easeOutExpo
                                        delay: p.delay 
                                    }}
                                    className={`absolute pointer-events-none text-3xl select-none filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)] ${p.color}`}
                                >
                                    {p.icon}
                                </motion.div>
                            ))}
                        </div>

                        {/* Polaroid Card Wrapper with Tilt style */}
                        <motion.div
                            initial={{ scale: 0.6, rotate: -12, opacity: 0 }}
                            animate={{ 
                                scale: 1, 
                                rotate: 0, 
                                opacity: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 280,
                                    damping: 18
                                }
                            }}
                            exit={{ scale: 0.6, rotate: 12, opacity: 0, transition: { duration: 0.25 } }}
                            className="relative max-w-[420px] w-full z-10 cursor-default"
                            onClick={(e) => e.stopPropagation()}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                                transition: rotateX === 0 && rotateY === 0 ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.05s ease-out"
                            }}
                        >
                            {/* Polaroid Card Body */}
                            <div className="bg-white p-4 pb-20 rounded-3xl shadow-[0_35px_80px_rgba(0,0,0,0.6)] border-4 border-white flex flex-col items-center relative select-none">
                                {/* Masking Tape decoration */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-36 h-10 bg-pink-300/75 backdrop-blur-[2px] shadow-sm -rotate-2 border-x-4 border-dashed border-white/30 pointer-events-none select-none z-20" />
                                
                                {/* Close button */}
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-30"
                                >
                                    <X size={18} strokeWidth={3} />
                                </button>
                                
                                {/* Image Container with inner shadow */}
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-pink-50/20 border border-gray-100 shadow-inner">
                                    <img
                                        src={selectedImage}
                                        alt="Expanded expression"
                                        className="w-full h-full object-cover pointer-events-none"
                                        draggable={false}
                                    />
                                    
                                    {/* 3D Glare (Shiny reflect overlay) */}
                                    <div 
                                        className="absolute inset-0 pointer-events-none mix-blend-overlay"
                                        style={{
                                            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`,
                                            opacity: glareOpacity,
                                            transition: "opacity 0.2s ease-out"
                                        }}
                                    />
                                    {/* Hologram subtle color layer */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-pink-500/5 via-transparent to-blue-500/5 mix-blend-color-burn" />
                                </div>

                                {/* Handwritten-style signature and doodles */}
                                <div className="absolute bottom-5 left-0 right-0 text-center font-mochiy text-2xl font-black text-gray-800 tracking-wider select-none flex items-center justify-center gap-1.5 opacity-90">
                                    <span className="text-pink-400 text-xl">🫧</span>
                                    <span>Bunbuku Arisa</span>
                                    <span className="text-pink-400 text-xl">🐾</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
