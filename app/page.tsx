import Hero from "@/components/Hero";
import About from "@/components/About";
import SiteExplore from "@/components/SiteExplore";
import LatestLiveSection from "@/components/LatestLiveSection";
import ChannelStats from "@/components/ChannelStats";
import SectionDivider from "@/components/SectionDivider";
import SectionReveal from "@/components/SectionReveal";
import { getYouTubeChannelStats } from "@/lib/youtube";
import { pageMetadata } from "@/lib/site";
import content from "@/data/content.json";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata("/");

export default async function Home() {
  const stats = await getYouTubeChannelStats();
  return <main id="main-content" className="min-h-screen font-sans selection:bg-primary/30">
    <Hero />
    <ChannelStats stats={stats} />
    <SectionDivider colorClass="text-[#FFF9FC]" />
    <LatestLiveSection />
    <SectionReveal><About id="about" aboutArisa={content.aboutArisa} /></SectionReveal>
    <SiteExplore />
  </main>;
}
