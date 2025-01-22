import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss',
})
export class MainPanelComponent {
  menuItems = [
    { text: 'Watchlist', route: '/watchlist' },
    { text: 'Converter', route: '/converter' },
    { text: 'Wallet', route: '/wallet' }
  ];

  constructor(private router: Router) {}

  onMenuItemClick(event: any): void {
    this.router.navigate([event.itemData.route]);
  }
}
