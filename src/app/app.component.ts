import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BucketComponent } from './components/bucket/bucket.component';
import { GroceryComponent } from './components/grocery/grocery.component';
import { Store } from '@ngrx/store';
import { groceryAction } from './store/actions/grocery.action';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { LoaderService } from '../loader.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BucketComponent, GroceryComponent, RouterModule, CommonModule, NgxLoadingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  loading$ = this.loader.loading$;

  constructor(private store: Store<any>, private loader: LoaderService) { }

  ngOnInit(): void {
    this.store.dispatch(groceryAction.loadGroceries());
  }
}
