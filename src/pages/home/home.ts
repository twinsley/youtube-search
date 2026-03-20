import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../components/search.ts';

@customElement('home-page')
export class HomePage extends LitElement {

    render() {
        return html`
            <h1>Search YouTube</h1>
            <search-bar></search-bar>
        `;
    }
}