import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { YouTubeSearchItem } from '../types/youtube';

@customElement('video-card')
export class VideoCard extends LitElement {
    @property({ type: Object })
    item: YouTubeSearchItem | null = null;

    render() {
        if (!this.item) {
            return html``;
        }

        const { title, description } = this.item.snippet;
        const thumbnailUrl = this.item.snippet.thumbnails.medium.url;
        console.log(this.item);

        return html`
            <div class="video-card">
                <img .src="${thumbnailUrl}" .alt="${title}" class="thumbnail" />
                <div class="video-info">
                    <h3 class="title">${title}</h3>
                    <p class="description">${description}</p>
                </div>
            </div>
        `;
    }
}