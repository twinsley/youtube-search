import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Router } from '@lit-labs/router';
import './pages/home/home.ts';
import './pages/result/result.ts';
import './components/navbar.ts';

@customElement('lit-app')
export class LitApp extends LitElement {
    private _router = new Router(this, [
        {
            path: '/results',
            render: () => html`<result-page .query=${this._query}></result-page>`
        },
        {
            path: '/',
            render: () => {
                return html`<home-page></home-page>`;
            }
        }
    ]);

    @state()
    private _query = '';

    private _onSearch(e: CustomEvent) {
        this._query = e.detail.query;
        history.pushState(null, "", "/results?" + new URLSearchParams({query: this._query}));
        this._router.goto('/results');
    }


    render() {
        return html`
      <nav-bar></nav-bar>
      <main @search="${this._onSearch}">${this._router.outlet()}</main>
    `;
    }
};