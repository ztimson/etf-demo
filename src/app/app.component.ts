import {CommonModule} from '@angular/common';
import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {timer} from './timer';
import {colorScheme} from './colorScheme';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
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
    templateUrl: './app.component.html'
})
export class AppComponent {
    @ViewChild('fileUploader') fileUploader!: ElementRef;
    @ViewChild('holdingInput') holdingInput!: ElementRef;

    autoCompleteList = new BehaviorSubject<string[]>([]); // Async pipe to provide autocomplete list after being filtered by the text input
    colorScheme = colorScheme; // colors
    chartResults: any[] = []; // This is where the chart reads the data from
    holdings: string[] = []; // All the merged holdings
    fileNames: string[] = []; // All the filenames
    mergedData: any = {}; // All the holdings merged together
    timer = (<any>window)['timer']; // Async pipe to display the timed data
    graphHoldings: string[] = []; // Holdings we are graphing

    // ngx-charts requires a different data structure than the hash map we built so I will use a setter to handle converting it when we go to save the processed data.
    private _data: any = {};
    get data() { return this._data; }
    set data(data) {
        this._data = data;

        // merge the files together
        this.mergedData = Object.values(data).reduce((acc: any, file: any) => {
            Object.keys(file).forEach(key =>  {
                if(!acc[key]) acc[key] = [];
                file[key].forEach((val: any) => acc[key].push(val));
            });
            return acc;
        }, {});

        // Store the keys for easy referencing
        this.fileNames = Object.keys(this.data);
        this.holdings = Object.keys(this.mergedData).sort();

        // Update the GUI
        this.autoCompleteList.next(this.holdings);
        this.updateGraph();
    }

    constructor(private ngZone: NgZone) {
        // Hack to connect angular context to the native one
        setInterval(() => this.timer = Math.round((<any>window)['timer'] * 10) / 10, 250);
    }

    remove(fileName: string) {
        // Remove the file
        delete this.data[fileName];
        this.data = Object.assign({}, this.data);
        this.updateGraph();
    }

    search(target?: any) {
        // Filter the holdings list by the text and push it through the async pipe
        if(!target || !target?.value) this.autoCompleteList.next(this.holdings);
        this.autoCompleteList.next(this.holdings.filter(holding => holding.toLowerCase().indexOf(target.value) != -1));
    }

    @timer
    upload(fileList?: FileList | null) {
        if(!fileList || !fileList.length) return;

        // Because we enabled uploading multiple fileNames at once we need to process each one individually
        const files: File[] = Array.from(fileList);
        files.forEach(file => {
            // Process CSV
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent) => {
                // Split the file into lines
                const lines = ((<FileReader>e.target).result as string).split('\n');

                // Use regex to grab the holding name and its % market value
                this.data = Object.assign(this.data, {[file.name]: lines.map((text: any) => {
                    const parse = /^(.+),.+?(\d+\.\d+)%/gm.exec(text);
                    return parse ? parse.slice(1) : 'Unknown';
                }).reduce((acc: any, line) => {
                    // The regex will turn lines that don't match into null values so lets filter those out here
                    if(!line) return acc;

                    // Add the parsed data into our data set
                    if(!acc[line[0]]) acc[line[0]] = [];
                    acc[line[0]].push(Number(line[1]));

                    return acc;
                }, {})});
            };
            reader.readAsText(file);
        });

        this.fileUploader.nativeElement.value = ""; // Clear the file input
    }

    updateGraph(holding?: string) {
        // Add holding to chart
        if(holding) {
            this.graphHoldings.push(holding);
            this.holdingInput.nativeElement.value = '';
        }

        // Take the merged data set and get everything ready for it to be charted
        this.chartResults = Object.keys(this.mergedData)
            .filter(key => this.graphHoldings.indexOf(key) != -1)
            .map(key => ({
                name: key,
                series: this.mergedData[key].map((val: any, i: number) => ({name: i, value: val}))
            }));
    }

    format(text: string) { return `${text} %`}
}
