import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('result-page')
export class ResultPage extends LitElement {
    render() {
        return html`
            <h1>Results</h1>
            <video-sort></video-sort>
            <video-list></video-list>
        `;
    }
}