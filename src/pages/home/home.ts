import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../components/search.ts';
import '../../components/navbar.ts';

@customElement('home-page')
export class HomePage extends LitElement {

    render() {
        return html`
        <nav-bar><navbar></navbar></nav-bar>
            <h1>Search YouTube</h1>
            <search-bar></search-bar>
        `;
    }
}