import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    document.body.className = '';
    document.body.classList.add(`${theme}-theme`);
  }

  getTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }
}
