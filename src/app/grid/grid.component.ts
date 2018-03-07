import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

import {Column, ColumnApi, GridApi, GridReadyEvent, RowNode} from "ag-grid";
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

    gridForm: FormGroup = new FormGroup({});

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
    }

    gridReady(params: GridReadyEvent) {
        this.api = params.api;
        this.columnApi = params.columnApi;

        this.api.sizeColumnsToFit();

        this.createFormControls();

        // slight chicken and egg here - the grid cells will be created before the grid is ready, but
        // we need set formGroup up front
        // as such we'll create the grid (and cells) and force refresh the cells
        // FormCellComponent will then set the form in the refresh, completing the loop
        // this is only necessary once, on initialisation
        this.api.refreshCells({force: true})
    }

    private createFormControls() {
        let columns = this.columnApi.getAllColumns();

        // todo add FormArray for each row
        this.api.forEachNode((rowNode: RowNode) => {
            columns.forEach((column: Column) => {
                const key = this.createKey(rowNode.id, column);
                const value = rowNode.data[column.getColDef().field];

                this.gridForm.addControl(key, new FormControl(value))
            })
        });
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

    private createKey(rowId: string, column: Column) {
        return `${rowId}${column.getColId()}`;
    }
}
