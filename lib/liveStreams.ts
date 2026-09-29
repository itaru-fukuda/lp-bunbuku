export interface LiveStream {
    id: string;
    title: string;
    thumbnail: string;
    status: "upcoming" | "live" | "completed";
    startsAt?: string;
}

export function selectLatestStreams(streams: LiveStream[], limit = 2): LiveStream[] {
    const priority = { upcoming: 0, live: 1, completed: 2 };
    const timestamp = (value?: string) => value && Number.isFinite(Date.parse(value)) ? Date.parse(value) : null;
    return [...new Map(streams.map((stream) => [stream.id, stream])).values()]
        .filter((stream) => !stream.title.normalize("NFKC").includes("フリーチャット"))
        .sort((a, b) => {
            const rank = priority[a.status] - priority[b.status];
            if (rank) return rank;
            const first = timestamp(a.startsAt);
            const second = timestamp(b.startsAt);
            if (first === null) return second === null ? a.id.localeCompare(b.id) : 1;
            if (second === null) return -1;
            return a.status === "upcoming" ? first - second : second - first;
        }).slice(0, limit);
}
