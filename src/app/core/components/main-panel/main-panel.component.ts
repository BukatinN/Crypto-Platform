import { Component } from '@angular/core';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss',
})
export class MainPanelComponent {
  tabs = [
    { label: 'Watchlist' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ];
  activeTabIndex = 0;

  selectTab(index: number) {
    this.activeTabIndex = index;
  }
}
