import { Routine } from "server/models";

export type Msg =
  | ["routine/save", { userid: string; routine: Routine }]
  | ["routine/select", { routineid: string }]
  | ["routine/create", { routine: Routine}]
  | ["routine/getall", {}]