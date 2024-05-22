// src/components/blazing-header.ts
import {
  //Auth,
  DropdownElement,
  Events,
  Observer,
  define,
  View,
  Auth
} from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { User } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class HeaderElement extends View<Model, Msg> {
  static uses = define({
    "drop-down": DropdownElement
  });
  @property()
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

  render() {
    return html`
      
        <header>
            <h1 class="title">Life As ...</h1>
            ${this.username == "anonymous" ? html`<a href="./login.html
            ">Login</a>` : html`<p>Welcome, ${this.username}</p>

            <drop-down class="menu">
                <dropdown-container>
                <Dropdown-Item><a class="nostyle" href="/profile.html">Profile</a></Dropdown-Item>
                <Dropdown-Item>Settings</Dropdown-Item>
                <a href="./globecrafting.html" class="nostyle">Create Routine</a>
                <a href="#" @click=${signOutUser}> Sign out </a>
                  <dropdown-container>
                </drop-down>
                `}
            <label style="grid-column:2 ;text-align: center;"
                 @change=${toggleDarkMode}>

                <input type="checkbox" autocomplete="off"/>
                Darkmode
            </label>
            
       
        </header>

    `;
  }

  static styles = css`
    header {
      font-family: "Tilt Neon", sans-serif;
      color: white;
      background-color: var(--color-banner);
      font-size: var(--size-type-mlarge);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      
  }
  h1.title {
      grid-column: 2;
      text-align: center;
  }
  drop-down.menu {
      grid-column: 5;

  }
  dropdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
      
  }
  `;
}

type Checkbox = HTMLInputElement & { checked: boolean };

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as Checkbox;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}

function signOutUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}