import {importProvidersFrom} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app/app.component';

import 'hammerjs';

bootstrapApplication(AppComponent, {
    providers:[importProvidersFrom([BrowserAnimationsModule])]
}).catch((err: any) => console.error(err));
