import { createAction, props } from "@ngrx/store";
import { Task } from "../model/task.model";

export const addNewTask = createAction(
    '[Task] Add',
    props<{ payload: Partial<Task> }>()
)

export const toggleTaskCompletion = createAction(
    '[Task] toggle task completion',
    props<{ payload: Partial<Task> }>()
)

export const deleteTask = createAction(
    '[Task] Delete',
    props<{ payload: Partial<Task> }>()
)