const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    viewCount?: string;
}

/**
 * Fetch the 3 most recent uploaded videos (PlaylistItems)
 * Cost: 1 unit per call
 */
export async function getLatestVideos(): Promise<YouTubeVideo[]> {
    if (!API_KEY || !CHANNEL_ID) return [];

    try {
        // 1. Get "Uploads" playlist ID from channel details (usually UU...)
        // However, knowing the channel ID, we can just replace "UC" with "UU" for the uploads playlist
        const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU");

        const res = await fetch(
            `${BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=3&key=${API_KEY}`,
            { next: { revalidate: 86400 } } // Cache for 24 hours
        );

        if (!res.ok) throw new Error("Failed to fetch latest videos");

        const data = await res.json();
        return data.items.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
            publishedAt: item.snippet.publishedAt,
        }));
    } catch (error) {
        console.error("YouTube API Error (Latest):", error);
        return [];
    }
}

/**
 * Fetch top 3 most viewed videos from the last 90 days.
 * Cost: 100 units per call (Search API)
 */
export async function getPopularVideos(): Promise<YouTubeVideo[]> {
    if (!API_KEY || !CHANNEL_ID) return [];

    // 90 days ago in RFC 3339 format
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const publishedAfter = ninetyDaysAgo.toISOString();

    try {
        const res = await fetch(
            `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&order=viewCount&publishedAfter=${publishedAfter}&maxResults=3&type=video&key=${API_KEY}`,
            { next: { revalidate: 86400 } } // Cache for 24 hours (updates daily to save quota)
        );

        if (!res.ok) throw new Error("Failed to fetch popular videos");

        const data = await res.json();
        return data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
            publishedAt: item.snippet.publishedAt,
        }));
    } catch (error) {
        console.error("YouTube API Error (Popular):", error);
        return [];
    }
}
