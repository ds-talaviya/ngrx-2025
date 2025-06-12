import { createReducer, on } from "@ngrx/store";
import { User } from "../model/user";
import { getUserAction } from "./user.action";

const initialState: User[] = [];
export const effectUserReducer = createReducer(
    initialState,
    on(getUserAction.userLoadingSuccessfully, (state, action) => {
        return action.payload
    })
)