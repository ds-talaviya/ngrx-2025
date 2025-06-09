import { Component } from '@angular/core';
import { BucketComponent } from '../bucket/bucket.component';
import { GroceryComponent } from '../grocery/grocery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BucketComponent, GroceryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
