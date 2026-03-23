import type { YouTubeSearchItem } from "../types/youtube.js";

export interface BookmarksContextData {
  items: YouTubeSearchItem[];
  isBookmarked(item: YouTubeSearchItem): boolean;
  toggle(item: YouTubeSearchItem): void;
  remove(item: YouTubeSearchItem): void;
  clearAll(): void;
}
