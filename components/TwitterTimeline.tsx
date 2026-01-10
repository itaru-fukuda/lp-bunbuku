"use client";

import { useEffect } from "react";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";

export default function TwitterTimeline() {
    const { links } = content;

    useEffect(() => {
        // Helper to load/reload widgets
        const loadWidgets = () => {
            // @ts-ignore
            if (window.twttr && window.twttr.widgets) {
                // @ts-ignore
                window.twttr.widgets.load();
            }
        };

        // Check if script already exists
        const scriptId = "twitter-wjs";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.onload = loadWidgets;
            document.body.appendChild(script);
        } else {
            loadWidgets();
        }
    }, []);

    if (!links.twitterId) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-2xl text-center">
                <SectionTitle title="Latest Posts" subtitle="最新の投稿" color="tertiary" />

                <div className="shadow-xl rounded-xl overflow-hidden border border-gray-100">
                    <a
                        className="twitter-timeline"
                        data-height="600"
                        data-theme="light"
                        href={`https://twitter.com/${links.twitterId}?ref_src=twsrc%5Etfw`}
                    >
                        Tweets by {links.twitterId}
                    </a>
                </div>
            </div>
        </section>
    );
}
