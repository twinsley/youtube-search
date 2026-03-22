import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "./pages/home/home.ts";
import "./pages/result/result.ts";
import "./components/navbar.ts";
import type { YouTubeSearchParams } from "./types/youtube.ts";

@customElement("lit-app")
export class LitApp extends LitElement {
  private _router = new Router(this, [
    {
      path: "/results",
      render: () =>
        html`<result-page
          .query=${this._query}
          .sort=${this._sort}
        ></result-page>`,
    },
    {
      path: "/bookmarks",
      render: () => {
        return html`<bookmark-page></bookmark-page>`;
      },
    },
    {
      path: "/",
      render: () => {
        return html`<home-page></home-page>`;
      },
    },
  ]);

  @state()
  private _query = "";

  @state()
  private _sort: YouTubeSearchParams["sortBy"] = "relevance";

  private _onSearch(e: CustomEvent) {
    this._query = e.detail.query;
    this._sort = e.detail.sort;
    history.pushState(
      null,
      "",
      "/results?" +
        new URLSearchParams({
          query: this._query,
          sort: this._sort,
        }).toString(),
    );
    this._router.goto("/results");
  }
  static styles = css`
    @media (min-width: 600px) {
      main {
        padding-top: 5rem;
        min-width: 500px;
      }
    }
    @media (max-width: 600px) {
      main {
        padding-top: 3.2rem;
      }
    }
  `;

  render() {
    return html`
      <nav-bar></nav-bar>
      <main @search="${this._onSearch}">${this._router.outlet()}</main>
    `;
  }
}
