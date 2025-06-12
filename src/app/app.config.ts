import { ApplicationConfig, provideZoneChangeDetection, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { groceryReducer } from './store/reducers/grocery.reducer';
import { bucketReducer } from './store/reducers/bucket.reducer';
import { GroceryEffects } from './store/effects/grocery.effect';
import { taskReducer } from './exercises/exercise-one/store/task.reducer';
import { userReducer } from './exercises/exercise-two/store/user.reducer';
import { projectReducer } from './exercises/exercise-two/store/project.reducer';
import { tasksReducer } from './exercises/exercise-two/store/task.reducer';
import { effectUserReducer } from './exercises/exercise-three/store/user.reducer';
import { UserEffect } from './exercises/exercise-three/store/user.effect';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      groceries: groceryReducer,
      bucket: bucketReducer,
      task: taskReducer,
      users: userReducer,
      projects: projectReducer,
      tasks: tasksReducer,
      effectUsers: effectUserReducer
    }),
    provideEffects(
      GroceryEffects,
      UserEffect
    ),
    provideStoreDevtools({

    })
  ]
};
