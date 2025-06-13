import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addNote, deleteNote, getNotes, getNotesFailed, getNotesSuccess, updateNote } from "./note.action";
import { catchError, exhaustMap, finalize, map, of, tap } from "rxjs";
import { Note } from "../model/note";
import { ApiService } from "../api.service";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "../../../../loader.service";

@Injectable()

export class NoteEffect {

    constructor(private actions$: Actions,
        private service: ApiService,
        private toastr: ToastrService,
        private loaderService: LoaderService) { }

    loadNotes$ = createEffect(() => this.actions$.pipe(
        ofType(getNotes),
        tap(() => this.loaderService.show()),
        exhaustMap(() =>
            this.service.getAllNotes().pipe(
                map((notes: Note[]) => getNotesSuccess({ payload: notes })),
                catchError(() => of(getNotesFailed({ payload: [] }))),
                finalize(() => this.loaderService.hide())
            )
        )
    ));

    addNote$ = createEffect(() => this.actions$.pipe(
        ofType(addNote.noteAdding),
        tap(() => this.loaderService.show()),
        exhaustMap(({ payload }) =>
            this.service.addNote(payload).pipe(
                map(() => addNote.noteAddedSuccess()),
                catchError((error) => of(addNote.noteAddedFailed()))
            )
        )
    ))

    updateNote$ = createEffect(() => this.actions$.pipe(
        ofType(updateNote.noteUpdating),
        tap(() => this.loaderService.show()),
        exhaustMap(({ payload }) =>
            this.service.updateNote(payload).pipe(
                map(() => updateNote.noteUpdatedSuccess()),
                catchError((error) => of(updateNote.noteUpdatedFailed()))
            )
        )
    ))

    deleteNote$ = createEffect(() => this.actions$.pipe(
        ofType(deleteNote.noteDeleting),
        tap(() => this.loaderService.show()),
        exhaustMap(({ payload }) =>
            this.service.deleteNote(payload).pipe(
                map(() => deleteNote.noteDeletedSuccess()),
                catchError((error) => of(deleteNote.noteDeletedFailed()))
            )
        )
    ))

    onSuccessFullyAddedNote$ = createEffect(() => this.actions$.pipe(
        ofType(addNote.noteAddedSuccess),
        tap(() => {
            this.toastr.success('Note added successfully!', 'Success!');
            this.loaderService.hide();
        })
    ), { dispatch: false });

    onSuccessFullyUpdatedNote$ = createEffect(() => this.actions$.pipe(
        ofType(updateNote.noteUpdatedSuccess),
        tap(() => {
            this.toastr.success('Note updated successfully!', 'Success!');
            this.loaderService.hide();
        })
    ), { dispatch: false })

    onSuccessFullyDeletedNote$ = createEffect(() => this.actions$.pipe(
        ofType(deleteNote.noteDeletedSuccess),
        tap(() => {
            this.toastr.success('Note deleted successfully!', 'Success!')
            this.loaderService.hide();
        })
    ), { dispatch: false })

    onFailedAddedNote$ = createEffect(() => this.actions$.pipe(
        ofType(addNote.noteAddedFailed),
        tap(() => {
            this.toastr.error('Error while adding Note!', 'Failed!')
            this.loaderService.hide();
        })
    ), { dispatch: false })

    onFailedUpdateNote$ = createEffect(() => this.actions$.pipe(
        ofType(updateNote.noteUpdatedFailed),
        tap(() => {
            this.toastr.error('Error while updating Note!', 'Failed!')
            this.loaderService.hide();
        })
    ), { dispatch: false })

    onFailedDeleteNote$ = createEffect(() => this.actions$.pipe(
        ofType(deleteNote.noteDeletedFailed),
        tap(() => {
            this.toastr.error('Error while deleting Note!', 'Failed!')
            this.loaderService.hide();
        })
    ), { dispatch: false })

    onDataChange$ = createEffect(() => this.actions$.pipe(
        ofType(addNote.noteAddedSuccess, updateNote.noteUpdatedSuccess, deleteNote.noteDeletedSuccess),
        map(() => getNotes({ payload: {} }))
    ))
}