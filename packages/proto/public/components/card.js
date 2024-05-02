import { prepareTemplate } from "./template.js";

export class CardElement extends HTMLElement {
    static template = prepareTemplate(`<template>
      <header>
      <slot></slot>
        <slot name="heading"></slot>
        <slot name="body"></slot>
        <slot name="info"></slot>
      </header>
        <style>
        </style>
      </template>`);
  
    get dl() {
      return this.shadowRoot.querySelector("dl");
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" }).appendChild(
        CardElement.template.cloneNode(true)
      );
    }
  
    connectedCallback() {
      const src = this.getAttribute("src");
  
      fetch(src).then((response) => {console.log(response)});

    }
}

customElements.define("globe-card", CardElement);