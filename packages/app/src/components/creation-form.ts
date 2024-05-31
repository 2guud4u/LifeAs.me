import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import {
    define,
    View,
    Rest,
    Events,
    InputArray,
    Form,
    Observer
} from "@calpoly/mustang";
import {
    Model
} from "../model";
import {
    Routine
} from "server/models";
import { User } from "server/models";
import { Msg } from "../messages";
export class FormCreator extends View<Model, Msg> {
    static uses = define({
      "mu-form": Form.Element,
      "input-array": InputArray.Element
    });
    get user(): User | undefined {
      return this.model.user;
    }
  
    @property()
    username = "anonymous";
  
    _authObserver = new Observer(this, "snowflake:auth");
  
    connectedCallback() {
      super.connectedCallback();
      this._authObserver.observe(({ user }) => {
        if (user) {
          this.username = user.username;
        }
      });
    }
    @property({ attribute: false })
    init?: Routine;
  
    render() {
      return html`
        <section>

          <mu-form .init=${{"createdBy": this.username}}>
          <label>
          <span>Routine Name</span>
          <input name="name" autocomplete="off" />
        </label>
        <label>
          <span>Routine Description</span>
          <input name="summary" />
        </label>
        <label>
        <span>Routine steps</span>
        <input name="steps" />
      </label>

        
          </mu-form>
        </section>
      `;
    }
  }