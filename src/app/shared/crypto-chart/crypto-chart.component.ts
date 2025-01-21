import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrl: './crypto-chart.component.scss',
})
export class CryptoChartComponent {
  @Input() data: Array<{ argument: number; value: number }> = [
    { argument: 0, value: 1 },
    { argument: 1, value: 1000 },
    { argument: 2, value: 100 },
    { argument: 3, value: 1 },
    { argument: 4, value: 1000 },
  ];
}
