import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../model/user";

export const getUserAction = createActionGroup({
    source: 'User Loading',
    events: {
        'User Loading': emptyProps(),
        'User Loading Successfully': props<{ payload: User[] }>(),
        'User Loading Failure': emptyProps()
    }
})

export const addUser = createAction(
    '[User] Add',
    props<{ payload: User }>()
)

export const updateUser = createAction(
    '[User] Update',
    props<{ payload: User }>()
)

export const deleteUser = createAction(
    '[User] Delete',
    props<{ payload: User }>()
)

export const addUserSuccess = createAction('[User] Add Success');
export const updateUserSuccess = createAction('[User] Update Success');
export const deleteUserSuccess = createAction('[User] Delete Success');
