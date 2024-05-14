import { prepareTemplate } from "./template.js";
import { Observer } from "@calpoly/mustang";
import "./form.js";

export class LoginFormElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <my-form path="/api/routines/" user="" submissionStatus header="">
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
      LoginFormElement.template.cloneNode(true)
    );


  }
  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  _authObserver = new Observer(this, "snowflake:auth");
  connectedCallback() {

    this._authObserver.observe().then((obs) => {
      obs.setEffect(({ user }) => {
        //get auth stuff and edit the form header
        this._user = user;
        // update the form with the user and token
        this.shadowRoot.querySelector('my-form').setAttribute('user', this._user.username);
        this.shadowRoot.querySelector('my-form').setAttribute('header', `{"Content-Type": "application/json", "Authorization": "Bearer ${this._user.token}"}`);
        
      });
    });
    
  }
}

customElements.define("routine-form", LoginFormElement);