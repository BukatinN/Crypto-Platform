import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterRoutingModule } from './converter-routing.module';
import {ConverterComponent} from "./components/converter/converter.component";
import {DxButtonModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule} from "devextreme-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ConverterComponent,
  ],
    imports: [
        CommonModule,
        ConverterRoutingModule,
        DxNumberBoxModule,
        DxSelectBoxModule,
        DxButtonModule,
        DxTextBoxModule,
        FormsModule,
    ],
})
export class ConverterModule { }
