import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Product } from "../model/product.model";
import { Observable, switchMap, tap } from "rxjs";
import { ApiService } from "../api.service";
import { tapResponse } from '@ngrx/operators';

interface ProductState {
    products: Product[];
    loading: boolean;
}

@Injectable({ providedIn: 'root' })

export class ProductComponentStore extends ComponentStore<ProductState> {

    constructor(private service: ApiService) {
        super({
            products: [],
            loading: false
        })
    }

    // selectors
    loading$ = this.select(state => state.loading)
    products$ = this.select(state => state.products)
    getProductById = (productId: string) => this.select(state => state.products.find((p) => p.productId == productId))

    // updaters
    setProducts = this.updater((state, products: Product[]) => ({
        ...state, products
    }))

    setLoading = this.updater((state, loading: boolean) => ({
        ...state, loading
    }))

    addProduct = this.updater((state, product: Product) => ({
        ...state,
        products: [...state.products, product]
    }))

    updateProduct = this.updater((state, product: Product) => ({
        ...state,
        products: state.products.map((e) =>
            e.productId == product.productId ? product : e)
    }))

    deleteProduct = this.updater((state, product: Product) => ({
        ...state,
        products: state.products.filter((e) => e.productId != product.productId)
    }))

    loadProducts = this.effect((trigger$) => {
        return trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap(() => this.service.getProducts().pipe(
                tapResponse((products: Product[]) => {
                    setTimeout(() => {
                        this.setProducts(products);
                        this.setLoading(false);
                    }, 3000);
                }, (error: any) => {
                    console.log(error)
                    this.setLoading(false);
                })
            ))
        )
    })

    addProductIntoDB = this.effect((trigger$: Observable<Product>) =>
        trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap((product: Product) => this.service.addProduct(product).pipe(
                tapResponse((responseProduct: Product) => {
                    this.setLoading(false)
                    this.addProduct(responseProduct);
                }, (error) => {
                    console.error(error);
                    this.setLoading(false);
                })
            ))
        )
    )

    updateProductIntoDB = this.effect((trigger$: Observable<Product>) =>
        trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap((product: Product) => this.service.updateProduct(product).pipe(
                tapResponse((responseProduct: Product) => {
                    this.updateProduct(responseProduct);
                    this.setLoading(false);
                }, (error) => {
                    console.error(error);
                    this.setLoading(false);
                })
            ))
        )
    )

    deleteProductFromDb = this.effect((trigger$: Observable<Product>) =>
        trigger$.pipe(
            tap(() => this.setLoading(true)),
            switchMap((product: Product) => this.service.deleteProduct(product).pipe(
                tapResponse((data: Product) => {
                    this.setLoading(false);
                    this.deleteProduct(data);
                }, (error) => {
                    console.error(error);
                    this.setLoading(false);
                })
            ))
        )
    )
}