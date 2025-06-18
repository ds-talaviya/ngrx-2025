import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './models/user.model';
import { FormsModule } from '@angular/forms';
import { selectAllUsers } from './store/user.selectors';
import { UserActions } from './store/user.actions';

@Component({
  selector: 'app-exercise-six',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exercise-six.component.html',
  styleUrl: './exercise-six.component.css'
})
export class ExerciseSixComponent {
  users: any;
  formModel: any = { name: '', mobile: 0 };

  constructor(private store: Store<any>) {
    this.users = store.selectSignal(selectAllUsers)
  }

  ngOnInit(): void {
    this.loadGroceries();
  }

  loadGroceries() {
    this.store.dispatch(UserActions.loadUser());
  }

  onSubmit() {
    if (this.formModel.id) {
      this.store.dispatch(UserActions.updateUser({ payload: this.formModel }));
    } else {
      this.store.dispatch(UserActions.addUser({ payload: this.formModel }));
    }
    this.resetForm();
  }

  editItem(item: any) {
    this.formModel = { ...item };
  }

  deleteItem(item: User) {
    this.store.dispatch(UserActions.deleteUser({ payload: item }));
  }

  resetForm() {
    this.formModel = { name: '', mobile: 0, id: '' };
  }
}
