import { createReducer, on } from "@ngrx/store";
import { Project } from "../models/project";
import { addProject, deleteProject, updateProject } from "./project.action";

const initialState: Project[] = [];
export const projectReducer = createReducer(
    initialState,
    on(addProject, (state, action) => {
        let data: Project = {
            ...action.payload,
            id: Math.random()
        }
        return [...state, data]
    }),
    on(updateProject, (state, action) => {
        return state.map(e =>
            e.id == action.payload.id ?
                { ...action.payload } :
                e
        )
    }),
    on(deleteProject, (state, action) => {
        return state.filter((e) => e.id !== action.payload.id)
    })
)