import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Task } from "../model/task.model";

export const getAllTask = createFeatureSelector<Task[]>('task');

export const getTaskByStatus = (status: string) => createSelector(
    getAllTask, (state) => {
        if (status) {
            return state.filter(e => e.isCompleted == (status == 'completed' ? true : false))
        } else {
            return state;
        }
    }
)