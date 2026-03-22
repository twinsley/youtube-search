import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../components/search.ts";

@customElement("home-page")
export class HomePage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 86vh;
    }
  `;

  render() {
    return html` <search-bar></search-bar> `;
  }
}
