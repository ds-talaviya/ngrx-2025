import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Product } from "./product";

const initialProducts: Product[] = [
    { productId: '12', name: 'abc' },
    { productId: '13', name: 'xyz' },
];


export interface productState extends EntityState<Product> {
    // here you can add your custom fields for it check exe:6
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: (product) => product.productId,
    sortComparer: false
})

// here how you set initial custom data (for empty initial data check exe:6)
export const initialProductState: productState = productAdapter.addMany(initialProducts, productAdapter.getInitialState())