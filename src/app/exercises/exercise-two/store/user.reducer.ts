import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user";
import { addUser, deleteUser, updateUser } from "./user.action";

const initialState: User[] = [];
export const userReducer = createReducer(
    initialState,
    on(addUser, (state, action) => {
        let data: User = {
            ...action.payload,
            id: Math.random()
        }
        return [...state, data]
    }),
    on(updateUser, (state, action) => {
        let data = action.payload;
        return state.map(e =>
            e.id === action.payload.id
                ? { ...data }
                : e
        );
    }),
    on(deleteUser, (state, action) => {
        return state.filter(e => e.id !== action.payload.id)
    })
)