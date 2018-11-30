import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {timer} from './timer';
import {colorScheme} from './colorScheme';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    @ViewChild('fileUploader') fileUploader: ElementRef;
    @ViewChild('holdingInput') holdingInput: ElementRef;

    autoCompleteList = new BehaviorSubject<string[]>([]); // Async pipe to provide autocomplete list after being filtered by the text input
    colorScheme = colorScheme; // colors
    chartResults = []; // This is where the chart reads the data from
    holdings: string[] = []; // All the merged holdings
    fileNames: string[] = []; // All the filenames
    mergedData = {}; // All the holdings merged together
    timer = window['timer']; // Async pipe to display the timed data
    graphHoldings: string[] = []; // Holdings we are graphing

    // ngx-charts requires a different data structure than the hash map we built so I will use a setter to handle converting it when we go to save the processed data.
    private _data = {};
    get data() { return this._data; }
    set data(data) {
        this._data = data;

        // merge the files together
        this.mergedData = Object.values(data).reduce((acc, file) => {
            Object.keys(file).forEach(key =>  {
                if(!acc[key]) acc[key] = [];
                file[key].forEach(val => acc[key].push(val));
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
        setInterval(() => this.timer = Math.round(window['timer'] * 10) / 10, 250);
    }

    remove(fileName) {
        // Remove the file
        delete this.data[fileName];
        this.data = Object.assign({}, this.data);
        this.updateGraph();
    }

    search(text?: string) {
        // Filter the holdings list by the text and push it through the async pipe
        if(!text) this.autoCompleteList.next(this.holdings);
        this.autoCompleteList.next(this.holdings.filter(holding => holding.toLowerCase().indexOf(text) != -1));
    }

    @timer
    upload(fileList: FileList) {
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
                this.data = Object.assign(this.data, {[file.name]: lines.map(text => {
                    const parse = /^(.+),.+?(\d+\.\d+)%/gm.exec(text);
                    if(parse) return parse.slice(1);
                }).reduce((acc, line) => {
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
                series: this.mergedData[key].map((val, i) => ({name: i, value: val}))
            }));
    }

    format(text) { return `${text} %`}
}
