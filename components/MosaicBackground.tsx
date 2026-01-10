"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

// ... (MosaicBackground component remains same) ...


type BackgroundItem = {
    src: string;
    type: "square" | "landscape" | "portrait";
};

type MosaicTile = {
    id: string;
    sizeClass: string;
    images: BackgroundItem[]; // Subset of images for this tile
    currentImageIndex: number;
    interval: number;
};

type Props = {
    items: BackgroundItem[];
};

export default function MosaicBackground({ items }: Props) {
    const [tiles, setTiles] = useState<MosaicTile[]>([]);

    // Initialize tiles
    useEffect(() => {
        if (!items || items.length === 0) return;

        const COLS = 8;
        const ROWS = 6;
        const TOTAL_TILES = 40;

        const newTiles: MosaicTile[] = [];

        // Group images by type for easy access
        const landscapeImages = items.filter(i => i.type === "landscape");
        const portraitImages = items.filter(i => i.type === "portrait");
        const squareImages = items.filter(i => i.type === "square" || !i.type); // Fallback to square

        for (let i = 0; i < TOTAL_TILES; i++) {
            const rand = Math.random();
            let sizeClass = "col-span-1 row-span-1"; // Default 1x1 (Small Square)
            let targetImages = squareImages;

            // Determine Shape & Assign Matching Images
            if (rand > 0.85) {
                // Large Square (2x2)
                sizeClass = "col-span-2 row-span-2";
                targetImages = squareImages;
            } else if (rand > 0.60) {
                // Landscape (2x1)
                sizeClass = "col-span-2 row-span-1";
                targetImages = landscapeImages;
            } else if (rand > 0.35) {
                // Portrait (1x2)
                sizeClass = "col-span-1 row-span-2";
                targetImages = portraitImages;
            }

            // Fallback: If no images exist for the chosen shape, use ANY available images
            // and force the shape to be consistent with what we have? 
            // Or just display center-cropped. 
            // Let's fallback to "all items" if specific list is empty.
            if (targetImages.length === 0) {
                targetImages = items;
            }

            newTiles.push({
                id: `tile-${i}`,
                sizeClass,
                images: targetImages,
                currentImageIndex: Math.floor(Math.random() * targetImages.length),
                interval: 3000 + Math.random() * 5000,
            });
        }

        setTiles(newTiles);
    }, [items]);

    // Track current images for collision detection (using ref to avoid re-renders)
    const currentImagesRef = useRef<string[]>([]);

    // Function to pick a safe image
    const getSafeImage = (tileIndex: number, candidates: BackgroundItem[]) => {
        // Determine current columns based on window width (approximate)
        const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
        let cols = 3;
        if (width >= 1024) cols = 5;
        else if (width >= 768) cols = 4;

        // Identify neighbors indices
        const neighbors = [
            tileIndex - 1, // Left
            tileIndex + 1, // Right
            tileIndex - cols, // Top
            tileIndex + cols // Bottom
        ];

        // Gather forbidden image sources
        const forbiddenSrcs = new Set<string>();
        neighbors.forEach(nIndex => {
            if (currentImagesRef.current[nIndex]) {
                forbiddenSrcs.add(currentImagesRef.current[nIndex]);
            }
        });

        // Current image is also forbidden (we want to change)
        if (currentImagesRef.current[tileIndex]) {
            forbiddenSrcs.add(currentImagesRef.current[tileIndex]);
        }

        // Filter candidates
        // We only care about matching 'src'
        const validCandidates = candidates.filter(c => !forbiddenSrcs.has(c.src));

        // If we filtered everything out (rare but possible with few images), fallback to any different from current
        const finalPool = validCandidates.length > 0 ? validCandidates : candidates.filter(c => c.src !== currentImagesRef.current[tileIndex]);

        // Pick random
        const chosen = finalPool[Math.floor(Math.random() * finalPool.length)];

        // Update ref
        if (chosen) {
            currentImagesRef.current[tileIndex] = chosen.src;
        }

        return chosen;
    };

    return (
        <div className="absolute inset-0 overflow-hidden bg-pink-50/50">
            {/* Infinite Scrolling Container */}
            <div className="absolute inset-[-50%] w-[200%] h-[200%] opacity-60">
                <motion.div
                    className="w-full h-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 auto-rows-[150px] md:auto-rows-[200px]"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                        x: ["0%", "-10%"],
                        y: ["-10%", "0%"]
                    }}
                    transition={{
                        duration: 25,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "mirror"
                    }}
                    style={{
                        gridAutoFlow: "dense"
                    }}
                >
                    {tiles.map((tile, index) => (
                        <Tile
                            key={tile.id}
                            tile={tile}
                            index={index}
                            onRequestImage={getSafeImage}
                        />
                    ))}
                    {/* Duplicate tiles to fill extra space if needed, or generate more tiles above */}
                </motion.div>
            </div>

            {/* Overlay gradient to soften the edges and blend with content */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80 pointer-events-none" />
        </div>
    );
}

// Individual Tile Component
type TileProps = {
    tile: MosaicTile;
    index: number;
    onRequestImage: (index: number, candidates: BackgroundItem[]) => BackgroundItem;
};

function Tile({ tile, index, onRequestImage }: TileProps) {
    // Initial load
    const [currentImage, setCurrentImage] = useState<BackgroundItem | null>(null);

    // Initial setup
    useEffect(() => {
        // Pick initial image safely
        const img = onRequestImage(index, tile.images);
        setCurrentImage(img);
    }, []); // Run once on mount

    useEffect(() => {
        if (tile.images.length <= 1) return;

        const timer = setInterval(() => {
            const nextImg = onRequestImage(index, tile.images);
            setCurrentImage(nextImg);
        }, tile.interval);

        return () => clearInterval(timer);
    }, [tile.interval, tile.images, index, onRequestImage]);

    if (!currentImage) return null;

    return (
        <motion.div
            className={clsx(tile.sizeClass, "relative overflow-hidden rounded-lg shadow-sm bg-white/50")}
            layout={false}
        >
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={`${tile.id}-${currentImage.src}`} // Unique key for transition
                    src={currentImage.src}
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
