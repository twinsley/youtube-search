import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('search-bar')
export class SearchBar extends LitElement {

    @property()
    value = '';

    render() {
        return html`<form>
        <div class="input-wrapper">
          <input
            type="text"
            placeholder="Search YouTube..."
            aria-label="Search"
          />
        </div>
        <button type="submit" class="search-btn" aria-label="Search">
        </button>
      </form>`;
    }
}