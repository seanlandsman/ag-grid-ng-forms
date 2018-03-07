import {Component, OnInit} from '@angular/core';
import {ColumnApi, GridApi, GridReadyEvent} from "ag-grid";

@Component({
    selector: 'app-grid',
    template: `
        <ag-grid-angular style="width: 750px; height: 200px;" class="ag-theme-fresh"
                         [rowData]="rowData"
                         [columnDefs]="columnDefs"
                         
                         (gridReady)="gridReady($event)"
        
        >
        </ag-grid-angular>
    `,
    styles: []
})
export class GridComponent implements OnInit {
    private api: GridApi;
    private columnApi: ColumnApi;

    columnDefs;
    rowData;

    constructor() {
        this.columnDefs = [
            {field: "make"},
            {field: "model"},
            {field: "price"}
        ];

        this.rowData = [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000}
        ]
    }

    ngOnInit() {
    }

    gridReady(params: GridReadyEvent) {
        this.api = params.api;
        this.columnApi = params.columnApi;

        this.api.sizeColumnsToFit();
    }
}
