import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { ApiService } from "../../exercise-three/api.service";
import { User } from "../models/user.model";
import { UserActions } from "./user.actions";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private service: ApiService) { }

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loadUser),
        exhaustMap(() =>
            this.service.getUsers().pipe(
                map((users: User[]) => UserActions.loadUserSuccess({ users })),
                catchError(error => of(UserActions.loadUserFailure({ error })))
            )
        )
    ));

    addUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.addUser),
        mergeMap(({ payload }) =>
            this.service.addUser(payload).pipe(
                map((user: any) => UserActions.addUserSuccess({ user })),
                catchError(error => of(UserActions.addUserFailure({ error })))
            )
        )
    ))

    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.updateUser),
        switchMap(({ payload }) =>
            this.service.updateUser(payload.id, payload).pipe(
                map((user: User) => UserActions.updateUserSuccess({ user })),
                catchError(error => of(UserActions.updateUserFailure({ error })))
            ))
    ))

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.deleteUser),
        mergeMap(({ payload }) =>
            this.service.deleteUser(payload.id).pipe(
                map((user: User) => UserActions.deleteUserSuccess({ user })),
                catchError(error => of(UserActions.deleteUserFailure({ error })))
            ))
    ))
}
