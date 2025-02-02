import {Component, OnInit} from '@angular/core';
import {UserToken} from "../../interfaces/users.interface";
import {WalletService} from "../../services/wallet.service";
import {dxDataGridColumn} from "devextreme/ui/data_grid";
import {map, Observable} from "rxjs";
import DevExpress from "devextreme";
import off = DevExpress.common.core.events.off;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  tokens$: Observable<UserToken[]>;
  totalPortfolio$: Observable<number>;
  portfolioColumns: Array<dxDataGridColumn<any, any>> = [
    { dataField: 'name', caption: 'Asset' },
    { dataField: 'symbol', caption: 'Symbol' },
    { dataField: 'amount', caption: 'Amount' },
    { dataField: 'price', caption: 'Price', format: { type: 'currency', currency: 'USD'}},
    { dataField: 'total',  caption: 'Total', format: { type: 'currency', currency: 'USD'}, calculateCellValue: this.calculateTotal},
  ];
  loading: boolean = false;

  constructor(private walletService: WalletService) {
    this.tokens$ = this.walletService.getUserTokens();

    this.totalPortfolio$ = this.tokens$.pipe(
      map((tokens) =>
        tokens.reduce((total, token) => total + token.amount * token.price, 0),
      ),
    );
  }

  calculateTotal(rowData: UserToken): number {
    return rowData.amount * rowData.price;
  }
}
