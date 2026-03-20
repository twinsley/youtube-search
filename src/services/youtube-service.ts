import type { VideoStatisticsResponse, YouTubeSearchParams, YouTubeSearchResponse } from '../types/youtube.ts';

function getApiKey(): string {
  return import.meta.env.YOUTUBE_API_KEY ?? '';
}
function getBaseUrl(): string {
  return import.meta.env.YOUTUBE_URL ?? '';
}


export async function searchYouTube(
  params: YouTubeSearchParams
): Promise<YouTubeSearchResponse> {
  const apiKey = getApiKey();
  const BASE_URL = getBaseUrl();
  if (!apiKey) {
    throw new Error('API Key is missing. Please set it.');
  }
  if (!BASE_URL) {
    throw new Error('Base URL is missing. Please set it.');
  }

  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', params.query);
  url.searchParams.set('maxResults', '12');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('type', 'video');

  if (params.pageToken) {
    url.searchParams.set('pageToken', params.pageToken);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error?.error?.message ?? `YouTube API error: ${response.status}`
    );
  }

  return response.json() as Promise<YouTubeSearchResponse>;
}

export async function getVideoStatistics(
  videoIds: string[]
): Promise<Map<string, string>> {
  const apiKey = getApiKey();
  const BASE_URL = getBaseUrl();
  if (!apiKey || !BASE_URL || videoIds.length === 0 ) return new Map();

  const url = new URL(`${BASE_URL}/videos`);
  url.searchParams.set('part', 'statistics');
  url.searchParams.set('id', videoIds.join(','));
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) return new Map();

  const data = (await response.json()) as VideoStatisticsResponse;
  const map = new Map<string, string>();
  for (const item of data.items) {
    map.set(item.id, item.statistics.commentCount ?? '0');
  }
  return map;
}