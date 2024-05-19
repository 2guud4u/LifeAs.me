// src/components/blazing-header.ts
import {
  //Auth,
  DropdownElement,
  Events,
  //Observer,
  define
} from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

export class HeaderElement extends LitElement {
  static uses = define({
    "drop-down": DropdownElement
  });

  render() {
    return html`
      
        <header>
            <h1 class="title">Life As ...</h1>
            
            <drop-down class="menu">
                
                <Dropdown-Item><a class="nostyle" href="/profile.html">Profile</a></Dropdown-Item>
                <Dropdown-Item>Settings</Dropdown-Item>
                <a href="./globecrafting.html" class="nostyle">Create Routine</a>
                <Dropdown-Item><a
                    class="nostyle"
                    href="#"
                    onclick="relayEvent(event, 'auth:message', ['auth/signout'])">
                    Sign out
                  </a></Dropdown-Item>
            </drop-down>
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
      grid-column: 4;
      
  }
  `;
}

type Checkbox = HTMLInputElement & { checked: boolean };

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as Checkbox;
  const checked = target.checked;

  Events.relay(ev, "dark-mode", { checked });
}