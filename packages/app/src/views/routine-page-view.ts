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
    
    <heading>
        Discover
    </heading>
    filter by:
    <routine_body>
    
      <routine-card name="${routine.name}"
        summary="${routine.summary}"
        createdBy="${routine.createdBy}"
      ></routine-card>
    </routine_body>
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
    if (
      name === "tour-id" &&
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
  routine_body {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  heading {
    font-family: "Tilt Neon", sans-serif;
    font-size: var(--size-type-large);
    color: var(--color-text-section-title);
    background-color: var(--color-background-section-title);
    text-decoration: underline;
  }
  :host {
    overflow: hidden; /* or scroll, auto, etc. */
}
  `;
}
