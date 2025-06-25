import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { provideToastr } from 'ngx-toastr';
// ngrx packages
import { MetaReducer, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
// local imports
import { routes } from './app.routes';
import { groceryReducer } from './store/reducers/grocery.reducer';
import { bucketReducer } from './store/reducers/bucket.reducer';
import { GroceryEffects } from './store/effects/grocery.effect';

// below change is use for store data in local storage
export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['task', 'projects', 'tasks', 'users'],
    storage: sessionStorage,
    rehydrate: true
  })(reducer);
}
export const metaReducers: MetaReducer[] = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      groceries: groceryReducer,
      bucket: bucketReducer,
      router: routerReducer
    }, {
      metaReducers
    }),
    provideEffects(
      GroceryEffects
    ),
    provideStoreDevtools({}),
    provideRouterStore(),
    provideToastr(),
    importProvidersFrom(NgxLoadingModule.forRoot({}))
  ]
};
