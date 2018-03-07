import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

import {ColumnApi, GridApi, GridReadyEvent} from "ag-grid";
import {FormCellComponent} from "./form-cell/form-cell.component";

@Component({
    selector: 'app-grid',
    template: `
        <form (ngSubmit)="onSubmit()" [formGroup]="gridForm">
            <ag-grid-angular style="width: 750px; height: 200px;" class="ag-theme-fresh"
                             [rowData]="rowData"
                             [columnDefs]="columnDefs"

                             [frameworkComponents]="getComponents()"
                             [context]="getContext()"

                             (gridReady)="gridReady($event)">
            </ag-grid-angular>
            <button type="submit" [disabled]="!gridForm.valid">Save</button>
        </form>
        <p>Form value: {{ gridForm.value | json }}</p>
    `,
})
export class GridComponent {
    private api: GridApi;
    private columnApi: ColumnApi;

    gridForm: FormGroup;

    columnDefs;
    rowData;

    constructor(private formBuilder: FormBuilder) {
        this.columnDefs = [
            {field: "make", cellRenderer: 'formCell'},
            {field: "model", cellRenderer: 'formCell'},
            {field: "price", cellRenderer: 'formCell'}
        ];

        this.rowData = [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000},
            {make: "Seat", model: "Leon", price: 32000},
            {make: "Honda", model: "CRV", price: 35000},
        ];

        // slight chicken and egg here - the grid cells will be created before the grid is ready, but
        // we need set formGroup up front
        // as such we'll create the grid form based on the row data and NOT use the grid's API to iterate over the row nodes,
        // which would be a bit more flexible
        this.gridForm = this.createGridForm(
            this.columnDefs.map((colDef) => colDef.field),
            this.rowData
        );
    }

    gridReady(params: GridReadyEvent) {
        this.api = params.api;
        this.columnApi = params.columnApi;

        this.api.sizeColumnsToFit();
    }

    private createGridForm(columns: string[],
                           rowData: any[]): FormGroup {
        const groupedControls = {};

        // todo add FormArray for each row
        columns.forEach((column) => {
            rowData.forEach((data: any) => {
                const key = this.createKey(column, data);
                const value = data[column];

                groupedControls[key] = new FormControl(value);
            });
        });

        return new FormGroup(groupedControls);
    }

    getComponents() {
        return {'formCell': FormCellComponent};
    }

    getContext() {
        return {
            form: this.gridForm,
            createKey: this.createKey
        }
    }

    onSubmit() {
        console.log(JSON.stringify(this.gridForm.value));
    }

    private createKey(column: string, data: any) {
        let rowIdentifier = `${data.make}${data.model}`;
        return `${column}${rowIdentifier}`;
    }
}
