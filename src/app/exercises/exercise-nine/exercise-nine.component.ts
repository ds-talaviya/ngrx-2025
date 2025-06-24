import { Component, OnInit } from '@angular/core';
import { Product } from './model/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductComponentStore } from './store/product.component-store';

@Component({
  selector: 'app-exercise-nine',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exercise-nine.component.html',
  styleUrl: './exercise-nine.component.css'
})
export class ExerciseNineComponent implements OnInit {
  productData: Partial<Product> = {};
  products$ = new Observable<Product[]>();
  productData$ = new Observable<any>();

  constructor(public store: ProductComponentStore) { }

  ngOnInit(): void {
    this.store.loadProducts();
    this.products$ = this.store.select(state => state.products)
  }

  addProduct() {
    if (this.productData.productId) {
      let data: any = { ...this.productData }
      this.store.updateProductIntoDB(data)
    } else {
      let data: any = { ...this.productData, productId: (+new Date()).toString() }
      this.store.addProductIntoDB(data)
    }
    this.productData = {};
  }

  resetForm() {
    let data: any = {};
    this.productData = data;
  }

  editItem(data: Product) {
    this.productData = { ...data };
  }

  deleteItem(data: Product) {
    this.store.deleteProductFromDb(data);
  }

  showDetails(data: Product) {
    this.productData$ = this.store.getProductById(data.productId)
  }
}
