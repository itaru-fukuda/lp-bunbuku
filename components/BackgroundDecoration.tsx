"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    speed: number;
};

export default function BackgroundDecoration() {
    const [items, setItems] = useState<DecorationItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const decorations = content.global?.decorations || [];
        if (decorations.length === 0) return;

        // Generate random scattered items
        const itemCount = 15;
        const generatedItems: DecorationItem[] = [];

        for (let i = 0; i < itemCount; i++) {
            const randomSrc = decorations[Math.floor(Math.random() * decorations.length)];
            generatedItems.push({
                id: i,
                src: randomSrc,
                top: Math.random() * 100, // Percentage
                left: Math.random() * 90 + 5, // Keep it slightly away from viewport edges
                size: 30 + Math.random() * 50, // 30px to 80px
                rotation: Math.random() * 360,
                duration: 10 + Math.random() * 20, // 10s to 30s float duration
                delay: Math.random() * 5,
                speed: -0.2 + Math.random() * 0.4, // Speed ratio (-0.2 to +0.2) for parallax depth
            });
        }

        setItems(generatedItems);
    }, []);

    const { scrollY } = useScroll();

    if (items.length === 0) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {items.map((item) => (
                <FloatingDecoration 
                    key={item.id} 
                    item={item} 
                    scrollY={scrollY} 
                    isMounted={isMounted} 
                />
            ))}
        </div>
    );
}

function FloatingDecoration({ item, scrollY, isMounted }: { item: DecorationItem; scrollY: any; isMounted: boolean }) {
    // Hook declared unconditionally inside the sub-component (complies with React Rules of Hooks)
    const yOffset = useTransform(scrollY, [0, 5000], [0, 5000 * item.speed]);

    return (
        <motion.div
            className="absolute opacity-30 mix-blend-multiply"
            style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: item.size,
                height: item.size,
                y: isMounted ? yOffset : 0, // Prevent SSR/Hydration mismatch
            }}
            initial={{
                rotate: item.rotation,
            }}
            animate={{
                y: [0, -20, 0],
                rotate: [item.rotation, item.rotation + 15, item.rotation - 15, item.rotation]
            }}
            transition={{
                y: {
                    duration: item.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay
                },
                rotate: {
                    duration: item.duration * 1.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay
                }
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
    );
}
