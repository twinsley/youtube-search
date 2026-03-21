import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

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
    `,
  ];

    @property()
    value = '';

    private _onInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
    }

    private _handleSubmit(event: Event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('search', {
        detail: { query: this.value },
        bubbles: true,
        composed: true
    }));
}

    render() {
        return html`<form @submit=${this._handleSubmit}>
        <div class="input-wrapper">
          <input
            type="text"
            placeholder="Search YouTube..."
                        @input=${this._onInput}
            aria-label="Search"
          />
        </div>
        <button type="submit" class="search-btn" aria-label="Search">
        </button>
      </form>`;
    }
}