import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import {
    define,
    View,
    Rest,
    Events,
    InputArray,
    Form
} from "@calpoly/mustang";
import {
    Model
} from "../model";
import {
    Routine
} from "server/models";
export class FormCreator extends LitElement {
    static uses = define({
      "mu-form": Form.Element,
      "input-array": InputArray.Element
    });
    @property()
    username?: string;
  
    @property({ attribute: false })
    init?: Routine;
  
    render() {
      return html`
        <section>

          <mu-form .init=${{"createdBy": "horse"}}>
          <label>
          <span>Routine Name</span>
          <input name="name" autocomplete="off" />
        </label>
        <label>
          <span>Routine Description</span>
          <input name="summary" />
        </label>
          </mu-form>
        </section>
      `;
    }
  }