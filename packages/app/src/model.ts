import { Routine, Credential, User } from "server/models";

export interface Model {
    routine?: Routine;
    credential?: Credential;
    routines?: Routine[];
    user?: User;
    
}

export const init: Model = {};