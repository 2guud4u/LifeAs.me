import { prepareTemplate } from "./template.js";
export class CardElement extends HTMLElement {
    static template = prepareTemplate(`<template>
    <head>
    <link rel="stylesheet" href="./card/card.css">
    </head>

       <card>
        <heading><slot name="name"></slot> <icon>(icon)</icon> </heading>
        <card_body>
          <card_content>
            <p><slot name="summary"></slot></p>
            <img src="images/placeholder.png" alt="image of student routine">
          </card_content>
        </card_body>
        <card_footer>
            By: <slot name="createdBy"></slot>
          <card_footer>
      </card>

      <style>
        icon {
          position: static;
        }
        card_footer {
          align-self: last baseline;
          display: flex;
          margin: .5em;
        }
        card_content {
          height: 60%;
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
      //get api url
      const src = this.getAttribute("src");
      //call fetch and render
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