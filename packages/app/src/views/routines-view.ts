import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Routine } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import { RoutineCardElement } from "../components/routine-card";

export class RoutinesViewElement extends View<Model, Msg> {

  static sortOptions = ["A-Z", "Z-A"];
  static uses = define({
    "routine-card": RoutineCardElement
  })
  @property()
  get routines(): Routine[] | undefined {
    return this.model.routines;
  }

  @property()
  sortIndex = 0;

  @property()
  get sortedRoutines(): Routine[] | undefined {
    return SortRoutines(this.routines || [], RoutinesViewElement.sortOptions[this.sortIndex]);
  }

  constructor() {
    super("snowflake:model");
    

  }

  render() {
    
    return html`
    
    <heading>
        Discover
    </heading>
    <p>filter by:</p>
    
    <button type="button" @click=${this.handleButtonClick}>${RoutinesViewElement.sortOptions[this.sortIndex]}</button>
    <routine_body>
    ${this.sortedRoutines?.map((routine) => 
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
  handleButtonClick() {
    this.sortIndex = (this.sortIndex + 1) % RoutinesViewElement.sortOptions.length;
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
p {
  color: var(--color-text-section-title);
}
  `;
}

function SortRoutines(routines: Routine[], sortOption: string) {
  switch (sortOption) {
    case "A-Z":
      return routines.sort((a, b) => a.name.localeCompare(b.name));
    case "Z-A":
      return routines.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return routines;
  }
}

