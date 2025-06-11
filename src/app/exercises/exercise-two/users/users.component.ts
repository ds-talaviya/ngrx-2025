import { Component } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addUser, deleteUser, updateUser } from '../store/user.action';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userData: User = {
    id: 0,
    name: '',
    email: ''
  };
  users$ = new Observable<User[]>;
  editMode: Boolean = false;

  constructor(private store: Store<any>) {
    this.users$ = store.select('users')
  }

  onProjectAdd() {
    if (this.editMode) {
      this.store.dispatch(updateUser({ payload: this.userData }));
    } else {
      this.store.dispatch(addUser({ payload: this.userData }));
    }
    this.editMode = false;
    this.userData = {
      id: 0,
      name: '',
      email: ''
    };
  }

  updateTask(user: User) {
    this.editMode = true;
    this.userData = { ...user };
  }

  deleteTask(user: User) {
    this.store.dispatch(deleteUser({ payload: user }))
  }
}
