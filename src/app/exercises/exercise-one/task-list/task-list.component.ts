import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task.model';
import { deleteTask, toggleTaskCompletion } from '../store/task.action';
import { getAllTask, getTaskByStatus } from '../store/task.selector';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  filteredTasks$ = new Observable<any>();
  tasks$ = new Observable<any>();

  constructor(private store: Store<any>) {
    this.tasks$ = store.select(getAllTask);
  }

  onTypeChange(event: Event) {
    const selectedValue: any = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      this.filteredTasks$ = this.store.select(getTaskByStatus(selectedValue));
    } else {
      this.filteredTasks$ = of(null);
    }
  }

  deleteTask(task: Task) {
    this.store.dispatch(deleteTask({ payload: { id: task.id } }))
  }

  onCheckboxChange(task: Task) {
    this.store.dispatch(toggleTaskCompletion({ payload: { id: task.id } }))
  }
}
