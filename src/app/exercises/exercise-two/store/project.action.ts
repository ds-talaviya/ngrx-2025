import { createAction, props } from "@ngrx/store";
import { Project } from "../models/project";

export const addProject = createAction(
    '[Project] Add',
    props<{ payload: Project }>()
)

export const updateProject = createAction(
    '[Project] Update',
    props<{ payload: Project }>()
)

export const deleteProject = createAction(
    '[Project] Delete',
    props<{ payload: Project }>()
)