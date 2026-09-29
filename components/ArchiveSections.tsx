import content from "@/data/content.json";
import { getDailyRecommendedVideos, getLatestCompletedLiveStreams, type YouTubeVideo } from "@/lib/youtube";
import VideoSection from "./VideoSection";
import SectionReveal from "./SectionReveal";
import PlaylistSection from "./PlaylistSection";
import PageLink from "./PageLink";

function videoItems(videos: YouTubeVideo[]) {
  return videos.map((video) => ({ videoId: video.id, title: video.title, description: new Date(video.publishedAt).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" }) }));
}

export default async function ArchiveSections({ preview = false }: { preview?: boolean }) {
  const [latest, daily] = await Promise.all([getLatestCompletedLiveStreams(), preview ? getDailyRecommendedVideos() : Promise.resolve([])]);
  return <>
    <SectionReveal><VideoSection id="videos" title={content.latest.title} subtitle={content.latest.subtitle} items={videoItems(preview ? latest.slice(0, 3) : latest)} color="accent" bgColor="bg-gray-50/90" /></SectionReveal>
    {preview ? <SectionReveal><VideoSection id="daily" title={content.popular.title} subtitle={content.popular.subtitle} items={videoItems(preview ? daily.slice(0, 3) : daily)} bgColor="bg-gray-50/90" moreHref="/videos" /></SectionReveal> : <PlaylistSection />}
    {!preview && <div id="songs" className="relative bg-[#FFF9FC] px-5 py-12 text-center"><PageLink href="/songs">おすすめ歌ってみた</PageLink></div>}
  </>;
}
