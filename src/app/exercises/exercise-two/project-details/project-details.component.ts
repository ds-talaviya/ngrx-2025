import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { User } from '../models/user';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { getTaskByProjectId } from '../store/task.selector';
import { getAllProjects, getUsersByProjectId } from '../store/project.selector';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe, TitleCasePipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {

  tasks$ = new Observable<Task[]>;
  users$ = new Observable<User[]>;
  id: number;

  constructor(private store: Store<any>, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe((e: any) => {
      this.id = e.id;
    })

    this.tasks$ = this.store.select(getTaskByProjectId(this.id))
    this.users$ = this.store.select(getUsersByProjectId(this.id))
  }
}
