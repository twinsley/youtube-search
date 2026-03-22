import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Task } from '@lit/task';
import type { YouTubeSearchItem, YouTubeSearchParams } from '../../types/youtube';
import { searchYouTube } from '../../services/youtube-service';
import { mockSearchYouTube } from '../../services/mock-youtube-service';
import '../../components/video-card.ts';

@customElement('result-page')
export class ResultPage extends LitElement {

    @property({ type: String })
    query = '';

    @property({ type: String })
    sort: YouTubeSearchParams['sortBy'] = 'relevance';

    @state()
    private _items: YouTubeSearchItem[] = [];

    @state()
    private _loadingMore = false;

    @state()
    private _nextPageToken = '';

    @state()
    private _totalResults = 0;

    @state()
    private _showFilters = false;

    private _searchCount = 0;

    connectedCallback() {
        super.connectedCallback();
        if (this.query === '') {
            this.query = new URLSearchParams(window.location.search).get('query') ?? '';
        }
        this.sort = (new URLSearchParams(window.location.search).get('sort') as YouTubeSearchParams['sortBy']) || 'relevance';
    }

    private _searchTask = new Task(this, {
        args: () =>
            [this.query, this.sort, this._searchCount] as const,
        task: async ([query, sort], { signal }) => {
            console.log('Searching for:', query, 'with sort:', sort);
            if (!query) return null;
            const response = await searchYouTube({
                query,
                sortBy: sort,
            });
            signal.throwIfAborted();
            this._items = response.items;
            this._nextPageToken = response.nextPageToken ?? '';
            this._totalResults = response.pageInfo.totalResults;
            return response;
        },
    });


    render() {
        return html`
        <search-bar .sort=${this.sort} .query=${this.query}></search-bar>
            <h1>Results</h1>
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
              ${err instanceof Error ? err.message : 'An unexpected error occurred.'}
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
                  <span style="font-size: 48px">🔍</span>
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
                        (item) =>
                            html`<video-card .item=${item}></video-card>`
                    )}
                </div>
              `,
        })}
    `;
    }
}