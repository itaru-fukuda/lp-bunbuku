"use client";

import { motion } from "framer-motion";
import { User, Heart } from "lucide-react";
import Image from "next/image";

interface AboutProps {
    id: string;
    data: {
        title: string;
        image?: string;
        description: string;
        tags?: string[];
    };
    bgColor?: string;
}

export default function About({ id, data, bgColor = "bg-white" }: AboutProps) {
    const { title, image, description, tags } = data;

    return (
        <section id={id} className={`py-20 ${bgColor}`}>
            <div className="container mx-auto px-4 max-w-4xl relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {image && (
                        <div className="inline-block relative mb-6">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="rounded-full object-cover border-4 border-secondary/20 shadow-lg"
                                />
                            </div>
                        </div>
                    )}
                    <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-text-sub leading-relaxed whitespace-pre-wrap mb-10">
                        {description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {tags && tags.map((tag: string, index: number) => (
                            <span key={index} className="px-5 py-2 bg-pink-50 text-primary border border-pink-100 rounded-full text-base font-medium shadow-sm flex items-center gap-2">
                                <Heart size={14} className="text-primary" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
