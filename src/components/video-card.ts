import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { YouTubeSearchItem } from "../types/youtube";

@customElement("video-card")
export class VideoCard extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      .video-card {
        display: flex;
        gap: 16px;
        padding: 12px 0;
        cursor: pointer;
        border-radius: 8px;
        transition: background 0.15s;
        max-width: 1200px;
        width: 50vw;
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

      @media (max-width: 720px) {
        .card {
          flex-direction: column;
          gap: 10px;
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

  private _youtubeUrl = `https://www.youtube.com/watch?v=${this.item?.id.videoId}`;

  render() {
    if (!this.item) {
      return html``;
    }

    const { title, description, commentCount } = this.item.snippet;
    const thumbnailUrl = this.item.snippet.thumbnails.medium.url;
    console.log(this.item);

    return html`
      <div class="video-card">
        <a
          class="thumbnail-wrapper"
          href=${this._youtubeUrl}
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
                href=${this._youtubeUrl}
                target="_blank"
                rel="noopener"
                @click=${(e: Event) => e.stopPropagation()}
                >${title}</a
              >
            </h3>
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
