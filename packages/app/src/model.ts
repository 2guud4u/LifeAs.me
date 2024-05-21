import { Routine, Credential } from "server/models";

export interface Model {
    routine?: Routine;
    credential?: Credential;
    routines?: Routine[];
}

export const init: Model = {};