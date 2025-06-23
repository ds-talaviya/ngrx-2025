import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './model/product';
import { ProductComponentStore } from './store/product.component-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exercise-eight',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exercise-eight.component.html',
  styleUrl: './exercise-eight.component.css'
})
export class ExerciseEightComponent {
  name = '';

  constructor(public store: ProductComponentStore) { }

  ngOnInit(): void {
    this.store.loadProducts();
  }

  add() {
    const product: Product = {
      productId: Date.now().toString(),
      name: this.name
    };
    this.store.addProduct(product);
    this.name = '';
  }
}
