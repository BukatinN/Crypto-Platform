import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss',
})
export class MainPanelComponent implements OnInit{
  menuItems = [
    { title: 'Watchlist', route: '/watchlist', icon: 'description' },
    { title: 'Converter', route: '/converter', icon: 'sorted' },
    { title: 'Wallet', route: '/wallet', icon: 'money' },
  ];
  selectedIndex = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedIndex = this.menuItems.findIndex(
          (item) => item.route === event.urlAfterRedirects,
        );
      }
    });
  }

  onTabChange(event: any): void {
    const route = this.menuItems[event.component.option('selectedIndex')].route;
    this.router.navigate([route]);
  }
}
