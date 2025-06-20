import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductAction } from './store/product.action';
import { Product } from './store/product';
import { productIds, selectAllEntity, selectAllProduct, totalProducts } from './store/product.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-seven',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exercise-seven.component.html',
  styleUrl: './exercise-seven.component.css'
})
export class ExerciseSevenComponent {
  products: any;
  noOfProducts: any;
  entitiesStored: any;
  allProductIds: any;
  formModel: any = { name: '' };

  constructor(private store: Store<any>) {
    this.products = store.selectSignal(selectAllProduct)
    this.noOfProducts = store.selectSignal(totalProducts)
    this.entitiesStored = store.selectSignal(selectAllEntity)
    this.allProductIds = store.selectSignal(productIds)
  }

  ngOnInit(): void {
    this.loadGroceries();
  }

  loadGroceries() {
    this.store.dispatch(ProductAction.loadProduct());
  }

  onSubmit() {
    if (this.formModel.productId) {
      this.store.dispatch(ProductAction.updateProduct({ product: this.formModel }));
    } else {
      this.store.dispatch(ProductAction.addProduct({ product: this.formModel }));
    }
    this.resetForm();
  }

  editItem(item: any) {
    this.formModel = { ...item };
  }

  deleteItem(item: Product) {
    this.store.dispatch(ProductAction.deleteProduct({ productId: item.productId }));
  }

  resetForm() {
    this.formModel = { name: '', productId: '' };
  }
}
