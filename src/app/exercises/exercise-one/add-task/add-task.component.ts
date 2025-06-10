import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addNewTask } from '../store/task.action';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  taskName = "";

  constructor(private store: Store) { }

  addTask() {
    let data = {
      name: this.taskName
    }
    this.store.dispatch(addNewTask({ payload: data }));
    this.taskName = "";
  }
}
