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
        border: 1px solid #555;
        background: #333;
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
        color: #fff;

      }

    .search-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border-left:  1px solid #555;
        border-radius: 0 40px 40px 0;
        height: 44px;
        width: 64px;
        background: #444;
        color: #fff;
      }

    .search-icon {
        width: 24px;
        height: 24px;
      }
    .sort-buttons input[type="radio"] {
        display: none;
    }
    .sort-buttons label:focus {
        outline: 2px solid #4dabf7;
    }
    .sort-buttons input[type="radio"]:checked + label {
        background: #4dabf7;
        color: fff;
        border-color: #4dabf7;
    }
    .filter-group {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
        width: 100%;
        justify-content: center;
    }
    .filter-label {
        font-weight: bold;
        color: #fff;
    }
    .sort-buttons {
        display: flex;
        gap: 0.5rem;
        flex-direction: row;
        align-items: center;
        border-radius: 20px;
    }
    .sort-buttons label {
        display: inline-block;
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #444;
        color: #fff;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
        border-radius: 20px;
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
    private _onLabelKeydown(e: KeyboardEvent) {
        if (e.key === ' ') {
            e.preventDefault();
            const label = e.target as HTMLLabelElement;
            const input = label.previousElementSibling as HTMLInputElement;
            input.checked = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
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
        <button type="submit" class="search-btn" aria-label="Search">Search</button>
      </form>
    <div class="filter-group">
        <!-- <div class="filter-label">Sort By</div> -->
        <div class="sort-buttons">
            <input type="radio" id="relevance" name="sort" value="relevance" ?checked=${this.sort === 'relevance'} @change=${this._onSortChange} />
            <label for="relevance" tabindex="0" @keydown=${this._onLabelKeydown}>Relevance</label>
            <input type="radio" id="date" name="sort" value="date" ?checked=${this.sort === 'date'} @change=${this._onSortChange} />
            <label for="date" tabindex="0" @keydown=${this._onLabelKeydown}>Upload date</label>
            <input type="radio" id="rating" name="sort" value="rating" ?checked=${this.sort === 'rating'} @change=${this._onSortChange} />
            <label for="rating" tabindex="0" @keydown=${this._onLabelKeydown}>Rating</label>
        </div>
    </div>`;
    }
}