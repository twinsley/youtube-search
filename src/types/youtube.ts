export interface YouTubeSearchParams {
  query: string;
  sortBy: 'relevance' | 'date' | 'rating';
  pageToken?: string;
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: YouTubeThumbnail;
    medium: YouTubeThumbnail;
    high: YouTubeThumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  commentCount: string;
}

export interface YouTubeVideoId {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}


export interface YouTubeSearchItem {
  kind: string;
  etag: string;
  id: YouTubeVideoId;
  snippet: YouTubeVideoSnippet;
}

export interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchItem[];
}

export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface VideoStatisticsResponse {
  kind: string;
  etag: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    statistics: VideoStatistics;
  }[];
}