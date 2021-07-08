import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import AppModule from './app/app.module';
import environment from './environments/environment';

interface Error {
  status: string;
  statusText: string;
  error: { message: string | undefined } | undefined;
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: Error) => err);
