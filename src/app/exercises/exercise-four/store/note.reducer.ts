import { createReducer, on } from "@ngrx/store";
import { Note } from "../model/note";
import { addNote, deleteNote, getNotesFailed, getNotesSuccess, updateNote } from "./note.action";

const initialState: Note[] = [];
export const noteReducer = createReducer(
    initialState,
    on(getNotesSuccess, (state, action) => {
        return action.payload
    }),
    on(getNotesFailed, (state, action) => {
        return []
    }),
    on(addNote.noteAddedFailed, (state, action) => {
        return []
    }),
    on(updateNote.noteUpdatedFailed, (state, action) => {
        return []
    }),
    on(deleteNote.noteDeletedFailed, (state, action) => {
        return []
    })
)