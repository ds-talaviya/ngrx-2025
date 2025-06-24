import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./model/product.model";

@Injectable({ providedIn: 'root' })

export class ApiService {
    apiUrl = 'http://localhost:5000/products'
    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(this.apiUrl + '/' + product.id, product);
    }

    deleteProduct(product: Product): Observable<Product> {
        return this.http.delete<Product>(this.apiUrl + '/' + product.id);
    }
}