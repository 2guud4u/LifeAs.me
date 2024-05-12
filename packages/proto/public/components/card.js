import { prepareTemplate } from "./template.js";
import { Observer } from "@calpoly/mustang";
export class CardElement extends HTMLElement {
    static template = prepareTemplate(`<template>
    <head>
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
        </style>
      </template>`);
  
    get src() {
      return this.getAttribute("src");
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: "open" }).appendChild(
        CardElement.template.cloneNode(true)
      );

    }
    _authObserver = new Observer(this, "snowflake:auth");

    get authorization() {
      console.log("Authorization for user, ", this._user);
      return (
        this._user?.authenticated && {
          Authorization: `Bearer ${this._user.token}`
        }
      );
    }
    connectedCallback() {

      this._authObserver.observe().then((obs) => {
        obs.setEffect(({ user }) => {
          console.log("Setting user as effect of change", user);
          this._user = user;
          
          if (this.src) {
            console.log("LOading JSON", this.authorization);
            loadData(this);
          }
        });
      });
      
      //get api url
      // const src = this.getAttribute("src");
      // let auth = {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvZyIsImlhdCI6MTcxNTQ4NzUwNCwiZXhwIjoxNzE1NTczOTA0fQ.5IH_95tIpHb-Eer1ZRlPMbckWZJHSehEdToS2NUIYWk`}
      // //call fetch and render
      // fetch(src, {
      //   headers: auth
        
      // }).then((response) => {return response.json()}).then((val) => { this.replaceChildren();
      //   let slots = renderSlots(val);
      //   addFragment(slots, this);});
      
    }

}
function loadData(card){
  
  let src = card.src;
  let auth = card.authorization;
  if (!auth) {
    console.log("Not authorized to load data");
    return;
  }
  fetch(src, {
    headers: auth
  }).then((response) => {return response.json()}).then((val) => { card.replaceChildren();
    let slots = renderSlots(val);
    addFragment(slots, card);});
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