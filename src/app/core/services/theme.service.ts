import { Injectable } from '@angular/core';
import DevExpress from "devextreme";
import themes from 'devextreme/ui/themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly lightTheme = 'generic.light';
  private readonly darkTheme = 'generic.dark';
  private currentTheme: 'light' | 'dark' = 'light';

  constructor() {
    themes.ready(() => {
      const defaultTheme = themes.current() || this.lightTheme;
      this.currentTheme = defaultTheme.includes('dark') ? 'dark' : 'light';
      themes.current(defaultTheme);
      console.log(`Initial theme: ${themes.current()}`);
    });
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    document.body.className = '';
    document.body.classList.add(`${theme}-theme`);
    const devExtremeTheme = theme === 'light' ? this.lightTheme : this.darkTheme;
    themes.current(devExtremeTheme);

  }

  getTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }
}
