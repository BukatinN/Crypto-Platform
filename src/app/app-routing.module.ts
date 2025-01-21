import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'watchlist',
    pathMatch: 'full',
  },
  {
    path: 'watchlist',
    loadChildren: () => import('./features/watchlist/watchlist.module').then(m => m.WatchlistModule),
  },
  {
    path: 'converter',
    loadChildren: () => import('./features/converter/converter.module').then(m => m.ConverterModule),
  },
  {
    path: 'wallet',
    loadChildren: () => import('./features/wallet/wallet.module').then(m => m.WalletModule),
  },
  {
    path: '**',
    redirectTo: 'watchlist',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
