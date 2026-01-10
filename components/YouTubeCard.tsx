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
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
            <div className="relative aspect-video bg-gray-200 group cursor-pointer" onClick={() => setIsPlaying(true)}>
                {!isPlaying ? (
                    <>
                        <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                            alt={title || "Video"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="text-white fill-white ml-1" size={32} />
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
            <div className="p-5 flex flex-col flex-grow">
                {title && (
                    <h3 className="font-bold text-lg text-text-main line-clamp-2 mb-2 leading-tight">
                        {title}
                    </h3>
                )}
                <p className="text-sm text-text-sub line-clamp-2 mb-2 flex-grow">
                    {description}
                </p>
                {note && <span className="text-xs text-secondary font-medium">{note}</span>}
            </div>
        </div>
    );
}

