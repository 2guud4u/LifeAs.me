import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Routine } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class RoutineViewElement extends View<Model, Msg> {
  @property({ attribute: "tour-id", reflect: true })
  routineid = "";

  @property()
  get tour(): Routine | undefined {
    return this.model.routine;
  }

  constructor() {
    super("blazing:model");
  }

  render() {
    return html`
      <!-- your template/render code here -->
    `;
  }
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    if (
      name === "tour-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      this.dispatchMessage([
        "routine/select",
        { routineid: newValue }
      ]);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  // etc
}