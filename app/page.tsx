import Hero from "@/components/Hero";
import About from "@/components/About";
import ProfileDetail from "@/components/ProfileDetail";
import QnASection from "@/components/QnASection";
import VideoSection from "@/components/VideoSection";
import Links from "@/components/Links";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

import { getLatestVideos, getPopularVideos } from "@/lib/youtube";
import fs from "fs";
import path from "path";
import ExpressionMarquee from "@/components/ExpressionMarquee";

export default async function Home() {
  // Fetch data concurrently
  const [latestVideos, popularVideos] = await Promise.all([
    getLatestVideos(),
    getPopularVideos(),
  ]);

  // Read expression images dynamically
  const expressionsDir = path.join(process.cwd(), "public/images/expressions");
  let expressionImages: string[] = [];

  try {
    if (fs.existsSync(expressionsDir)) {
      const files = fs.readdirSync(expressionsDir);
      expressionImages = files
        .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file))
        .map((file) => `/images/expressions/${file}`);
    }
  } catch (error) {
    console.error("Failed to read expression images:", error);
  }

  const { latest, popular, songs } = content;

  // Transform YouTube data to UI format
  const latestItems = latestVideos.map((v) => ({
    videoId: v.id,
    title: v.title,
    description: new Date(v.publishedAt).toLocaleDateString("ja-JP"),
  }));

  const popularItems = popularVideos.slice(0, 3).map((v) => ({
    videoId: v.id,
    title: v.title,
    description: new Date(v.publishedAt).toLocaleDateString("ja-JP"),
  }));

  return (
    <main className="min-h-screen font-sans selection:bg-primary/30">
      <Hero />
      <About />
      <ProfileDetail />

      {/* Expression Gallery Marquee */}
      {expressionImages.length > 0 && (
        <ExpressionMarquee images={expressionImages} />
      )}

      <QnASection />

      {/* Latest Archives Section */}
      <VideoSection
        title={latest.title}
        subtitle={latest.subtitle}
        items={latestItems}
        bgColor="bg-gray-50"
        color="accent"
      />

      {/* Recommended (Popular) Videos Section */}
      <VideoSection
        title={popular.title}
        subtitle={popular.subtitle}
        items={popularItems}
        bgColor="bg-white"
        color="primary"
      />

      {/* Recommended Songs Section (Manual) */}
      <VideoSection
        title={songs.title}
        subtitle={songs.subtitle}
        items={songs.items}
        bgColor="bg-pink-50"
        color="tertiary"
      />


      <Links />
      <Footer />
    </main>
  );
}
