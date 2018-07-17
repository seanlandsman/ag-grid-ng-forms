import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
/* Material Modules*/
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
} from "@angular/material";
/* Flex */
import {FlexLayoutModule} from "@angular/flex-layout";
/* ag-Grid Module*/
import {AgGridModule} from "ag-grid-angular";

import {AppComponent} from './app.component';
import {GridComponent} from './grid/grid.component';
import {FormCellComponent} from './grid/form-cell/form-cell.component';
import {BranchService} from "./branch.service";


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
        MatSelectModule,
        FlexLayoutModule,
        AgGridModule.withComponents([FormCellComponent]),

    ],
    providers: [BranchService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
