import { createReducer, on } from "@ngrx/store";
import { Task } from "../model/task.model";
import { addNewTask, deleteTask, toggleTaskCompletion } from "./task.action";

let initialState: Task[] = []
export const taskReducer = createReducer(
    initialState,
    on(addNewTask, (state, action) => {
        let data: any = {
            id: Math.random(),
            name: action.payload.name,
            isCompleted: false
        }
        return [...state, data]
    }),
    on(toggleTaskCompletion, (state, action) => {
        return state.map(task =>
            task.id === action.payload.id
                ? { ...task, isCompleted: !task.isCompleted || false }
                : task
        );
    }),
    on(deleteTask, (state, action) => {
        return state.filter((e) => e.id !== action.payload.id);
    })
)