// app/src/main.ts
import {
  Auth,
  History,
  Store,
  Switch,
  define
} from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import { html } from "lit";
import update from "./update";
//import { TourViewElement } from "./views/tour-view";
//import { BlazingHeaderElement } from "./components/blazing-header";
import { HeaderElement } from "./views/header-view";
import { RoutinesViewElement } from "./views/routines-view";
import { LoginViewElement } from "./views/login-view";
import { RoutineCreationViewElement } from "./views/routine-creation-view";
import { RoutinePageViewElement } from "./views/routine-page-view";
import { RegisterViewElement } from "./views/register-view";
import { ProfileViewElement } from "./views/profile-view";
const routes = [
  {
    path: "/app/profile",
    view: () => html`
      <profile-view></profile-view>
    `
  },

  {
    path: "/app/view/:id",
    view: (params: Switch.Params) => html`
      <routine-page-view routine-id=${params.id}></routine-page-view>
    `
  },
  {
    path: "/app/create",
    view: () => html`
    <routine-creation-view></routine-creation-view>
    `
  },
  {
    path: "/app/login",
    view: () => html`
    <login-view></login-view>
    `
  },
  {
    path: "/app/register",
    view: () => html`
    <register-view></register-view>
    `
  },
  {
    path: "/app",
    view: () => html`
    
    <routines-view></routines-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];
define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "snowflake:auth");
    }
  },
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "snowflake:history");
    }
  },
  "lifeas-header": HeaderElement,
  "routines-view": RoutinesViewElement,
  "login-view": LoginViewElement,
  "routine-creation-view": RoutineCreationViewElement,
  "routine-page-view": RoutinePageViewElement,
  "register-view": RegisterViewElement,
  "profile-view": ProfileViewElement
});