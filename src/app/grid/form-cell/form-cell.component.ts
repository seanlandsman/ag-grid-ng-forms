import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form-cell',
    template: `
        <div *ngIf="form" [formGroup]="form">
            <mat-form-field [floatLabel]="'never'" style="width: 100%">
                <input matInput [formControlName]="key" [id]="key" placeholder="Enter {{columnName}}">
            </mat-form-field>
        </div>
    `
})
export class FormCellComponent {
    form: FormGroup;
    key;
    private value;
    columnName: string;

    agInit(params: any) {
        this.columnName = params.column.colDef.headerName;
        this.key = params.context.createKey(params.node.id, params.column);
        this.value = params.value;
    }

    refresh(params: any): boolean {
        this.form = params.context.form;

        // this could also be done in GridComponent.createFormControls, but the cell component could be doing something with
        // the value, so it feels more natural that the control value be set here
        this.form.controls[this.key].patchValue(this.value);
        return true;
    }
}
