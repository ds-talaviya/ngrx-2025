import { createReducer, on } from "@ngrx/store";
import { initialProductState, productAdapter } from "./product.entity";
import { ProductAction } from "./product.action";

export const productReducer = createReducer(
    initialProductState,
    on(ProductAction.loadProduct, state => {
        return state
    }),
    on(ProductAction.addProduct, (state, { product }) =>
        productAdapter.addOne(product, state)
    ),
    on(ProductAction.updateProduct, (state, { product }) =>
        productAdapter.updateOne({ id: product.productId, changes: product }, state)
    ),
    on(ProductAction.deleteProduct, (state, { productId }) =>
        productAdapter.removeOne(productId, state)
    )
)