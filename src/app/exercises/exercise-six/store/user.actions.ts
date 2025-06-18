import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const UserActions = createActionGroup({
    source: '[User]',
    events: {
        'Load User': emptyProps(),
        'Load User Success': props<{ users: User[] }>(),
        'Load User Failure': props<{ error: string }>(),

        'Add User': props<{ payload: User }>(),
        'Add User Success': props<{ user: User }>(),
        'Add User Failure': props<{ error: string }>(),

        'Update User': props<{ payload: User }>(),
        'Update User Success': props<{ user: User }>(),
        'Update User Failure': props<{ error: string }>(),

        'Delete User': props<{ payload: User }>(),
        'Delete User Success': props<{ user: User }>(),
        'Delete User Failure': props<{ error: string }>()
    }
})