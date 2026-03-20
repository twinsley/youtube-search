import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Router } from '@lit-labs/router';
import './pages/home/home.ts';
import './pages/result/result.ts';
import './components/navbar.ts';

@customElement('lit-app')
export class LitApp extends LitElement {
  private router = new Router(this, [
    {
      path: '/results',
      render: () => html`<result-page></result-page>`
    },
    {
      path: '/',
      render: () => {
        return html`<home-page></home-page>`;
      }
    }
  ]);

  render() {
    return html`
      <nav-bar></nav-bar>
      <main>${this.router.outlet()}</main>
    `;
  }
};