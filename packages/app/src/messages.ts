import { Routine } from "server/models";

export type Msg =
  | ["routine/save", { userid: string; routine: Routine }]
  | ["routine/select", { userid: string }]
  | ["routine/create", { userid: string; routine: Routine}]