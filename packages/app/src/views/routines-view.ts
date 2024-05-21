import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Routine } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import { RoutineCardElement } from "../components/routine-card";

export class RoutinesViewElement extends View<Model, Msg> {

  static uses = define({
    "routine-card": RoutineCardElement
  })
  @property()
  get routines(): Routine[] | undefined {
    return this.model.routines;
  }


  constructor() {
    super("snowflake:model");
    

  }

  render() {
    
    return html`
    
    <heading>
        Discover
    </heading>
    filter by:
    <routine_body>
    ${this.routines?.map((routine) => 
      html`
      <routine-card name="${routine.name}"
        summary="${routine.summary}"
        createdBy="${routine.createdBy}"
      ></routine-card>`)}
    </routine_body>
    `;
  }
  connectedCallback() {
    super.connectedCallback(); // Call the parent class connectedCallback if necessary
    // Check if routines are not already loaded
    
      // Dispatch routine/getall message
      
    this.dispatchMessage(["routine/getall", {}]);
    
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
// <comp .fun ${this.fun} .bar=${this.bar}></comp>
// @property()
// fn: () =>