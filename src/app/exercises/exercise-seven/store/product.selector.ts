import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productAdapter, productState } from "./product.entity";

export const selectProductState = createFeatureSelector<productState>('products');

const {
    selectAll,
    selectEntities,
    selectTotal,
    selectIds
} = productAdapter.getSelectors(selectProductState);

export const selectAllProduct = selectAll;
export const selectAllEntity = selectEntities;
export const totalProducts = selectTotal;
export const productIds = selectIds;

export const selectProductById = (id: string) =>
    createSelector(selectEntities, entities => entities[id]);
