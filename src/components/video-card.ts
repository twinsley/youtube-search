import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { YouTubeSearchItem } from "../types/youtube";
import type { BookmarksContextData } from "../types/bookmark";
import { bookmarksContext } from "../contexts/bookmark-context";
import { consume } from "@lit/context";

@customElement("video-card")
export class VideoCard extends LitElement {
  static styles = [
    css`
      .video-card {
        display: flex;
        gap: 16px;
        padding: 12px 0;
        cursor: pointer;
        border-radius: 8px;
        transition: background 0.15s;
        max-width: 1200px;
        width: 700px;
        margin: 0 auto;
      }

      .video-card:hover {
        background: #444;
      }

      .thumbnail-wrapper {
        display: block;
        flex-shrink: 0;
        width: 360px;
        aspect-ratio: 16 / 9;
        border-radius: 8px;
        overflow: hidden;
        background: #222;
        text-decoration: none;
      }

      .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
        padding: 4px 8px 4px 0;
      }

      .title {
        font-size: 18px;
        font-weight: 500;
        line-height: 1.4;
        overflow: hidden;
        margin: 0;
      }

      .title a {
        color: #4dabf7;
        text-decoration: none;
      }

      .title a:hover {
        text-decoration: underline;
        color: #6bb6ff;
      }

      .comment-count {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        color: #ccc;
      }

      .comment-count svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
      }

      .description {
        font-size: 13px;
        color: #ccc;
        line-height: 1.4;
        overflow: hidden;
        margin-top: 4px;
      }

      .title-row {
        display: flex;
        align-items: flex-start;
        gap: 8px;
      }

      .title-row h3 {
        flex: 1;
      }
      .bookmark-btn {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: transparent;
        color: #ccc;
        transition: all 0.15s;
        padding: 0;
        border: 1px solid transparent;
      }

      .bookmark-btn:hover {
        background: #555;
        color: #fff;
        border-color: #555;
      }

      .bookmark-btn.active {
        color: #4dabf7;
        background: transparent;
      }

      .bookmark-btn svg {
        width: 22px;
        height: 22px;
        fill: currentColor;
      }

      @media (max-width: 720px) {
        .video-card {
          flex-direction: column;
          gap: 10px;
          width: 95vw;
        }

        .thumbnail-wrapper {
          width: 100%;
        }

        .info {
          padding: 0 8px;
        }

        .title {
          font-size: 15px;
        }
      }
    `,
  ];

  @property({ type: Object })
  item: YouTubeSearchItem | null = null;

  @consume({ context: bookmarksContext, subscribe: true })
  private _bookmarks!: BookmarksContextData;

  private _onToggleBookmark(e: Event) {
    e.stopPropagation();
    if (this.item) {
      this._bookmarks.toggle(this.item);
    }
  }

  render() {
    if (!this.item) {
      return html``;
    }

    const { title, description, commentCount } = this.item.snippet;
    const thumbnailUrl = this.item.snippet.thumbnails.medium.url;
    const videoId = this.item.id.videoId;
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(this.item);

    return html`
      <div class="video-card">
        <a
          class="thumbnail-wrapper"
          href=${youtubeUrl}
          target="_blank"
          rel="noopener"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <img
            class="thumbnail"
            src=${thumbnailUrl}
            alt=${title}
            loading="lazy"
          />
        </a>
        <div class="info">
          <div class="title-row">
            <h3 class="title">
              <a
                href=${youtubeUrl}
                target="_blank"
                rel="noopener"
                @click=${(e: Event) => e.stopPropagation()}
                >${title}</a
              >
            </h3>
            <button
              class="bookmark-btn ${this._bookmarks?.isBookmarked(this.item)
                ? "active"
                : ""}"
              @click=${this._onToggleBookmark}
              aria-label=${this._bookmarks?.isBookmarked(this.item)
                ? "Remove bookmark"
                : "Add bookmark"}
              title=${this._bookmarks?.isBookmarked(this.item)
                ? "Remove bookmark"
                : "Add bookmark"}
            >
              ${this._bookmarks?.isBookmarked(this.item)
                ? html`<svg viewBox="0 0 24 24">
                    <path
                      d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
                    />
                  </svg>`
                : html`<svg viewBox="0 0 24 24">
                    <path
                      d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
                    />
                  </svg>`}
            </button>
          </div>
          <p class="description">${description}</p>
          <span class="comment-count">
            <svg viewBox="0 0 24 24">
              <path
                d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
              />
            </svg>
            ${Number(commentCount).toLocaleString()} comments
          </span>
        </div>
      </div>
    `;
  }
}
