import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseOneComponent } from './exercises/exercise-one/exercise-one.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'exercises',
        component: ExercisesComponent,
        children: [
            {
                path: 'one',
                component: ExerciseOneComponent
            }
        ]
    }
];
