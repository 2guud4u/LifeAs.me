import { prepareTemplate } from "./template.js";
import { relayEvent } from "./relay-event.js";
import "./form.js";

export class RegisterFormElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <my-form path="/auth/register" header='{ "Content-Type": "application/json" }'>
        <slot></slot>
      </my-form>
    </template>
  `);

  get next() {
    let query = new URLSearchParams(document.location.search);
    return query.get("next");
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      RegisterFormElement.template.cloneNode(true)
    );

    
  }
}

customElements.define("register-form", RegisterFormElement);