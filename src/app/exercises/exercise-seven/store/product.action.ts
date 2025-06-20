import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "./product";

export const ProductAction = createActionGroup({
    source: 'Product',
    events: {
        'Load Product': emptyProps(),
        'Add Product': props<{ product: Product }>(),
        'Update Product': props<{ product: Product }>(),
        'Delete Product': props<{ productId: string }>(),
    }
})