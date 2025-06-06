import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Grocery } from "../../../models/grocery.model";

// export const selectGroceries = (state: { groceries: Grocery[] }) => state.groceries;
// do same thing above code do.
export const selectGroceries = createFeatureSelector<Grocery[]>('groceries');

export const selectFruitGroceries = createSelector(
    selectGroceries, (state) => {
        console.log("performing operation")
        return state.filter(item => item.type == 'fruit');
    }
)

export const selectGroceriesByType = (type: string) => createSelector(
    selectGroceries, (state) => {
        console.log("performing operation")
        return state.filter(item => item.type == type)
    }
)