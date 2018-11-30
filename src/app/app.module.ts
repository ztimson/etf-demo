import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule
} from '@angular/material';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        NgxChartsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
