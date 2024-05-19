import { Routine, Credential } from "server/models";

export interface Model {
    routine?: Routine;
    credential?: Credential;
}

export const init: Model = {};