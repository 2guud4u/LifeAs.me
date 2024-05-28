import { define, View, Rest, Events, } from "@calpoly/mustang";
import { css, html } from "lit";

import { Msg } from "../messages";
import { Model } from "../model";
//import { RoutineCardElement } from "../components/routine-card";

export class ProfileViewElement extends View<Model, Msg> {




  render() {
    
    return html`
    <h1>Profile</h1>
    `;
  }


  constructor() {
    super("snowflake:model");
  }
  connectedCallback() {
    super.connectedCallback(); // Call the parent class connectedCallback if necessary
    // Check if routines are not already loaded
    
      // Dispatch routine/getall message
      

    
  }

  static styles = css`
  
  `;
}
