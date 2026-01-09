"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

// ... (MosaicBackground component remains same) ...


type MosaicTile = {
    id: string;
    sizeClass: string; // Tailwind classes for span (e.g., 'col-span-1 row-span-1')
    imageIndex: number;
    interval: number;
};

type Props = {
    images: string[];
};

export default function MosaicBackground({ images }: Props) {
    const [tiles, setTiles] = useState<MosaicTile[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize tiles
    useEffect(() => {
        if (!images || images.length === 0) return;

        // Create a large enough grid to cover standard screens with scrolling buffer
        const COLS = 8; // Number of columns
        const ROWS = 6; // Number of rows per "set", we might duplicate for looping
        const TOTAL_TILES = 40; // Total tiles to generate enough density

        const newTiles: MosaicTile[] = [];

        for (let i = 0; i < TOTAL_TILES; i++) {
            // Randomly determine size
            // 80% chance of 1x1, 20% chance of 2x2 (or varying shapes)
            const isLarge = Math.random() > 0.8;
            const sizeClass = isLarge
                ? "col-span-2 row-span-2"
                : "col-span-1 row-span-1";

            newTiles.push({
                id: `tile-${i}`,
                sizeClass,
                imageIndex: Math.floor(Math.random() * images.length),
                interval: 3000 + Math.random() * 5000, // Random update interval between 3s and 8s
            });
        }

        setTiles(newTiles);
    }, [images]);

    return (
        <div className="absolute inset-0 overflow-hidden bg-pink-50/50">
            {/* 
        Infinite Scrolling Container
        We render two sets of the same grid to allow for seamless looping if needed,
        or just a very large single grid moving slowly.
        For a reliable infinite loop with grid, simple CSS animation is often smoothest.
      */}
            <div className="absolute inset-[-50%] w-[200%] h-[200%] opacity-60">
                <motion.div
                    className="w-full h-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 auto-rows-[180px] md:auto-rows-[240px]"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                        x: ["-5%", "-15%"],
                        y: ["-15%", "-5%"]
                    }}
                    transition={{
                        duration: 25,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "mirror" // Ping-pong movement for simplicity to avoid hard reset jumps
                    }}
                    style={{
                        gridAutoFlow: "dense" // Important for packing varying sizes
                    }}
                >
                    {tiles.map((tile) => (
                        <Tile key={tile.id} tile={tile} images={images} />
                    ))}
                    {/* Duplicate tiles to fill extra space if needed, or generate more tiles above */}
                </motion.div>
            </div>

            {/* Overlay gradient to soften the edges and blend with content */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80 pointer-events-none" />
        </div>
    );
}

// Individual Tile Component to handle independent image cycling
function Tile({ tile, images }: { tile: MosaicTile; images: string[] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(tile.imageIndex);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            // Pick a random new image that is different from current
            let nextIndex = Math.floor(Math.random() * images.length);
            while (nextIndex === currentImageIndex && images.length > 1) {
                nextIndex = Math.floor(Math.random() * images.length);
            }
            setCurrentImageIndex(nextIndex);
        }, tile.interval);

        return () => clearInterval(timer);
    }, [tile.interval, images.length, currentImageIndex, images]);

    return (
        <motion.div
            className={clsx(tile.sizeClass, "relative overflow-hidden rounded-lg shadow-sm bg-white/50")}
            layout={false}
        >
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{ zIndex: 1 }}
                />
            </AnimatePresence>
        </motion.div>
    );
}
