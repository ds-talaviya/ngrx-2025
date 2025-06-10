import { Component } from '@angular/core';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-exercise-one',
  standalone: true,
  imports: [AddTaskComponent, TaskListComponent],
  templateUrl: './exercise-one.component.html',
  styleUrl: './exercise-one.component.css'
})
export class ExerciseOneComponent {

}
