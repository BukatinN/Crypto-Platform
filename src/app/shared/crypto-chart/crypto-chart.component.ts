import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
})
export class CryptoChartComponent {
  @Input() data: Array<{ argument: number; value: number }> = [];
}
