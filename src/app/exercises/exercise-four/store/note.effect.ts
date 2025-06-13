import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addNote, deleteNote, getNotes, getNotesFailed, getNotesSuccess, updateNote } from "./note.action";
import { catchError, exhaustMap, finalize, map, of, tap } from "rxjs";
import { Note } from "../model/note";
import { ApiService } from "../api.service";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "../../../../loader.service";
import { effectWithLoader } from "../with-loader.operator";

@Injectable()

export class NoteEffect {

    constructor(private actions$: Actions,
        private service: ApiService,
        private toastr: ToastrService,
        private loaderService: LoaderService) { }

    loadNotes$ = createEffect(() => this.actions$.pipe(
        ofType(getNotes),
        exhaustMap(() =>
            this.service.getAllNotes().pipe(
                effectWithLoader(this.loaderService),
                map((notes: Note[]) => getNotesSuccess({ payload: notes })),
                catchError(() => of(getNotesFailed({ payload: [] })))
            )
        )
    ));

    addNote$ = createEffect(() => this.actions$.pipe(
        ofType(addNote.noteAdding),
        exhaustMap(({ payload }) =>
            this.service.addNote(payload).pipe(
                effectWithLoader(this.loaderService),
                map(() => addNote.noteAddedSuccess()),
                catchError((error) => of(addNote.noteAddedFailed()))
            )
        )
    ))

    updateNote$ = createEffect(() => this.actions$.pipe(
        ofType(updateNote.noteUpdating),
        exhaustMap(({ payload }) =>
            this.service.updateNote(payload).pipe(
                effectWithLoader(this.loaderService),
                map(() => updateNote.noteUpdatedSuccess()),
                catchError((error) => of(updateNote.noteUpdatedFailed()))
            )
        )
    ))

    deleteNote$ = createEffect(() => this.actions$.pipe(
        ofType(deleteNote.noteDeleting),
        exhaustMap(({ payload }) =>
            this.service.deleteNote(payload).pipe(
                effectWithLoader(this.loaderService),
                map(() => deleteNote.noteDeletedSuccess()),
                catchError((error) => of(deleteNote.noteDeletedFailed()))
            )
        )
    ))

    onSuccessFullyAddedNote$ = createEffect(() => this.actions$.pipe(
        ofType(addNote.noteAddedSuccess),
        tap(() => {
            this.toastr.success('Note added successfully!', 'Success!');
        })
    ), { dispatch: false });

    onSuccessFullyUpdatedNote$ = createEffect(() => this.actions$.pipe(
        ofType(updateNote.noteUpdatedSuccess),
        tap(() => {
            this.toastr.success('Note updated successfully!', 'Success!');
        })
    ), { dispatch: false })

    onSuccessFullyDeletedNote$ = createEffect(() => this.actions$.pipe(
        ofType(deleteNote.noteDeletedSuccess),
        tap(() => {
            this.toastr.success('Note deleted successfully!', 'Success!')
        })
    ), { dispatch: false })

    onFailedAddedNote$ = createEffect(() => this.actions$.pipe(
        ofType(addNote.noteAddedFailed),
        tap(() => {
            this.toastr.error('Error while adding Note!', 'Failed!')
        })
    ), { dispatch: false })

    onFailedUpdateNote$ = createEffect(() => this.actions$.pipe(
        ofType(updateNote.noteUpdatedFailed),
        tap(() => {
            this.toastr.error('Error while updating Note!', 'Failed!')
        })
    ), { dispatch: false })

    onFailedDeleteNote$ = createEffect(() => this.actions$.pipe(
        ofType(deleteNote.noteDeletedFailed),
        tap(() => {
            this.toastr.error('Error while deleting Note!', 'Failed!')
        })
    ), { dispatch: false })

    onDataChange$ = createEffect(() => this.actions$.pipe(
        ofType(addNote.noteAddedSuccess, updateNote.noteUpdatedSuccess, deleteNote.noteDeletedSuccess),
        map(() => getNotes({ payload: {} }))
    ))
}