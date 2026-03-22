import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { YouTubeSearchParams } from '../types/youtube';

@customElement('search-bar')
export class SearchBar extends LitElement {
    static override styles = [
        css`
    :host {
        display: block;
        width: 100%;
        max-width: 640px;
      }

    form {
        display: flex;
        align-items: center;
        width: 100%;
      }

    .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        border-radius: 40px 0 0 40px;
        padding: 0 16px;
        height: 44px;
        transition: border-color 0.2s;
        border: 1px solid;
      }

    input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-size: 16px;
        font-family: inherit;
        padding: 0;
        height: 100%;
      }

    .search-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: none;
        border-radius: 0 40px 40px 0;
        height: 44px;
        width: 64px;
      }

    .search-icon {
        width: 24px;
        height: 24px;
      }
    .sort-buttons input[type="radio"] {
        display: none;
    }
    .sort-buttons label {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        transition: background 0.2s;
    }
    .sort-buttons input[type="radio"]:checked + label {
        background: #007bff;
        color: white;
        border-color: #007bff;
    }
        .filter-group {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
    }
    .filter-label {
        font-weight: bold;
    }
    .sort-buttons {
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        align-items: center;
    }
    .sort-buttons label {
        display: inline-block;
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: white;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
    }
    `,
    ];

    @state()
    sort: YouTubeSearchParams['sortBy'] = 'relevance';
    @property()
    query = '';

    private _onInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.query = input.value;
    }

    private _handleSubmit(event: Event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('search', {
            detail: { query: this.query, sort: this.sort },
            bubbles: true,
            composed: true
        }));
    }
    private _onSortChange(e: Event) {
        const select = e.target as HTMLSelectElement;
        const { name, value } = select;
        (this as any)[name] = value;
        this.sort = select.value as YouTubeSearchParams['sortBy'];
        console.log('Sort changed to:', this.sort);
        if (this.query) {
            this.dispatchEvent(new CustomEvent('search', {
                detail: { query: this.query, sort: this.sort },
                bubbles: true,
                composed: true
            }));
        }
    }

    render() {
        return html`<form @submit=${this._handleSubmit}>
        <div class="input-wrapper">
          <input
            type="text"
            placeholder="Search YouTube..."
                        @input=${this._onInput}
                        .value=${this.query}
            aria-label="Search"
          />
        </div>
        <button type="submit" class="search-btn" aria-label="Search"></button>

        
      </form>
              <div class="filter-group">
          <div class="filter-label">Sort By</div>
            <div class="sort-buttons">
                <input type="radio" id="relevance" name="sort" value="relevance" ?checked=${this.sort === 'relevance'} @change=${this._onSortChange} />
                <label for="relevance">Relevance</label>
                <input type="radio" id="date" name="sort" value="date" ?checked=${this.sort === 'date'} @change=${this._onSortChange} />
                <label for="date">Upload date</label>
                <input type="radio" id="rating" name="sort" value="rating" ?checked=${this.sort === 'rating'} @change=${this._onSortChange} />
                <label for="rating">Rating</label>
            </div>
    </div>`;
    }
}