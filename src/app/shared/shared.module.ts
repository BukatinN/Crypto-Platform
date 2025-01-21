import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoChartComponent } from './crypto-chart/crypto-chart.component';
import {DxChartModule} from "devextreme-angular";



@NgModule({
  declarations: [
    CryptoChartComponent,
  ],
  imports: [
    CommonModule,
    DxChartModule,
  ],
  exports: [
    CryptoChartComponent,
  ],
})
export class SharedModule { }
