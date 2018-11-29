import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    chartResults; // This is where the chart reads the data from
    chartHeight = '100%';

    // ngx-charts requires a different data structure than the hash map we built so I will use a setter to handle converting it when we go to save the processed data.
    private _data;
    get data() { return this._data; }
    set data(data) {
        this._data = data;
        this.chartHeight = `${Object.keys(data).length * 100}px`;
        this.chartResults = Object.keys(data).map(key => ({name: key, series: data[key].map((val, i) => ({name: i, value: val}))}));
    }

    constructor() { }

    upload(fileList: FileList) {
        // Because we enabled uploading multiple files at once we need to process each one individually
        const files: File[] = Array.from(fileList);
        files.forEach(file => {
            // Process CSV
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent) => {
                // Split the file into lines
                const lines = ((<FileReader>e.target).result as string).split('\n');

                // Use regex to grab the holding name and its % market value
                this.data = lines.map(text => {
                    const parse = /^(.+),.+?(\d+\.\d+)%/gm.exec(text);
                    if(parse) return parse.slice(1);
                }).reduce((acc, line) => {
                    // The regex will turn lines that don't match into null values so lets filter those out here
                    if(!line) return acc;

                    // Add the parsed data into our data set
                    if(!acc[line[0]]) acc[line[0]] = [];
                    acc[line[0]].push(Number(line[1]));

                    return acc;
                }, this.data || {});
            };
            reader.readAsText(file);
        });
    }

    format(text) { return `${text} %`}
}
