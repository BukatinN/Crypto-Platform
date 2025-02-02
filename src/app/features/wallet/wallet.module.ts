import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import {WalletComponent} from "./components/wallet/wallet.component";
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import {DxDataGridModule, DxLoadPanelModule, DxSparklineModule, DxTemplateModule} from "devextreme-angular";
import {DxoPagingModule} from "devextreme-angular/ui/nested";
import { TransactionsComponent } from './components/transactions/transactions.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    WalletComponent,
    PortfolioComponent,
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxSparklineModule,
    DxTemplateModule,
    DxoPagingModule,
    FormsModule,
  ],
})
export class WalletModule { }
