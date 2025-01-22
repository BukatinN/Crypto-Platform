import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPanelComponent} from "./components/main-panel/main-panel.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DxListModule} from "devextreme-angular";
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import {HeaderComponent} from "./components/header/header.component";

@NgModule({
  declarations: [
    MainPanelComponent,
    ThemeToggleComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    DxListModule,
  ],
  exports: [
    MainPanelComponent,
    HeaderComponent,
  ],
})
export class CoreModule { }
