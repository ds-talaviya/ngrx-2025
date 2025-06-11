import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Project } from '../models/project';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { getAllProjects } from '../store/project.selector';
import { addTask, deleteTask, updateTask } from '../store/task.action';
import { getAllTasks } from '../store/task.selector';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  providers: [TitleCasePipe, DatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  taskData: any = {};
  tasks$ = new Observable<Task[]>;
  projects$ = new Observable<Project[]>;
  isEditMode: boolean;
  user: any;
  project: any;
  projectUsers: any = [];
  priorityList = [
    {
      name: 'High',
      value: 'high'
    },
    {
      name: 'Low',
      value: 'low'
    },
    {
      name: 'Medium',
      value: 'medium'
    }
  ]
  statusList = [
    {
      name: 'To Do',
      value: 'to do'
    },
    {
      name: 'In Progress',
      value: 'in progress'
    },
    {
      name: 'Done',
      value: 'done'
    }
  ]

  constructor(private store: Store<any>) {
    this.projects$ = store.select(getAllProjects);
    this.tasks$ = store.select(getAllTasks);
  }


  onTaskAdd() {
    if (this.isEditMode) {
      this.store.dispatch(updateTask({ payload: this.taskData }));
    } else {
      this.store.dispatch(addTask({ payload: { ...this.taskData, status: 'to do' } }));
    }
    this.isEditMode = false;
    this.taskData = {};
    this.user = [];
    this.project = [];
  }

  updateTask(task: Task) {
    this.isEditMode = true;
    this.taskData = { ...task };
    this.project = this.taskData.project.id;
    this.onProjectSelect(this.taskData.project);
    this.user = this.taskData.user.id;
  }

  deleteTask(task: Task) {
    this.store.dispatch(deleteTask({ payload: task }))
  }

  onSelectProject() {
    this.taskData.user = [];
    this.user = [];
    this.projectUsers = [];
  }

  onProjectSelect(event: Project) {
    this.taskData.project = event;
    this.projectUsers = event.users;
  }

  onUserSelect(event: User) {
    this.taskData.user = event;
  }

}
