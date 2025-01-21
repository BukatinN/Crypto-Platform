import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPanelComponent} from "./components/main-panel/main-panel.component";

@NgModule({
  declarations: [
    MainPanelComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MainPanelComponent,
  ],
})
export class CoreModule { }
