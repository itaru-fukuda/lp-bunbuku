"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface YouTubeCardProps {
    videoId: string;
    title?: string;
    description: string;
    note?: string;
}

export default function YouTubeCard({ videoId, title, description, note }: YouTubeCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-[0_15px_35px_rgba(255,110,180,0.15)] overflow-hidden transition-shadow border border-pink-100/40 hover:border-primary/30 flex flex-col h-full cursor-pointer relative"
        >
            <div className="relative aspect-video bg-gray-200 group overflow-hidden" onClick={() => setIsPlaying(true)}>
                {!isPlaying ? (
                    <>
                        <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={title || "Video"}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors duration-300">
                            <div className="w-16 h-16 bg-gradient-to-tr from-red-600 to-rose-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                                <Play className="text-white fill-white ml-1" size={28} />
                                
                                {/* Bouncing/pulsing radar ring when hovered */}
                                <span className="absolute inset-0 rounded-full bg-red-500/50 scale-100 opacity-0 group-hover:animate-ping group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        </div>
                    </>
                ) : (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={title || "Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-pink-50/10">
                {title && (
                    <h3 className="font-extrabold text-base md:text-lg text-text-main line-clamp-2 mb-2 leading-snug group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                )}
                <p className="text-xs md:text-sm text-text-sub line-clamp-2 mb-3 flex-grow font-medium leading-relaxed">
                    {description}
                </p>
                {note && (
                    <span className="text-xs text-primary font-bold bg-pink-50/80 border border-pink-100/60 px-2.5 py-1 rounded-md w-fit self-start">
                        {note}
                    </span>
                )}
            </div>
        </motion.div>
    );
}

