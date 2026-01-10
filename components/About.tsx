"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { User, Heart } from "lucide-react";
import Image from "next/image";

export default function About() {
    const { about } = content;

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-block relative mb-6">
                        {about.image ? (
                            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                                <Image
                                    src={about.image}
                                    alt={about.title}
                                    fill
                                    className="rounded-full object-cover border-4 border-secondary/20 shadow-lg"
                                />
                            </div>
                        ) : (
                            <div className="inline-flex items-center justify-center p-6 bg-secondary/20 text-primary rounded-full w-32 h-32">
                                <User size={48} />
                            </div>
                        )}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8">
                        {about.title}
                    </h2>
                    <p className="text-lg md:text-xl text-text-sub leading-relaxed whitespace-pre-wrap mb-10">
                        {about.description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {about.tags && about.tags.map((tag: string, index: number) => (
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
