import {Component, TemplateRef, ViewChild} from '@angular/core';
import {Cryptocurrency} from "../../../../core/interfaces/cryptocurrency.interface";
import {CryptoService} from "../../../../core/services/crypto.service";
import {dxDataGridColumn } from 'devextreme/ui/data_grid';
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrl: './crypto-list.component.scss',
})
export class CryptoListComponent {
  @ViewChild('priceHistoryTemplate', { static: true }) priceHistoryTemplate!: TemplateRef<any>;
  cryptocurrencies$: Observable<Cryptocurrency[]>;
  columns: Array<dxDataGridColumn<any, any>> = [
    { dataField: 'name', caption: 'Name' },
    { dataField: 'symbol', caption: 'Symbol' },
    { dataField: 'price', caption: 'Price', format: { type: 'currency', precision: 2 }},
    { dataField: 'marketCap',  caption: 'Market Cap', sortOrder: 'desc', format: { type: 'currency', currency: 'USD'}},
    { dataField: 'supply', caption: 'supply'},
    {
      caption: 'Price History',
      cellTemplate: 'chartCellTemplate',
      allowSorting: false,
      width: 200,
    },
  ];

  constructor( private cryptoServices: CryptoService) {
    this.cryptocurrencies$ = this.cryptoServices.getCryptoCurrencies()
      .pipe(
        map((cryptos) =>
          cryptos.map((crypto) => ({
              ...crypto,
              priceHistory: this.cryptoServices.getPriceHistory(crypto.price),
            }),
          ),
        ),
        tap((cryptocurrencies) => console.log('Updated cryptocurrencies:', cryptocurrencies)),
      );
  }

  onRowPrepared(event: any): void {
    // для стилизации строк таблицы
  }
}
