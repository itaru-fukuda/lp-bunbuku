"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface YouTubeCardProps {
    videoId: string;
    title?: string;
    description: string;
    note?: string;
}

export default function YouTubeCard({ videoId, title, description, note }: YouTubeCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const reduceMotion = useReducedMotion();

    return (
        <motion.div 
            whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-panel rounded-3xl shadow-[0_8px_30px_rgba(36,19,13,0.03)] hover:shadow-[0_20px_45px_rgba(255,110,180,0.14)] overflow-hidden transition-all duration-300 border border-white/80 hover:border-accent/40 flex flex-col h-full cursor-pointer relative"
        >
            {/* Subtle paper grid pattern inside card for Japanese Shoji look */}
            <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(to_right,#24130d_1px,transparent_1px),linear-gradient(to_bottom,#24130d_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="relative aspect-video bg-gray-200 group overflow-hidden">
                {!isPlaying ? (
                    <button
                        type="button"
                        className="absolute inset-0 h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                        onClick={() => setIsPlaying(true)}
                        aria-label={title ? `${title} を再生` : "動画を再生"}
                    >
                        <Image
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={title || "Video"}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                        {/* Red-tinted overlay on hover to reflect Arisa's theme */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors duration-300">
                            {/* Play Button like a Japanese Seal/Stamp */}
                            <div className="w-14 h-14 bg-gradient-to-tr from-red-600 to-rose-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative border-2 border-white/40">
                                <Play className="text-white fill-white ml-1" size={22} />
                                
                                {/* Pulse ring */}
                                <span className="absolute inset-0 rounded-full bg-primary/40 scale-100 opacity-0 group-hover:animate-ping group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        </div>
                    </button>
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
            
            <div className="p-6 flex flex-col flex-grow bg-white/45 relative z-10 border-t border-dark/5">
                {title && (
                    <h3 className="font-serif font-black text-base text-dark line-clamp-2 mb-2 leading-snug hover:text-primary transition-colors">
                        {title}
                    </h3>
                )}
                <p className="text-xs text-text-sub line-clamp-2 mb-4 flex-grow font-bold leading-relaxed">
                    {description}
                </p>
                {note && (
                    <span className="text-[9px] text-primary font-black bg-white border border-primary/20 px-3 py-1.5 rounded-full uppercase tracking-wider w-fit self-start shadow-sm">
                        {note}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
