import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseOneComponent } from './exercises/exercise-one/exercise-one.component';
import { ExerciseTwoComponent } from './exercises/exercise-two/exercise-two.component';
import { ProjectsComponent } from './exercises/exercise-two/projects/projects.component';
import { TasksComponent } from './exercises/exercise-two/tasks/tasks.component';
import { UsersComponent } from './exercises/exercise-two/users/users.component';
import { ProjectDetailsComponent } from './exercises/exercise-two/project-details/project-details.component';

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
                path: '',
                redirectTo: 'one',
                pathMatch: 'full'
            },
            {
                path: 'one',
                component: ExerciseOneComponent
            },
            {
                path: 'two',
                component: ExerciseTwoComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'projects',
                        pathMatch: 'full'
                    },
                    {
                        path: 'projects',
                        component: ProjectsComponent
                    },
                    {
                        path: 'projects/view/:id',
                        component: ProjectDetailsComponent
                    },
                    {
                        path: 'tasks',
                        component: TasksComponent
                    },
                    {
                        path: 'users',
                        component: UsersComponent
                    }
                ]
            }
        ]
    }
];
