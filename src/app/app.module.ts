import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
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
        AgGridModule.withComponents([FormCellComponent]),

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
