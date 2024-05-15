import { prepareTemplate } from "./template.js";
import { Observer } from "@calpoly/mustang";
export class DropdownElement extends HTMLElement {
  static template = prepareTemplate(`<template>
    <div><a class="nostyle" id="login" href="http://localhost:3000/profile/login.html?next=../index.html" >Login</a></div>
    <div id="account" name="actuator"><a class="nostyle">Account</a></div>
    <div id="panel">
      <slot></slot>
    </div>
    
    <style>
      :host {
        position: relative;
      }
      #is-shown {
        display: none;
      }
      #panel {
        display: none;
        position: absolute;
        
        margin-top: var(--size-spacing-small);
        width: max-content;
        padding: var(--size-spacing-small);
        border-radius: var(--size-radius-small);
        background: var(--color-background-card);
        color: var(--color-text);
        box-shadow: var(--shadow-popover);
      }
      :host([open]) #panel {

        display: flex;
        flex-direction: column;
      }
      :host([logged-in]) #login {
        display: none;
      }

      :host([logged-in]) #account {
        display: block;
      }

      #account {
        display: none;
      }
    </style>
  </template>`);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      DropdownElement.template.cloneNode(true)
    );
    this.shadowRoot
      .querySelector("div[name='actuator']")
      .addEventListener("click", () => this.toggle());
  }
  _authObserver = new Observer(this, "snowflake:auth");

  connectedCallback() {

    this._authObserver.observe().then((obs) => {
      obs.setEffect(({ user }) => {
        console.log("Setting user as effect of change", user);
        this._user = user;
        this.checkAuth();
      });
    });



  }

  checkAuth() {
    if(this._user?.authenticated){
      console.log("Setting logged in");
      this.setAttribute("logged-in", "logged-in");
    } else {
      console.log("Setting logged out");
      this.removeAttribute("logged-in");
      if (this.hasAttribute("open")) this.removeAttribute("open");
    }
  }
  toggle() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    else this.setAttribute("open", "open");
  }
}

customElements.define("drop-down", DropdownElement);