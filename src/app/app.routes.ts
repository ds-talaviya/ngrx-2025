import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { taskReducer } from './exercises/exercise-one/store/task.reducer';
import { userReducer } from './exercises/exercise-two/store/user.reducer';
import { projectReducer } from './exercises/exercise-two/store/project.reducer';
import { tasksReducer } from './exercises/exercise-two/store/task.reducer';
import { effectUserReducer } from './exercises/exercise-three/store/user.reducer';
import { UserEffect } from './exercises/exercise-three/store/user.effect';
import { noteReducer } from './exercises/exercise-four/store/note.reducer';
import { NoteEffect } from './exercises/exercise-four/store/note.effect';
import { UserEffects } from './exercises/exercise-six/store/user.effects';
import { e6userReducer } from './exercises/exercise-six/store/user.reducer';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'exercises',
        loadComponent: () =>
            import('./exercises/exercises.component').then((m) => m.ExercisesComponent),
        children: [
            {
                path: '',
                redirectTo: 'one',
                pathMatch: 'full'
            },
            {
                path: 'one',
                loadComponent: () =>
                    import('./exercises/exercise-one/exercise-one.component').then((m) => m.ExerciseOneComponent),
                providers: [
                    provideState('task', taskReducer)
                ]
            },
            {
                path: 'two',
                loadComponent: () =>
                    import('./exercises/exercise-two/exercise-two.component').then((m) => m.ExerciseTwoComponent),
                children: [
                    {
                        path: '',
                        redirectTo: 'projects',
                        pathMatch: 'full'
                    },
                    {
                        path: 'projects',
                        loadComponent: () =>
                            import('./exercises/exercise-two/projects/projects.component').then((m) => m.ProjectsComponent),
                        providers: [
                            provideState('projects', projectReducer)
                        ]
                    },
                    {
                        path: 'projects/view/:id',
                        loadComponent: () =>
                            import('./exercises/exercise-two/project-details/project-details.component').then((m) => m.ProjectDetailsComponent),
                    },
                    {
                        path: 'tasks',
                        loadComponent: () =>
                            import('./exercises/exercise-two/tasks/tasks.component').then((m) => m.TasksComponent),
                        providers: [
                            provideState('tasks', tasksReducer)
                        ]
                    },
                    {
                        path: 'users',
                        loadComponent: () =>
                            import('./exercises/exercise-two/users/users.component').then((m) => m.UsersComponent),
                        providers: [
                            provideState('users', userReducer)
                        ]
                    }
                ]
            },
            {
                path: 'three',
                loadComponent: () =>
                    import('./exercises/exercise-three/exercise-three.component').then((m) => m.ExerciseThreeComponent),
                providers: [
                    provideState('effectUsers', effectUserReducer),
                    provideEffects(UserEffect)
                ]
            },
            {
                path: 'four',
                loadComponent: () =>
                    import('./exercises/exercise-four/exercise-four.component').then((m) => m.ExerciseFourComponent),
                providers: [
                    provideState('notes', noteReducer),
                    provideEffects(NoteEffect)
                ]
            },
            {
                path: 'five/:userId',
                loadComponent: () =>
                    import('./exercises/exercise-five/exercise-five.component').then((m) => m.ExerciseFiveComponent),
                title: 'Router Store'
            },
            {
                path: 'six',
                loadComponent: () =>
                    import('./exercises/exercise-six/exercise-six.component').then((m) => m.ExerciseSixComponent),
                providers: [
                    provideState('users', e6userReducer),
                    provideEffects(UserEffects)
                ]
            }
        ]
    }
];
