import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Transaction} from "../../interfaces/transaction.interface";
import {WalletService} from "../../services/wallet.service";
import {UserToken} from "../../interfaces/users.interface";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  transactions$: Observable<Transaction[]>;
  tokens$: Observable<UserToken[]>;

  selectedTokenId: number | null = null;
  amount: number = 0;
  price: number = 0;

  constructor(private walletService: WalletService) {
    this.transactions$ = this.walletService.getTransactions();
    this.tokens$ = this.walletService.getUserTokens();
  }

  buy() {
    if (this.selectedTokenId && this.amount > 0 && this.price > 0) {
      this.walletService
        .buyToken(this.selectedTokenId, this.amount, this.price)
        .subscribe(() => {
          this.refreshData();
        });
    }
  }

  sell() {
    if (this.selectedTokenId && this.amount > 0 && this.price > 0) {
      this.walletService
        .sellToken(this.selectedTokenId, this.amount, this.price)
        .subscribe(() => {
          this.refreshData();
        });
    }
  }

  private refreshData() {
    this.transactions$ = this.walletService.getTransactions();
    this.tokens$ = this.walletService.getUserTokens();
  }
}
