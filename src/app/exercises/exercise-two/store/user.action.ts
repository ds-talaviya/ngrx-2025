import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

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