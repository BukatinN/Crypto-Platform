import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {WatchlistModule} from "./features/watchlist/watchlist.module";
import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from "./core/core.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        WatchlistModule,
        CoreModule,
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
