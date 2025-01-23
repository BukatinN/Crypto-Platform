import {Component, OnInit} from '@angular/core';
import {ThemeService} from "./core/services/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'crypto-platform';

  constructor(private themeService: ThemeService) {
    //this.themeService.setTheme('light'); // или 'dark'
  }

  ngOnInit(){
    //this.themeService.applyTheme();
  }
}
