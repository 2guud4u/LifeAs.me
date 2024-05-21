import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Routine, Credential } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  console.log('update for', message[0])
  switch (message[0]) {
    
    case "routine/select":
      selectRoutine(message[1], user).then((routine) =>
        apply((model) => ({ ...model, routine }))
      );
      break;
    
    case "routine/create":
      createRoutine(message[1], user).then((routine) =>
        apply((model) => ({ ...model, routine }))
      );
      break;

    case "routine/getall":
      getAllRoutines(message[1], user).then((routines) =>
        apply((model) => ({ ...model, routines }))
      );
      break;
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function getAllRoutines(
  msg: {},
  user: Auth.User
) {
  console.log('getRoutine')
  return fetch(`/api/routines`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Routine[];
      return undefined;
    });
}
function selectRoutine(
  msg: { routineid: string },
  user: Auth.User
) {
  return fetch(`/api/routines/${msg.routineid}`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Routine;
      return undefined;
    });
}

function createRoutine(
  msg: {
    userid: string;
    routine: Routine;
  },
  user: Auth.User
) {
  return fetch(`/api/profiles/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.routine)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      return undefined;
    })
    .then((json: unknown) => {
      if (json) return json as Routine;
      return undefined;
    });
}