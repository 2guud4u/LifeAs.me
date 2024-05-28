import { define, View, Rest, Events, } from "@calpoly/mustang";
import { css, html } from "lit";

import { Msg } from "../messages";
import { Model } from "../model";
//import { RoutineCardElement } from "../components/routine-card";

export class LoginViewElement extends View<Model, Msg> {

  static uses = define({
    "restful-form": Rest.FormElement
  })


  render() {
    
    return html`
    <h1>Login</h1>
    <restful-form new src="/auth/login">
    <label>
    <span>Username:</span>
    <input name="username" autocomplete="off" />
  </label>
  <label>
    <span>Password:</span>
    <input type="password" name="password" />
  </label>
  </restful-form>
    <a href="/app/register">CLick here to register!</a>
    `;
  }
  get next() {
    let query = new URLSearchParams(document.location.search);
    return query.get("next");
  }

  constructor() {
    super("snowflake:model");

    this.addEventListener(
      "mu-rest-form:created",
      (event: Event) => {
        const detail = (event as CustomEvent).detail;
        const { token } = detail.created;
        const redirect = this.next || "/";
        console.log("Login successful", detail, redirect);

        Events.relay(event, "auth:message", [
          "auth/signin",
          { token, redirect }
        ]);
      }
    );
  }
  connectedCallback() {
    super.connectedCallback(); // Call the parent class connectedCallback if necessary
    // Check if routines are not already loaded
    
      // Dispatch routine/getall message
      

    
  }

  static styles = css`
  
  `;
}
// <comp .fun ${this.fun} .bar=${this.bar}></comp>
// @property()
// fn: () =>