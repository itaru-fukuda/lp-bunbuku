"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import { MessageCircleQuestion } from "lucide-react";
import YouTubeCard from "./YouTubeCard";

export default function QnASection() {
    const { qna } = content;
    if (!qna) return null;

    return (
        <section className="py-20 bg-pink-50/30">
            <div className="container mx-auto px-4 max-w-5xl relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 text-primary font-bold text-lg mb-2">
                        <MessageCircleQuestion />
                        <span>{qna.title}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {qna.subtitle}
                    </h2>
                    {/* <p className="text-gray-600">{qna.description}</p> */}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <YouTubeCard
                        videoId={qna.videoId}
                        description={qna.description}
                    />
                </motion.div>
            </div>
        </section>
    );
}
