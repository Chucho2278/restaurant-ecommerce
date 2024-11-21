import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import appConfig from './app/app.config';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core'; // Importar esto
import { HttpClientModule } from '@angular/common/http'; // Importar esto

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(HttpClientModule), // Añadir esto
  ],
});
