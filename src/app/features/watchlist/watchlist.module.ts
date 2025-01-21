import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import {CryptoListComponent} from "./components/crypto-list/crypto-list.component";
import {DxDataGridModule, DxLoadPanelModule, DxSparklineModule} from "devextreme-angular";
import { HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    CryptoListComponent,
  ],
    imports: [
        CommonModule,
        WatchlistRoutingModule,
        DxDataGridModule,
        DxLoadPanelModule,
        HttpClientModule,
        SharedModule,
        DxSparklineModule,
    ],
  exports: [
    CryptoListComponent,
  ],
})
export class WatchlistModule { }
