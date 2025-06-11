import { createAction, props } from "@ngrx/store";
import { Task } from "../models/task";

export const addTask = createAction(
    '[Task] Add',
    props<{ payload: Task }>()
)

export const updateTask = createAction(
    '[Task] Update',
    props<{ payload: Task }>()
)

export const deleteTask = createAction(
    '[Task] Delete',
    props<{ payload: Task }>()
)