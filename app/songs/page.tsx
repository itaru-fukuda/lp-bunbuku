import Link from "next/link";
import VideoGrid from "@/components/VideoGrid";
import PageLink from "@/components/PageLink";
import content from "@/data/content.json";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/songs");

export default function SongsPage() {
  return <main id="main-content" className="relative bg-[#FFF9FC] px-5 pb-16 pt-28 text-[#58364f] md:pt-32">
    <div className="mx-auto max-w-6xl">
      <header className="mb-10 md:mb-14">
        <nav aria-label="パンくず" className="mb-6 flex flex-wrap gap-3 text-xs text-[#795d70]">
          <Link href="/" className="underline underline-offset-4">TOP</Link><span aria-hidden="true">/</span><span aria-current="page">おすすめ歌ってみた</span>
        </nav>
        <h1 className="text-2xl font-bold leading-relaxed md:text-4xl">おすすめ歌ってみた</h1>
      </header>
      <VideoGrid items={content.songs.items} />
      <div className="mt-12 text-center"><PageLink href="/videos">動画・配信</PageLink></div>
    </div>
  </main>;
}
