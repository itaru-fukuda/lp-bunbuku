import type { YouTubeChannelStats } from "@/lib/youtube";

interface ChannelStatsProps {
    stats: YouTubeChannelStats;
}

const formatter = new Intl.NumberFormat("en-US");

export default function ChannelStats({ stats }: ChannelStatsProps) {
    const items = [
        {
            label: "YouTube Subscribers",
            value: stats.subscriberCount,
        },
        {
            label: "Channel Videos",
            value: stats.videoCount,
        },
    ].filter((item) => item.value !== undefined);

    if (items.length === 0) return null;

    return (
        <section className="relative z-30 bg-gradient-to-b from-white/90 via-pink-50/80 to-pink-50/75 px-4 py-10 md:py-12">
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_12px_35px_rgba(36,19,13,0.06)] backdrop-blur-md sm:grid-cols-2">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="min-h-24 rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-pink-50/60 px-5 py-4 text-center"
                    >
                        <p className="font-poppins text-[10px] font-black uppercase tracking-[0.22em] text-primary/80">
                            {item.label}
                        </p>
                        <p className="mt-2 font-poppins text-3xl font-black tabular-nums text-dark">
                            {formatter.format(item.value as number)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
