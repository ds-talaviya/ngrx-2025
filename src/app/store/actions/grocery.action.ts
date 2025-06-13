import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Grocery } from "../../../models/grocery.model";

// export const initGroceries = createAction('[Grocery] Load Groceries');
// export const completedGroceries = createAction('[Grocery] Load Groceries Success');

export const groceryAction = createActionGroup({
    source: 'Grocery API',
    events: {
        'Load Groceries': emptyProps(),
        'Load Groceries Success': props<{ payload: Grocery[] }>(),
        'Load Groceries failed': emptyProps()
    }
})
// separate actions
// export const loadGroceries = createAction(
//     '[Groceries] Load'
// )
// export const loadGroceriesSuccess = createAction(
//     '[Groceries] Success',
//     props<{ payload: Grocery[] }>()
// )
// export const loadGroceriesFailed = createAction(
//     '[Groceries] Failed'
// )