
import { Observer, Auth } from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
export class FormElement extends LitElement {

    render() {
      return html`
    <form autocomplete="off">
      <slot></slot>
      <button type="submit">Submit</button>
    </form>

  
  `};
  
      static styles = css`
      form {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: 1em;
          flex-direction: column;
      }
      `;
  
    

}

