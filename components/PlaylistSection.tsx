import Image from "next/image";
import { ExternalLink, ListVideo } from "lucide-react";
import { getChannelPlaylists } from "@/lib/youtube";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";
import SectionReveal from "./SectionReveal";

export default async function PlaylistSection() {
    const playlists = await getChannelPlaylists();
    return <section id="playlists" className="relative z-20 overflow-hidden bg-pink-50/90 py-16 md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#82415f_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative mx-auto max-w-6xl px-4">
            <SectionTitle title="Channel Playlists" subtitle="チャンネルのプレイリスト" />
            <p className="mx-auto -mt-6 mb-10 max-w-xl text-center text-sm leading-7 text-text-sub">気になるシリーズを、まとめて楽しもう。<br />ありさちゃんのチャンネルで公開されているプレイリストです。</p>
            {playlists?.length ? <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {playlists.map((playlist) => <li key={playlist.id} className="min-w-0">
                    <SectionReveal className="h-full">
                        <a href={`https://www.youtube.com/playlist?list=${encodeURIComponent(playlist.id)}`} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
                            <div className="relative aspect-video overflow-hidden bg-pink-100/50">
                                {playlist.thumbnail ? <Image src={playlist.thumbnail} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 384px" className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none" /> : <div className="flex h-full items-center justify-center"><ListVideo aria-hidden="true" size={48} className="text-[#82415f]" /></div>}
                                <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-[#4B3045]/90 px-3 py-1.5 text-xs font-bold text-white"><ListVideo size={16} aria-hidden="true" />{playlist.videoCount.toLocaleString("ja-JP")}本の動画</span>
                            </div>
                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <h3 className="break-words text-base font-bold leading-relaxed text-dark">{playlist.title}</h3>
                                {playlist.description && <p className="line-clamp-2 break-words text-xs leading-6 text-text-sub">{playlist.description}</p>}
                                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-xs font-bold text-[#82415f]">YouTubeで見る<span className="sr-only">（新しいタブで開きます）</span><ExternalLink size={14} aria-hidden="true" /></span>
                            </div>
                        </a>
                    </SectionReveal>
                </li>)}
            </ul> : <p className="py-6 text-center text-sm leading-8 text-text-sub">{playlists === null ? "現在、プレイリストを取得できません。時間をおいて再度お試しください。" : "現在、公開されているプレイリストはありません。"}</p>}
            <div className="mt-10 text-center"><a href={content.links.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#82415f] underline underline-offset-4">YouTubeチャンネルを見る<ExternalLink size={14} aria-hidden="true" /></a></div>
        </div>
    </section>;
}
