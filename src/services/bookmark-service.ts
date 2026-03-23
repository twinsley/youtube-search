import type { YouTubeSearchItem } from "../types/youtube.js";

const STORAGE_KEY = "yt-bookmarks";

export function itemKey(item: YouTubeSearchItem): string {
  return (
    item.id.videoId ?? item.id.channelId ?? item.id.playlistId ?? item.etag
  );
}

export function loadBookmarks(): YouTubeSearchItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as YouTubeSearchItem[]) : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(items: YouTubeSearchItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
