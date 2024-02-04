import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MovieApiServiceService } from './service/movie-api-service.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),MovieApiServiceService]
};
