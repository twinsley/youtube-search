import { LitElement, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { consume } from "@lit/context";
import { bookmarksContext } from "../../contexts/bookmark-context.ts";
import "../../components/video-card.ts";
import type { BookmarksContextData } from "../../types/bookmark.ts";

@customElement("bookmark-page")
export class BookmarkPage extends LitElement {
  static styles = [
    css`
      .header {
        display: flex;
        align-items: center;
        gap: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #555;
      }

      h1 {
        font-size: 22px;
        font-weight: 500;
        margin: 0;
        flex: 1;
      }

      .bookmark-count {
        font-size: 14px;
        color: #ccc;
        font-weight: 400;
      }

      .clear-all-btn {
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 13px;
        background: transparent;
        color: #ccc;
        border: 1px solid #555;
        transition: all 0.15s;
        white-space: nowrap;
      }

      .clear-all-btn:hover {
        background: #c62828;
        color: white;
        border-color: #c62828;
      }

      .results-list {
        display: flex;
        flex-direction: column;
      }

      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 100px 20px;
        gap: 16px;
        color: #ccc;
        text-align: center;
      }

      .empty-icon {
        font-size: 56px;
      }

      .empty p {
        font-size: 15px;
        line-height: 1.5;
        max-width: 360px;
      }

      .card-wrapper {
        position: relative;
      }

      .card-wrapper:hover .card-remove {
        opacity: 1;
      }
    `,
  ];

  @consume({ context: bookmarksContext, subscribe: true })
  private _bookmarks!: BookmarksContextData;

  private _onClearAll() {
    this._bookmarks.clearAll();
  }

  override render() {
    return html`
      <div class="header">
        <h1>
          Bookmarks
          ${this._bookmarks?.items.length > 0
            ? html`<span class="bookmark-count"
                >(${this._bookmarks.items.length})</span
              >`
            : nothing}
        </h1>
        ${this._bookmarks?.items.length > 0
          ? html`
              <button class="clear-all-btn" @click=${this._onClearAll}>
                Clear all
              </button>
            `
          : nothing}
      </div>

      ${!this._bookmarks?.items.length
        ? html`
            <div class="empty">
              <p>
                You haven't bookmarked any videos yet. Click the bookmark icon
                on any video to save it here.
              </p>
            </div>
          `
        : html`
            <div class="results-list">
              ${this._bookmarks.items.map(
                (item) => html`
                  <div class="card-wrapper">
                    <video-card .item=${item}></video-card>
                  </div>
                `,
              )}
            </div>
          `}
    `;
  }
}
