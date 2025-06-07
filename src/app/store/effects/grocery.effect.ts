import { Injectable } from "@angular/core";
import { GroceryService } from "../../grocery.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { groceryAction } from "../actions/grocery.action";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()

export class GroceryEffects {
    constructor(private groceryService: GroceryService, private action$: Actions) { }

    loadGroceries$ = createEffect(() => this.action$.pipe(
        ofType(groceryAction.loadGroceries),
        exhaustMap(() => this.groceryService.fetchAllGroceries()
            .pipe(
                map(groceries => groceryAction.loadGroceriesSuccess({ payload: groceries })),
                catchError(() => of(groceryAction.loadGroceriesFailed()))
            ))
    ))
}