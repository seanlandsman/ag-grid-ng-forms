import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form-cell',
    template: `
        <div [formGroup]="form">
            <input [formControlName]="key" [id]="key" type="text">
        </div>
    `
})
export class FormCellComponent {
    form: FormGroup;
    key;

    agInit(params: any) {
        this.form = params.context.form;
        this.key = params.context.createKey(params.colDef.field, params.data);
    }
}
