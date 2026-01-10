"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import content from "@/data/content.json";
import Image from "next/image";

type DecorationItem = {
    id: number;
    src: string;
    top: number;
    left: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
};

export default function BackgroundDecoration() {
    const { global } = content;
    const decorations = global?.decorations || [];
    const [items, setItems] = useState<DecorationItem[]>([]);

    useEffect(() => {
        if (!decorations || decorations.length === 0) return;

        // Generate random scattered items
        // We'll create a fixed number of items (e.g., 15) distributed across the page
        const itemCount = 15;
        const generatedItems: DecorationItem[] = [];

        for (let i = 0; i < itemCount; i++) {
            const randomSrc = decorations[Math.floor(Math.random() * decorations.length)];
            generatedItems.push({
                id: i,
                src: randomSrc,
                top: Math.random() * 100, // Percentage
                left: Math.random() * 100, // Percentage
                size: 30 + Math.random() * 50, // 30px to 80px
                rotation: Math.random() * 360,
                duration: 10 + Math.random() * 20, // 10s to 30s float duration
                delay: Math.random() * 5,
            });
        }

        setItems(generatedItems);
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute opacity-30 mix-blend-multiply"
                    style={{
                        top: `${item.top}%`,
                        left: `${item.left}%`,
                        width: item.size,
                        height: item.size,
                    }}
                    initial={{
                        rotate: item.rotation,
                        y: 0
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [item.rotation, item.rotation + 10, item.rotation - 10, item.rotation]
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay
                    }}
                >
                    <Image
                        src={item.src}
                        alt="Decoration"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                    />
                </motion.div>
            ))}
        </div>
    );
}
