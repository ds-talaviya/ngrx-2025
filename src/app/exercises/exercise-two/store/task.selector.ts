import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Task } from "../models/task";

export const getAllTasks = createFeatureSelector<Task[]>('tasks');

export const getTaskByProjectId = (projectId: number) => createSelector(
    getAllTasks, (state) => {
        return state.filter(e => e.project.id == projectId)
    }
)