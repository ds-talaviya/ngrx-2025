import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Note } from "../model/note";

export const getAllNotes = createFeatureSelector<Note[]>('notes');

export const getNotesByTag = (tag: string) => createSelector(
    getAllNotes, (state) => {
        return state.filter((e) => e.tags.includes(tag));
    }
)