import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form-cell',
    template: `
        <div *ngIf="form" [formGroup]="form">
            <input [formControlName]="key" [id]="key" type="text">
        </div>
    `
})
export class FormCellComponent {
    form: FormGroup;
    key;

    agInit(params: any) {
        this.key = params.context.createKey(params.node.id, params.column);
    }

    refresh(params: any) : boolean {
        this.form = params.context.form;
        return true;
    }
}
