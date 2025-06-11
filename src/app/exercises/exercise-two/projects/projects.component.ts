import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getAllUsers } from '../store/user.selector';
import { User } from '../models/user';
import { addProject, updateProject } from '../store/project.action';
import { getAllProjects } from '../store/project.selector';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projectData: any = {};
  projects$ = new Observable<Project[]>;
  users$ = new Observable<User[]>;
  editMode: boolean = false;
  users: any[] = [];

  constructor(private store: Store<any>) {
    this.users$ = store.select(getAllUsers);
    this.projects$ = store.select(getAllProjects);
  }

  onProjectAdd() {
    console.log(this.projectData)
    if (this.editMode) {
      this.store.dispatch(updateProject({ payload: this.projectData }));
    } else {
      this.store.dispatch(addProject({ payload: this.projectData }));
    }
    this.users = [];
    this.editMode = false;
    this.projectData = {
      id: 0,
      name: '',
      email: ''
    };
  }

  updateTask(project: Project) {
    this.editMode = true;
    this.projectData = { ...project };
    this.users = this.projectData.users.map((e: User) => e.id);
  }

  deleteTask(project: Project) {

  }

  onUserSelect(event: Event) {
    this.projectData.users = event;
  }
}
