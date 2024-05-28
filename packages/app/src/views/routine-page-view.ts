import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Routine } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";


export class RoutinePageViewElement extends View<Model, Msg> {

  static uses = define({
    
  })
  @property({ attribute: "routine-id", reflect: true })
  routineid = "";

  @property()
  get routines(): Routine[] | undefined {
    return this.model.routines;
  }

  @state()
  get routine(): Routine | undefined {
    return this.model.routine;
  }

  

  constructor() {
    super("snowflake:model");
    

  }

  render() {
    let routine = this.routine;
    if (!routine) {
      return html`<div>loading...</div>`;
    }
    return html`
    <h1>Routine: ${routine.name}</h1>
    <p>Created By: ${routine.createdBy}</p>
    <p>${routine.summary}</p>
    <h2>Details</h2>
    <p>${routine.steps}</p>

    `;
  }
  connectedCallback() {
    super.connectedCallback(); // Call the parent class connectedCallback if necessary
    // Check if routines are not already loaded

      // Dispatch routine/getall message
    
    
  }
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    console.log("Routine Page Attribute Changed", name, oldValue, newValue);
    if (
      name === "routine-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Tour Page:", newValue);
      this.dispatchMessage([
        "routine/select",
        { routineid: newValue }
      ]);
    }
  }
  static styles = css`

  `;
}
