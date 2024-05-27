import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class RoutineCardElement extends LitElement {
    @property()
    summary: string = "";

    @property()
    name: string = "";

    @property()
    createdBy: string = "";


    render() {
      return html`
      <a href="/app/view/${(this.name).replace(/\s+/g, '-') + "-" + this.createdBy}">
      <card>
      <heading><slot name="name">${this.name}</slot> <icon>(icon)</icon> </heading>
      <card_body>
        <card_content>
          <p><slot name="summary">${this.summary}</slot></p>
          <img src="images/placeholder.png" alt="image of student routine">
        </card_content>
      </card_body>
      <card_footer>
          By: <slot name="createdBy">${this.createdBy}</slot>
        <card_footer>
    </card>
    </a>
      `;
    }
  
    static styles = css`
    icon {
        position: static;
      }
      card_footer {
        align-self: last baseline;
        display: flex;
        margin: .5em;
      }
      card_content {
        height: 175px;

      }
      card_content > p{
        display: none;
      }
      card_content:hover > img{
        display: none;
      }
      card_content:hover > p{
        display: block;
      }

      card_body img {
        width: 100%;
        height: 100%;
        border-radius: 1em;
      }
      card_body img:hover {
        display: none;
      }
      card {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        flex-direction: column;
        width: 200px;
        min-height: 300px;
        border-style: solid;
        margin: .5em;
        border-color: black;
        background-color: var(--color-background-card);
        border-radius: 1em;
        color: var(--color-text);
    }
    
    card heading {
        color: var(--color-text);
        justify-content: space-between;
        margin: .5em;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    
    }
    card_body{
        margin: 1em;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: column;
    }
    `;
  }