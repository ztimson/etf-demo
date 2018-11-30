import {Component} from '@angular/core';
import {timer} from './timer';
import {colorScheme} from './colorScheme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    colorScheme = colorScheme; // colors
    chartResults; // This is where the chart reads the data from
    chartHeight = '100%'; // Dynamic height for chart
    timer = window['timer']; // Async pipe to display the timed data

    // ngx-charts requires a different data structure than the hash map we built so I will use a setter to handle converting it when we go to save the processed data.
    private _data = {};
    get data() { return this._data; }
    set data(data) {
        this._data = data;

        // merge the files together
        let mergedData = Object.values(data).reduce((acc, file) => {
            Object.keys(file).forEach(key =>  {
                if(!acc[key]) acc[key] = [];
                file[key].forEach(val => acc[key].push(val));
            });
            return acc;
        }, {});

        // Take the merged data set and get everything ready for it to be charted
        this.chartHeight = `${Object.keys(mergedData).length * 100}px`;
        this.chartResults = Object.keys(mergedData).map(key => ({name: key, series: mergedData[key].map((val, i) => ({name: i, value: val}))}));
    }

    get fileNames() { return Object.keys(this.data); }

    constructor() {
        setInterval(() => this.timer = Math.round(window['timer'] * 10) / 10, 250);
    }

    remove(fileName) {
        // Remove the file
        delete this.data[fileName];
        this.data = Object.assign({}, this.data);
    }

    @timer
    upload(fileList: FileList) {
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
    }

    format(text) { return `${text} %`}
}
