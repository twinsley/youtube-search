import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Task } from "@lit/task";
import { searchYouTube } from "../../services/youtube-service";
import "../../components/video-card.ts";
import type {
  YouTubeSearchItem,
  YouTubeSearchParams,
} from "../../types/youtube";

@customElement("result-page")
export class ResultPage extends LitElement {
  static styles = [
    css`
      search-bar {
        margin: 0 auto;
        display: block;
        width: 100%;
        max-width: 640px;
      }
      .results-info {
        margin-bottom: 1rem;
        color: #fff;
        justify-content: center;
        display: flex;
        font-size: small;
        font-weight: lighter;
      }
      .results-list {
        width: 100%;
        justify-items: center;
        display: grid;

        gap: 1rem;
      }
      .load-more {
        display: flex;
        justify-content: center;
        padding: 24px 0;
      }

      .load-more-btn {
        padding: 10px 32px;
        border-radius: 20px;
        background: #444;
        color: #fff;
        font-size: 14px;
        border: 1px solid #555;
        transition: all 0.15s;
      }

      .load-more-btn:hover {
        background: #555;
      }

      .load-more-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: #333;
      }
    `,
  ];

  @property({ type: String })
  query = "";

  @property({ type: String })
  sort: YouTubeSearchParams["sortBy"] = "relevance";

  @state()
  private _items: YouTubeSearchItem[] = [];

  @state()
  private _loadingMore = false;

  @state()
  private _nextPageToken = "";

  @state()
  private _totalResults = 0;

  @state()
  private _showFilters = false;

  @state()
  private _searchCount = 0;

  connectedCallback() {
    super.connectedCallback();
    if (this.query === "") {
      this.query =
        new URLSearchParams(window.location.search).get("query") ?? "";
    }
    this.sort =
      (new URLSearchParams(window.location.search).get(
        "sort",
      ) as YouTubeSearchParams["sortBy"]) || "relevance";
  }

  private _searchTask = new Task(this, {
    args: () => [this.query, this.sort] as const,
    task: async ([query, sort], { signal }) => {
      console.log("Searching for:", query, "with sort:", sort);
      if (!query) return null;
      const response = await searchYouTube({
        query,
        sortBy: sort,
      });
      signal.throwIfAborted();
      this._items = response.items;
      this._nextPageToken = response.nextPageToken ?? "";
      this._totalResults = response.pageInfo.totalResults;
      return response;
    },
  });

  private async _loadMore() {
    if (!this._nextPageToken || this._loadingMore) return;
    this._loadingMore = true;
    try {
      const response = await searchYouTube({
        query: this.query,
        sortBy: this.sort,
        pageToken: this._nextPageToken,
      });
      this._items = [...this._items, ...response.items];
      this._nextPageToken = response.nextPageToken ?? "";
      this._totalResults = response.pageInfo.totalResults;
    } finally {
      this._loadingMore = false;
    }
  }

  render() {
    return html`
      <search-bar .sort=${this.sort} .query=${this.query}></search-bar>
      <hr />
      ${this._searchTask.render({
        initial: () => nothing,
        pending: () => html`
          <div class="loading">
            <div class="spinner"></div>
            <span>Searching...</span>
          </div>
        `,
        error: (err) => html`
          <div class="error">
            <p class="error-message">
              ${err instanceof Error
                ? err.message
                : "An unexpected error occurred."}
            </p>
            <button class="retry-btn" @click=${() => this._searchCount++}>
              Retry
            </button>
          </div>
        `,
        complete: (response) =>
          !response || this._items.length === 0
            ? html`
                <div class="no-results">
                  <p>No results found for "<strong>${this.query}</strong>"</p>
                  <p>Try different keywords or adjust your filters</p>
                </div>
              `
            : html`
                <div class="results-info">
                  About ${this._totalResults.toLocaleString()} results
                </div>
                <div class="results-list">
                  ${this._items.map(
                    (item) => html`<video-card .item=${item}></video-card>`,
                  )}
                </div>
                ${this._nextPageToken
                  ? html`
                      <div class="load-more">
                        <button
                          class="load-more-btn"
                          @click=${this._loadMore}
                          ?disabled=${this._loadingMore}
                        >
                          ${this._loadingMore
                            ? "Loading..."
                            : "Load more results"}
                        </button>
                      </div>
                    `
                  : nothing}
              `,
      })}
    `;
  }
}
