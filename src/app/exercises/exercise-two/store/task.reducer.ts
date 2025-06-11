import { createReducer, on } from "@ngrx/store";
import { Task } from "../models/task";
import { addTask, deleteTask, updateTask } from "./task.action";

const initialState: Task[] = [];

export const tasksReducer = createReducer(
    initialState,
    on(addTask, (state, action) => {
        let data: Task = {
            ...action.payload,
            id: Math.random()
        }
        return [...state, data]
    }),
    on(updateTask, (state, action) => {
        return state.map(e =>
            e.id == action.payload.id ? action.payload : e
        )
    }),
    on(deleteTask, (state, action) => {
        return state.filter((e) => e.id !== action.payload.id);
    })
)