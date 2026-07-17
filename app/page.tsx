import Hero from "@/components/Hero";
import About from "@/components/About";
import ProfileDetail from "@/components/ProfileDetail";
import QnASection from "@/components/QnASection";
import VideoSection from "@/components/VideoSection";
import Links from "@/components/Links";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

import { getDailyRecommendedVideos, getLatestCompletedLiveStreams, getYouTubeChannelStats } from "@/lib/youtube";
import fs from "fs";
import path from "path";
import ChannelStats from "@/components/ChannelStats";
import ExpressionMarquee from "@/components/ExpressionMarquee";
import FavoritesSection from "@/components/FavoritesSection";
import ScrollToTop from "@/components/ScrollToTop";
import SectionDivider from "@/components/SectionDivider";
import SectionReveal from "@/components/SectionReveal";

export const dynamic = "force-dynamic";

function shuffle<T>(items: T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export default async function Home() {
  const [latestVideos, dailyRecommendedVideos, channelStats] = await Promise.all([
    getLatestCompletedLiveStreams(),
    getDailyRecommendedVideos(),
    getYouTubeChannelStats(),
  ]);

  const expressionsDir = path.join(process.cwd(), "public/images/expressions");
  let expressionImages: string[] = [];

  try {
    if (fs.existsSync(expressionsDir)) {
      const files = fs.readdirSync(expressionsDir);
      expressionImages = files
        .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
        .map((file) => `/images/expressions/${file}`);

      expressionImages = shuffle(expressionImages);
    }
  } catch (error) {
    console.error("Failed to read expression images:", error);
  }

  const { latest, popular, songs, aboutSite, aboutArisa, expressionGallery } = content;

  const latestItems = latestVideos.map((v) => ({
    videoId: v.id,
    title: v.title,
    description: new Date(v.publishedAt).toLocaleDateString("ja-JP"),
  }));

  const popularItems = dailyRecommendedVideos.map((v) => ({
    videoId: v.id,
    title: v.title,
    description: new Date(v.publishedAt).toLocaleDateString("ja-JP"),
  }));

  return (
    <main className="min-h-screen font-sans selection:bg-primary/30">
      <Hero />
      <ChannelStats stats={channelStats} />
      <SectionDivider colorClass="text-[#FFF9FC]" />
      <SectionReveal>
        <About id="about" aboutArisa={aboutArisa} aboutSite={aboutSite} />
      </SectionReveal>
      <SectionReveal>
        <ProfileDetail />
      </SectionReveal>

      {expressionImages.length > 0 && (
        <SectionReveal>
          <ExpressionMarquee
            images={expressionImages}
            comicDecorations={expressionGallery.comicDecorations}
            title="表情ギャラリー"
            subtitle="Visual Gallery"
          />
        </SectionReveal>
      )}

      <SectionDivider colorClass="text-[#FFFDF7]" />
      <SectionReveal>
        <FavoritesSection />
      </SectionReveal>

      <SectionReveal>
        <QnASection />
      </SectionReveal>

      <SectionDivider colorClass="text-gray-50" />
      <SectionReveal>
        <VideoSection
          id="videos"
          title={latest.title}
          subtitle={latest.subtitle}
          items={latestItems}
          bgColor="bg-gray-50/90"
          color="accent"
        />
      </SectionReveal>

      <SectionReveal>
        <VideoSection
          title={popular.title}
          subtitle={popular.subtitle}
          items={popularItems}
          bgColor="bg-gray-50/90"
          color="primary"
        />
      </SectionReveal>

      <SectionReveal>
        <VideoSection
          title={songs.title}
          subtitle={songs.subtitle}
          items={songs.items}
          bgColor="bg-gray-50/90"
          color="tertiary"
        />
      </SectionReveal>

      <SectionDivider colorClass="text-white" />
      <SectionReveal>
        <Links />
      </SectionReveal>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
