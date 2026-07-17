const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCerNAq_y5avwJIV0arI5pCQ";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_REVALIDATE_SECONDS = 86400;

interface YouTubeChannelItem {
    statistics?: {
        subscriberCount?: string;
        videoCount?: string;
        hiddenSubscriberCount?: boolean;
    };
}

interface YouTubeChannelListResponse {
    items?: YouTubeChannelItem[];
}

interface YouTubeSearchListResponse {
    items?: YouTubeSearchItem[];
    nextPageToken?: string;
}

interface YouTubePlaylistItemsResponse {
    items?: YouTubePlaylistItem[];
}

export interface YouTubeChannelStats {
    subscriberCount?: number;
    videoCount?: number;
}

interface YouTubePlaylistItem {
    snippet: {
        title: string;
        publishedAt: string;
        resourceId: {
            videoId: string;
        };
        thumbnails: {
            high?: { url: string };
            medium?: { url: string };
        };
    };
}

interface YouTubeSearchItem {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        publishedAt: string;
        liveBroadcastContent?: string;
        thumbnails: {
            high?: { url: string };
            medium?: { url: string };
        };
    };
}

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    viewCount?: string;
}

function toVideo(item: YouTubeSearchItem): YouTubeVideo {
    return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || "",
        publishedAt: item.snippet.publishedAt,
    };
}

function playlistItemToVideo(item: YouTubePlaylistItem): YouTubeVideo {
    return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || "",
        publishedAt: item.snippet.publishedAt,
    };
}

function getJstDateKey(date = new Date()): string {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(date);

    const year = parts.find((part) => part.type === "year")?.value;
    const month = parts.find((part) => part.type === "month")?.value;
    const day = parts.find((part) => part.type === "day")?.value;

    return `${year}-${month}-${day}`;
}

function hashString(value: string): number {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
        hash ^= value.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
}

function shuffleWithSeed<T>(items: T[], seedText: string): T[] {
    let seed = hashString(seedText);
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {
        seed = Math.imul(seed ^ (seed >>> 15), 2246822507) >>> 0;
        const j = seed % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * Fetch the 3 most recent completed live streams.
 * Cost: 100 units per call (Search API)
 */
export async function getLatestCompletedLiveStreams(): Promise<YouTubeVideo[]> {
    if (!API_KEY || !CHANNEL_ID) return [];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5 seconds timeout

    try {
        const res = await fetch(
            `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&eventType=completed&order=date&type=video&maxResults=3&key=${API_KEY}`,
            { 
                next: { revalidate: 1800 },
                signal: controller.signal
            }
        );

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error("Failed to fetch latest videos");

        const data = (await res.json()) as YouTubeSearchListResponse;
        const items = data.items || [];
        return items.map(toVideo);
    } catch (error) {
        clearTimeout(timeoutId);
        console.error("YouTube API Error (Latest):", error);
        return [];
    }
}

/**
 * Fetch 3 daily recommended videos selected randomly with a JST date seed.
 * Cost: 1 unit per call (PlaylistItems API)
 */
export async function getDailyRecommendedVideos(): Promise<YouTubeVideo[]> {
    if (!API_KEY || !CHANNEL_ID) return [];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5 seconds timeout

    try {
        const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU");
        const res = await fetch(
            `${BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`,
            { 
                next: { revalidate: 3600 },
                signal: controller.signal
            }
        );

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error("Failed to fetch popular videos");

        const data = (await res.json()) as YouTubePlaylistItemsResponse;
        const items = data.items || [];
        const candidates = items.map(playlistItemToVideo);

        return shuffleWithSeed(candidates, getJstDateKey()).slice(0, 3);
    } catch (error) {
        clearTimeout(timeoutId);
        console.error("YouTube API Error (Popular):", error);
        return [];
    }
}

export async function getYouTubeChannelStats(): Promise<YouTubeChannelStats> {
    if (!API_KEY || !CHANNEL_ID) return {};

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const res = await fetch(
            `${BASE_URL}/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`,
            {
                next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
                signal: controller.signal,
            }
        );

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error("Failed to fetch channel statistics");

        const data = (await res.json()) as YouTubeChannelListResponse;
        const statistics = data.items?.[0]?.statistics;

        if (!statistics) return {};

        const subscriberCount = Number(statistics.subscriberCount);
        const videoCount = Number(statistics.videoCount);

        return {
            ...(!statistics.hiddenSubscriberCount && Number.isFinite(subscriberCount) ? { subscriberCount } : {}),
            ...(Number.isFinite(videoCount) ? { videoCount } : {}),
        };
    } catch (error) {
        clearTimeout(timeoutId);
        console.error("YouTube API Error (Channel Stats):", error);
        return {};
    }
}
