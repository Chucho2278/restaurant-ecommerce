import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import appConfig from './app/app.config';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideRouter(routes, withComponentInputBinding())],
});
