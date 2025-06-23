// product.component-store.ts
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { Product } from '../model/product';

interface ProductState {
    products: Product[];
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ProductComponentStore extends ComponentStore<ProductState> {
    constructor() {
        super({
            products: [],
            loading: false
        });
    }

    // ✅ SELECTORS
    readonly products$ = this.select(state => state.products);
    readonly loading$ = this.select(state => state.loading);

    // ✅ UPDATERS
    readonly setLoading = this.updater((state, loading: boolean) => ({
        ...state,
        loading
    }));

    readonly setProducts = this.updater((state, products: Product[]) => ({
        ...state,
        products
    }));

    readonly addProduct = this.updater((state, product: Product) => ({
        ...state,
        products: [...state.products, product]
    }));

    readonly updateProduct = this.updater((state, product: Product) => ({
        ...state,
        products: state.products.map(p =>
            p.productId === product.productId ? product : p
        )
    }));

    readonly deleteProduct = this.updater((state, id: string) => ({
        ...state,
        products: state.products.filter(p => p.productId !== id)
    }));

    // ✅ EFFECT (simulate async load)
    readonly loadProducts = this.effect((trigger$) =>
        trigger$.pipe(
            tap(() => this.setLoading(true)),
            tap(() => {
                const mockData: Product[] = [
                    { productId: '1', name: 'Pen' },
                    { productId: '2', name: 'Pencil' }
                ];
                this.setProducts(mockData);
                this.setLoading(false);
            })
        )
    );
}
