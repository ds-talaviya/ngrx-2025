import { Injectable } from "@angular/core";
import { ApiService } from "../api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addUser, addUserSuccess, deleteUser, deleteUserSuccess, getUserAction, updateUser, updateUserSuccess } from "./user.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { User } from "../model/user";

@Injectable()

export class UserEffect {
    constructor(private service: ApiService, private action$: Actions) { }

    loadUsers$ = createEffect(() => this.action$.pipe(
        ofType(getUserAction.userLoading),
        exhaustMap(() => this.service.getUsers().pipe(
            map((users: User[]) => getUserAction.userLoadingSuccessfully({ payload: users })),
            catchError(() => of(getUserAction.userLoadingFailure()))
        ))
    ))

    addUsers$ = createEffect(() => this.action$.pipe(
        ofType(addUser),
        exhaustMap(({ payload }) => this.service.addUser(payload).pipe(
            map(() => addUserSuccess()),
            catchError(() => of(getUserAction.userLoadingFailure()))
        ))
    ))

    updateUser$ = createEffect(() => this.action$.pipe(
        ofType(updateUser),
        exhaustMap(({ payload }) => this.service.updateUser(payload.id, payload).pipe(
            map(() => updateUserSuccess()),
            catchError(() => of(getUserAction.userLoadingFailure()))
        ))
    ))

    deleteUser$ = createEffect(()=> this.action$.pipe(
        ofType(deleteUser),
        exhaustMap(({payload})=> this.service.deleteUser(payload.id).pipe(
            map(()=> deleteUserSuccess()),
            catchError(()=> of(getUserAction.userLoadingFailure()))
        ))
    ))

    reloadAfterMutate$ = createEffect(() =>
        this.action$.pipe(
            ofType(addUserSuccess, updateUserSuccess, deleteUserSuccess),
            map(() => getUserAction.userLoading())
        )
    );
}