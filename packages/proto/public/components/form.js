import { prepareTemplate } from "./template.js";
import { Observer, Auth } from "@calpoly/mustang";
export class FormElement extends HTMLElement {
    //todo 
    // use attributeChangedCallback to trigger notifi if sumbitted failure or success
    // attribute should be called submitionStatus
    // make delete notif on submit
    static observedAttributes = ["submissionstatus"];
    get path() {
        return this.getAttribute("path");
    }
    get hasId() {
        return this.getAttribute("hasId");
    }
    get submissionstatus() {
        return this.getAttribute("submissionstatus");
    }
    get header() {
        return this.getAttribute("header");
    }
    static template = prepareTemplate(`<template>
    <form autocomplete="off">
      <slot></slot>
      <button type="submit">Submit</button>
    </form>
    <style>
    form {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1em;
        flex-direction: column;
    }
    </style>
  </template>`);
  
    get form() {
        return this.shadowRoot.querySelector("form");
    }
  
    constructor() {
      super();
      this._state = {};
      this.attachShadow({ mode: "open" }).appendChild(
        FormElement.template.cloneNode(true)
      );
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        onSubmit(this);
      });
      //listen for changes and add to state
      this.addEventListener("change", (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        console.log("change", name, value);
        if (name) this._state[name] = value;
      });
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
    }

  attributeChangedCallback(name, oldValue, newValue) {
    displaySubmissionStatus(this, this.submissionstatus);
  }

}
function onSubmit(form) {
    if (form.hasId){
      form._state["id"] = form._state["createdBy"] +"-"+ form._state["name"];
      console.log("Submitting form", form._state);
    }
        return fetch(form.path, {
        method: "POST",
        headers: JSON.parse(form.header),
        body: JSON.stringify(form._state),
    })
    .then((res) => {
      
        if (res.ok) {
            console.log("Form submitted successfully");
            form.form.reset();
            form.setAttribute("submissionstatus", "Success");
            
        } else {
          res.text().then((text) => {
            form.setAttribute("submissionstatus", "Failure: " + text);
          })
        }
        return res.json();   
    })
    .then((json) => {
        console.log("Response", json);
        form.dispatchEvent(new CustomEvent("my-form:created", {
            bubbles: true,
            composed: true,
            detail: { created: json },
        }));
    })
}
function displaySubmissionStatus(form, status) {
  let status_string = `<div id="status">${status}</div>`
  document.getElementById("status");
  if(document.getElementById("status")){
    document.getElementById("status").remove();
  }
  addFragment(status_string, form);
}

function renderSlots(json) { 
  const entries = Object.entries(json); 
  const slot = ([key, value]) => { 
    // default case for now: 
    return `<span slot="${key}">${value}</span>`; 
  }; 
  return entries.map(slot).join("");
}



export function addFragment(htmlString, container) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const fragment = Array.from(doc.body.childNodes);

  container.append(...fragment);
}

customElements.define("my-form", FormElement);