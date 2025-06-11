import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Project } from "../models/project";

export const getAllProjects = createFeatureSelector<Project[]>('projects')
export const getUsersByProjectId = (projectId: number) => createSelector(
    getAllProjects, (state) => {
        return state.find(e => e.id == projectId)?.users || [];
    }
)