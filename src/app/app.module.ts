import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MatButtonModule, MatChipsModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatToolbarModule,
        NgxChartsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
