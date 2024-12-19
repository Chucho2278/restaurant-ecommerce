import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  withComponentInputBinding,
  Route,
} from '@angular/router';

const appRoutes: Route[] = [
  {
    path: 'users',
    loadComponent: () =>
      import('./users/user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
};

export default appConfig;
