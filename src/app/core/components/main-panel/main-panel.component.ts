import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.scss',
})
export class MainPanelComponent implements OnInit, OnDestroy {
  menuItems = [
    { title: 'Watchlist', route: '/watchlist', icon: 'description' },
    { title: 'Converter', route: '/converter', icon: 'sorted' },
    { title: 'Wallet', route: '/wallet', icon: 'money' },
  ];
  selectedIndex = 0;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => {
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
