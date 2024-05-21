// app/src/main.ts
import { Auth, Store, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
//import { TourViewElement } from "./views/tour-view";
//import { BlazingHeaderElement } from "./components/blazing-header";
import { HeaderElement } from "./components/header";
import { RoutinesViewElement } from "./views/routines-view";
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
});