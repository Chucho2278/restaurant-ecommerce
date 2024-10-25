import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};

export default appConfig;
