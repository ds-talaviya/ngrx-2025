import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { getAllUser } from './store/user.selector';
import { CommonModule } from '@angular/common';
import { addUser, deleteUser, getUserAction, updateUser } from './store/user.action';


@Component({
  selector: 'app-exercise-three',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exercise-three.component.html',
  styleUrl: './exercise-three.component.css'
})
export class ExerciseThreeComponent implements OnInit {
  users$ = new Observable<User[]>;
  formModel: any = { name: '', mobile: 0 };

  constructor(private store: Store<any>, private service: ApiService) {
    this.users$ = store.select(getAllUser)
  }

  ngOnInit(): void {
    this.loadGroceries();
  }

  loadGroceries() {
    this.store.dispatch(getUserAction.userLoading());
  }

  onSubmit() {
    if (this.formModel.id) {
      this.store.dispatch(updateUser({ payload: this.formModel }));
    } else {
      this.store.dispatch(addUser({ payload: this.formModel }));
    }
    this.resetForm();
  }

  editItem(item: any) {
    this.formModel = { ...item };
  }

  deleteItem(item: User) {
    this.store.dispatch(deleteUser({ payload: item }));
  }

  resetForm() {
    this.formModel = { name: '', mobile: 0, id: '' };
  }
}
