import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
/* Material Modules*/
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule, MatButtonModule, MatFormFieldModule, MatInputModule} from "@angular/material";
/* ag-Grid Module*/
import {AgGridModule} from "ag-grid-angular";

import {AppComponent} from './app.component';
import {GridComponent} from './grid/grid.component';
import {FormCellComponent} from './grid/form-cell/form-cell.component';


@NgModule({
    declarations: [
        AppComponent,
        GridComponent,
        FormCellComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        AgGridModule.withComponents([FormCellComponent]),

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
