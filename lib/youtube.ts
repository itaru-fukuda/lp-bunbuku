import "server-only";
import { selectLatestStreams, type LiveStream } from "./liveStreams";

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

/** Share cached discovery between TOP and VIDEOS to limit search API usage. */
async function searchStreams(eventType: LiveStream["status"]): Promise<YouTubeSearchItem[] | null> {
    if (!API_KEY || !CHANNEL_ID) return null;
    try {
        const params = new URLSearchParams({ part: "snippet", channelId: CHANNEL_ID,
            eventType, order: "date", type: "video", maxResults: "50", key: API_KEY });
        const response = await fetch(`${BASE_URL}/search?${params}`, {
            next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) throw new Error("Stream search failed");
        return ((await response.json()) as YouTubeSearchListResponse).items ?? [];
    } catch {
        console.error("YouTube API: unable to discover streams");
        return null;
    }
}

export async function getLatestCompletedLiveStreams(): Promise<YouTubeVideo[]> {
    return (await searchStreams("completed") ?? []).slice(0, 3).map(toVideo);
}

interface StreamDetailsResponse {
    items?: {
        id: string;
        snippet: YouTubeSearchItem["snippet"];
        liveStreamingDetails?: { scheduledStartTime?: string; actualStartTime?: string; actualEndTime?: string };
    }[];
}

/** Discover hourly; refresh known broadcasts' status and start times every five minutes. */
export async function getLatestLiveStreams(): Promise<LiveStream[] | null> {
    if (!API_KEY || !CHANNEL_ID) return null;
    const results = await Promise.all([searchStreams("upcoming"), searchStreams("live"), searchStreams("completed")]);
    const ids = [...new Set(results.flatMap((items) => (items ?? []).map((item) => item.id.videoId)))];
    if (!ids.length) return results.some((items) => items === null) ? null : [];
    try {
        const batches = [];
        for (let i = 0; i < ids.length; i += 50) batches.push(ids.slice(i, i + 50));
        const details = await Promise.all(batches.map(async (batch) => {
            const params = new URLSearchParams({ part: "snippet,liveStreamingDetails", id: batch.join(","), key: API_KEY });
            const response = await fetch(`${BASE_URL}/videos?${params}`, {
                next: { revalidate: 300 }, signal: AbortSignal.timeout(5000),
            });
            if (!response.ok) throw new Error("Stream details failed");
            return ((await response.json()) as StreamDetailsResponse).items ?? [];
        }));
        const streams: LiveStream[] = details.flat().flatMap((item) => {
            const live = item.liveStreamingDetails;
            if (!live) return [];
            const status = live.actualEndTime ? "completed" : item.snippet.liveBroadcastContent === "live" ? "live"
                : item.snippet.liveBroadcastContent === "upcoming" ? "upcoming" : null;
            if (!status) return [];
            return [{ id: item.id, title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || "",
                status, startsAt: status === "upcoming" ? live.scheduledStartTime : live.actualStartTime }];
        });
        return selectLatestStreams(streams);
    } catch {
        console.error("YouTube API: unable to load stream details");
        return null;
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

export interface YouTubePlaylist {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoCount: number;
}

interface YouTubePlaylistsResponse {
    nextPageToken?: string;
    items?: {
        id: string;
        snippet: {
            title: string;
            description: string;
            thumbnails?: { high?: { url: string }; medium?: { url: string }; default?: { url: string } };
        };
        contentDetails: { itemCount: number };
    }[];
}

/** Public playlists owned by the channel; each page is cached for one hour. */
export async function getChannelPlaylists(): Promise<YouTubePlaylist[] | null> {
    if (!API_KEY || !CHANNEL_ID) return null;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    try {
        const playlists: YouTubePlaylist[] = [];
        let pageToken: string | undefined;
        do {
            const params = new URLSearchParams({
                part: "snippet,contentDetails", channelId: CHANNEL_ID,
                maxResults: "50", key: API_KEY,
                ...(pageToken ? { pageToken } : {}),
            });
            const response = await fetch(`${BASE_URL}/playlists?${params}`, {
                next: { revalidate: 3600 }, signal: controller.signal,
            });
            if (!response.ok) throw new Error("Playlist request failed");
            const data = await response.json() as YouTubePlaylistsResponse;
            for (const item of data.items ?? []) {
                playlists.push({
                    id: item.id, title: item.snippet.title, description: item.snippet.description,
                    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || "",
                    videoCount: item.contentDetails.itemCount,
                });
            }
            pageToken = data.nextPageToken;
        } while (pageToken);
        return playlists;
    } catch {
        // Never log the request URL: it contains the server API key.
        console.error("YouTube API Error (Playlists): unable to load channel playlists");
        return null;
    } finally {
        clearTimeout(timeoutId);
    }
}
