import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("nav-bar")
export class NavBar extends LitElement {
  static styles = [
    css`
      nav {
        display: flex;
        justify-content: center;
        gap: 5rem;
        align-items: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
        background: #333;
        border-bottom: 1px solid #555;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        width: 100%;
      }
      h1 {
        margin: 0;
        font-size: 1.5rem;
        color: #fff;
      }
      a {
        text-decoration: none;
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        border: 1px solid #fff;
        background: #444;
        transition: all 0.2s ease;
        width: 100px;
        text-align: center;
      }
      a:hover {
        background: #e9ecef;
        border-radius: 20px;
        background: #555;
      }
      @media (max-width: 600px) {
        nav {
          gap: 0.5rem;
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }
        h1 {
          font-size: 1.2rem;
        }
        a {
          width: auto;
          padding: 0.25rem 0.5rem;
          font-size: 0.9rem;
        }
      }
    `,
  ];

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <h1>YouTube Search</h1>
        <a href="/bookmarks">Bookmarks</a>
      </nav>
    `;
  }
}
