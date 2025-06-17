import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectIdParam, selectTabQueryParam, selectRoutePath, selectAllRouteParams, selectAllQueryParams, selectRouteFragment, selectRouteTitle, selectRouteSegments } from './store/router.selector';

@Component({
  selector: 'app-exercise-five',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-five.component.html',
  styleUrl: './exercise-five.component.css'
})
export class ExerciseFiveComponent {

  // project-details.component.ts
  projectId = this.store.selectSignal(selectIdParam);
  tab = this.store.selectSignal(selectTabQueryParam);
  routePath = this.store.selectSignal(selectRoutePath);
  allParams = this.store.selectSignal(selectAllRouteParams);
  allQueries = this.store.selectSignal(selectAllQueryParams);
  fragment = this.store.selectSignal(selectRouteFragment);
  pageTitle = this.store.selectSignal(selectRouteTitle);
  segments = this.store.selectSignal(selectRouteSegments);

  constructor(private store: Store<any>) { }
}
