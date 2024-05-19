import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Routine, Credential } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "routine/save":
      saveRoutine(message[1], user).then((profile) =>
        apply((model) => ({ ...model, profile }))
      );
      break;
    // put the rest of your cases here
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

async function saveRoutine(
  msg: { userid: string; routine: Routine },
    user: Auth.User
) {
    return {} as Model;
  // make your API call here
}