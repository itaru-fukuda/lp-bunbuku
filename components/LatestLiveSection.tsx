import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { getLatestLiveStreams } from "@/lib/youtube";
import content from "@/data/content.json";
import SectionTitle from "./SectionTitle";

const labels = { upcoming: "配信予定", live: "配信中", completed: "アーカイブ" };
const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "long", day: "numeric", weekday: "short", hour: "2-digit", minute: "2-digit",
});

export default async function LatestLiveSection() {
    const streams = await getLatestLiveStreams();
    return <section id="latest-live" aria-label="最新のライブ配信" className="relative bg-[#FFF9FC] px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
            <SectionTitle title="" subtitle="Latest Live" />
            {streams?.length ? <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {streams.map((stream) => <li key={stream.id} className="min-w-0">
                    <a href={`https://www.youtube.com/watch?v=${encodeURIComponent(stream.id)}`} target="_blank" rel="noopener noreferrer"
                        className="group block h-full rounded-2xl text-[#58364f] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#92446d]">
                        <div className={`relative aspect-video overflow-hidden rounded-2xl bg-[#f0e9fa] ${stream.status === "live" ? "ring-2 ring-[#c03470] ring-offset-4 ring-offset-[#FFF9FC] shadow-[0_8px_28px_rgba(192,52,112,0.22)]" : "shadow-[0_8px_28px_rgba(146,68,109,0.10)]"}`}>
                            {stream.thumbnail ? <Image src={stream.thumbnail} alt="" fill sizes="(max-width: 767px) calc(100vw - 40px), 496px" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
                                : <div className="flex h-full items-center justify-center"><Play size={40} aria-hidden="true" /></div>}
                            {stream.status === "live" && <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#ad245c] px-4 py-2 text-sm font-bold tracking-wide text-white shadow-[0_2px_12px_rgba(146,68,109,0.25)]">
                                <span aria-hidden="true" className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-white/60 motion-reduce:animate-none" /><span className="relative h-2 w-2 rounded-full bg-white" /></span>
                                LIVE<span className="h-3 border-l border-white/50" aria-hidden="true" />配信中
                            </span>}
                            <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fae8f1] text-[#92446d] shadow-sm transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"><ArrowUpRight size={22} aria-hidden="true" /></span>
                        </div>
                        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${stream.status === "live" ? "bg-[#92446d] text-white" : "bg-[#f2e4ef] text-[#79405f]"}`}>
                                {stream.status === "live" && <Play size={12} fill="currentColor" aria-hidden="true" />}{stream.status === "live" ? "今すぐ視聴する" : labels[stream.status]}
                            </span>
                            {stream.startsAt && Number.isFinite(Date.parse(stream.startsAt)) ? <time dateTime={stream.startsAt} className="text-[#674b5e]">{dateFormatter.format(new Date(stream.startsAt))}{stream.status === "upcoming" ? "〜 予定" : ""}<span className="sr-only">（日本時間）</span></time>
                                : stream.status === "upcoming" ? <span>開始日時はYouTubeでご確認ください</span> : null}
                        </div>
                        <h3 className="mt-3 break-words text-base font-bold leading-7 transition-colors group-hover:text-[#92446d]">{stream.title}</h3>
                        <span className="sr-only">（YouTubeを新しいタブで開きます）</span>
                    </a>
                </li>)}
            </ul> : <p className="text-center text-sm leading-7 text-[#674b5e]">{streams === null ? "配信情報を取得できませんでした。最新の配信はYouTubeでご確認ください。" : "現在、公開されている配信はありません。"}</p>}
            <div className="mt-10 text-center"><a href={content.links.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#92446d] underline underline-offset-4">YouTubeチャンネルへ<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">（新しいタブで開きます）</span></a></div>
        </div>
    </section>;
}
