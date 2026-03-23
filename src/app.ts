import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "./pages/home/home.ts";
import "./pages/result/result.ts";
import "./pages/bookmark/bookmarks.ts";
import "./components/navbar.ts";
import { bookmarksContext } from "./contexts/bookmark-context.ts";
import { ContextProvider } from "@lit/context";
import {
  itemKey,
  loadBookmarks,
  saveBookmarks,
} from "./services/bookmark-service.ts";
import type { BookmarksContextData } from "./types/bookmark.ts";
import type {
  YouTubeSearchItem,
  YouTubeSearchParams,
} from "./types/youtube.ts";

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

  @state()
  private _bookmarkItems: YouTubeSearchItem[] = [];

  private _bookmarksProvider = new ContextProvider(this, {
    context: bookmarksContext,
    initialValue: this._buildContextValue([]),
  });

  private _buildContextValue(items: YouTubeSearchItem[]): BookmarksContextData {
    const keys = new Set(items.map((i) => itemKey(i)));
    return {
      items,
      isBookmarked: (item: YouTubeSearchItem) => keys.has(itemKey(item)),
      toggle: (item: YouTubeSearchItem) => {
        const key = itemKey(item);
        if (keys.has(key)) {
          this._updateBookmarks(
            this._bookmarkItems.filter((b) => itemKey(b) !== key),
          );
        } else {
          this._updateBookmarks([item, ...this._bookmarkItems]);
        }
      },
      remove: (item: YouTubeSearchItem) => {
        const key = itemKey(item);
        this._updateBookmarks(
          this._bookmarkItems.filter((b) => itemKey(b) !== key),
        );
      },
      clearAll: () => {
        this._updateBookmarks([]);
      },
    };
  }

  private _updateBookmarks(items: YouTubeSearchItem[]) {
    this._bookmarkItems = items;
    saveBookmarks(items);
    this._bookmarksProvider.setValue(this._buildContextValue(items));
  }

  override connectedCallback() {
    super.connectedCallback();
    this._bookmarkItems = loadBookmarks();
    this._bookmarksProvider.setValue(
      this._buildContextValue(this._bookmarkItems),
    );
  }

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
