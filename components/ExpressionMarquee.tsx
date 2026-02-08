"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ExpressionMarqueeProps {
    images: string[];
    /**
     * Speed of the auto-scroll. Higher usage number means faster scroll.
     * Default: 1
     */
    speed?: number;
}

export default function ExpressionMarquee({ images, speed = 1 }: ExpressionMarqueeProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Ensure enough images for seamless looping
    const MIN_IMAGES = 10;
    const marqueeImages = [...images];
    while (marqueeImages.length < MIN_IMAGES && marqueeImages.length > 0) {
        marqueeImages.push(...images);
    }

    // Embla Carousel setup with AutoScroll plugin
    // stopOnInteraction: false allows auto-scroll to resume after user drags
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
        AutoScroll({ playOnInit: true, stopOnInteraction: false, speed }),
    ]);

    const handleImageClick = useCallback((src: string) => {
        if (!emblaApi) return;
        setSelectedImage(src);
    }, [emblaApi]);

    return (
        <>
            <section className="py-12 bg-pink-50 overflow-hidden relative border-y border-pink-100 z-20">
                {/* Gradient masks for smooth fade edges */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-pink-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-pink-50 to-transparent z-10 pointer-events-none" />

                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex gap-8 px-4 backface-hidden touch-pan-y">
                        {marqueeImages.map((src, index) => (
                            <div
                                key={index}
                                className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white select-none cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => handleImageClick(src)}
                            >
                                <Image
                                    src={src}
                                    alt={`Expression ${index}`}
                                    fill
                                    className="object-cover pointer-events-none" // prevent image drag
                                    draggable={false}
                                />
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-[600px] max-h-[90vh] aspect-square w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-pink-300 transition-colors"
                            >
                                <X size={32} />
                            </button>
                            <img
                                src={selectedImage}
                                alt="Expanded expression"
                                className="w-full h-full object-contain rounded-lg shadow-2xl bg-white"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
