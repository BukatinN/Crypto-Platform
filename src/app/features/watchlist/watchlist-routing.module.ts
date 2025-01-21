import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CryptoListComponent} from "./components/crypto-list/crypto-list.component";

const routes: Routes = [
  { path: '', component: CryptoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistRoutingModule { }
