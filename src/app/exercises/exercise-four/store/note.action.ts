import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Note } from "../model/note";

export const getNotes = createAction(
    '[Note] get',
    props<{ payload: any }>()
)

export const getNotesSuccess = createAction(
    '[Note] Loading Success',
    props<{ payload: Note[] }>()
)

export const getNotesFailed = createAction(
    '[Note] Loading failed',
    props<{ payload: Note[] }>()
)

// you can create action group of above 3 actions like below

export const addNote = createActionGroup({
    source: '[Note] adding',
    events: {
        'Note Adding': props<{ payload: Note }>(),
        'Note Added Success': emptyProps(),
        'Note Added Failed': emptyProps()
    }
})

export const updateNote = createActionGroup({
    source: '[Note] updating',
    events: {
        'Note Updating': props<{ payload: Note }>(),
        'Note Updated Success': emptyProps(),
        'Note Updated failed': emptyProps()
    }
})

export const deleteNote = createActionGroup({
    source: '[Note] Deleting',
    events: {
        'Note Deleting': props<{ payload: Note }>(),
        'Note Deleted Success': emptyProps(),
        'Note Deleted failed': emptyProps()
    }
})