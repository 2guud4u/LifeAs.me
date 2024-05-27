import {
    define,
    View,
    Rest,
    Events,
    InputArray,
    Form
} from "@calpoly/mustang";
import {
    css,
    html
} from "lit";
import {
    property
} from "lit/decorators.js";
import {
    Routine
} from "server/models";
import {
    Msg
} from "../messages";
import {
    Model
} from "../model";
import {
    FormCreator
} from "../components/creation-form";

export class RoutineCreationViewElement extends View < Model, Msg > {

    static uses = define({
        "input-array": InputArray.Element,
        "mu-form": Form.Element,
        "creation-form": FormCreator
    })
    @property()
    get routines(): Routine[] | undefined {
        return this.model.routines;
    }

    render() {

        return html`
      <creation-form @mu-form:submit=${event => {this._handleSubmit(event)} }>
    </creation-form>
    
    `;
    }
    get next() {
        let query = new URLSearchParams(document.location.search);
        return query.get("next");
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

  _handleSubmit(event: Form.SubmitEvent<any>) {
    console.log("TRYING TO DO THE STUFF");
    this.dispatchMessage([
      "routine/create",
      {
        
        routine: event.detail,

      }
    ]);
  }
}
// <comp .fun ${this.fun} .bar=${this.bar}></comp>
// @property()
// fn: () =>