import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CurrencyService } from './currency.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),CurrencyService,HttpClient,HttpClientModule],


};
