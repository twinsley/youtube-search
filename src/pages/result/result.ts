import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('result-page')
export class ResultPage extends LitElement {
    //TODO implement result page. Should have a list of video results, nav/searchbar at the top, and filter options between
    // the navbar and list of results. Maybe should have a loading state as well? Depends on how long the api calls take.
    // This page will also handle fetching the results via the youtube service, use a Task for this.
    render() {
        return html`
            <h1>Results</h1>
            <video-sort></video-sort>
            <video-list></video-list>
        `;
    }
}