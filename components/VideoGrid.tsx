"use client";

import { motion, useReducedMotion } from "framer-motion";
import YouTubeCard from "./YouTubeCard";

export interface VideoItem {
  videoId: string;
  title: string;
  description: string;
  note?: string;
}

export default function VideoGrid({ items }: { items: VideoItem[] }) {
  const reduceMotion = useReducedMotion();
  return <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:pb-12 lg:grid-cols-3">
    {items.map((item, index) => <div key={item.videoId} className={index % 3 === 1 ? "md:translate-y-6 lg:translate-y-10" : ""}>
      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ delay: (index % 3) * 0.06, duration: 0.4 }} className="h-full">
        <YouTubeCard {...item} />
      </motion.div>
    </div>)}
  </div>;
}
