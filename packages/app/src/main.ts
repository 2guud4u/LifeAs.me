// app/src/main.ts
import { Auth, Store, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
//import { TourViewElement } from "./views/tour-view";
//import { BlazingHeaderElement } from "./components/blazing-header";
import { HeaderElement } from "./views/header-view";
import { RoutinesViewElement } from "./views/routines-view";
import { LoginViewElement } from "./views/login-view";
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
  "lifeas-header": HeaderElement,
  "routines-view": RoutinesViewElement,
  "login-view": LoginViewElement,
});