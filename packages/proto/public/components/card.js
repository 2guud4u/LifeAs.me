import { prepareTemplate } from "./template.js";

export class CardElement extends HTMLElement {
    static template = prepareTemplate(`<template>
      <header>
      
        <h1><slot name="name"></slot></h1>
        <slot name="summary"></slot>
        <slot name="createdBy"></slot>
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
      
      fetch(src).then((response) => {return response.json()}).then((val) => { this.replaceChildren();
        let slots = renderSlots(val);
        addFragment(slots, this);});
      
    }
}
function renderSlots(json) { 
  const entries = Object.entries(json); 
  const slot = ([key, value]) => { 
    // default case for now: 
    return `<span slot="${key}">${value}</span>`; 
  }; 
  return entries.map(slot).join("");
}

customElements.define("globe-card", CardElement);

export function addFragment(htmlString, container) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = Array.from(doc.body.childNodes);

  container.append(...fragment);
}
//Steps:
// call api to get data
// create hmtl span strings
// nuke current children from this
// create element from the span strings
// append element to the this container