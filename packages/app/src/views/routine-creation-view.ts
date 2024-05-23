import {
    define,
    View,
    Rest,
    Events,
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


export class RoutineCreationViewElement extends View < Model, Msg > {

    static uses = define({
        "restful-form": Rest.FormElement
    })
    @property()
    get routines(): Routine[] | undefined {
        return this.model.routines;
    }

    render() {

        return html`
      <restful-form new src="/api/routines/">
      <label>
      <span>Routine Name</span>
      <input name="name" autocomplete="off" />
    </label>
    <label>
      <span>Routine Description</span>
      <input name="summary" />
    </label>
    <input type="hidden" name="id" value="doggy"/>
    </restful-form>
    
    `;
    }
    get next() {
        let query = new URLSearchParams(document.location.search);
        return query.get("next");
    }

    constructor() {
        super("snowflake:model");

        this.addEventListener(
            "mu-rest-form:created",
            (event: Event) => {
                const detail = (event as CustomEvent).detail;
                const {
                    token
                } = detail.created;
                const redirect = this.next || "/";
                console.log("Login successful", detail, redirect);

                Events.relay(event, "auth:message", [
                    "auth/signin",
                    {
                        token,
                        redirect
                    }
                ]);
            }
        );
    }
    connectedCallback() {
        super.connectedCallback(); // Call the parent class connectedCallback if necessary
        // Check if routines are not already loaded

        // Dispatch routine/getall message



    }

    static styles = css`
  
  `;
}
// <comp .fun ${this.fun} .bar=${this.bar}></comp>
// @property()
// fn: () =>