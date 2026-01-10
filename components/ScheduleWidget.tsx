"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, X, Maximize2 } from "lucide-react";
import content from "@/data/content.json";
import Image from "next/image";

export default function ScheduleWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const schedule = content.global.schedule;

    if (!schedule || !schedule.videoId) return null;

    // Helper to extract Video ID
    const extractVideoId = (input: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = input.match(regExp);
        return (match && match[2].length === 11) ? match[2] : input;
    };

    const videoId = extractVideoId(schedule.videoId);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; // Use higher res for big view
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    return (
        <>
            {/* Toggle Button (Collapsed State) */}
            {/* Toggle Button (Collapsed State) */}
            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 left-6 z-[1000] bg-primary text-white px-4 py-4 md:px-6 md:py-3 rounded-full shadow-[0_0_15px_rgba(255,105,180,0.6)] border-4 border-white flex items-center gap-2 font-bold hover:bg-rose-500 transition-colors"
            >
                <CalendarDays size={28} />
                <span className="hidden md:inline text-lg">{schedule.title}</span>
            </motion.button>

            {/* Expanded Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)} // Close on background click
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent close on content click
                            className="bg-white rounded-2xl shadow-2xl p-2 max-w-4xl w-full relative overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-pink-50/50 rounded-t-xl mb-2">
                                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <CalendarDays className="text-primary" />
                                    {schedule.title}
                                </h3>
                                <div className="flex gap-2">
                                    <a
                                        href={videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-primary"
                                        title="YouTubeで見る"
                                    >
                                        <Maximize2 size={20} />
                                    </a>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-red-500"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Large Image Area */}
                            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-100 group">
                                <Image
                                    src={thumbnailUrl}
                                    alt="Weekly Schedule"
                                    fill
                                    className="object-contain"
                                />
                                {/* Overlay Link */}
                                <a
                                    href={videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
                                >
                                    <span className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        YouTubeで見る
                                    </span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
