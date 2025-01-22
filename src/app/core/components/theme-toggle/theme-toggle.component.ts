import { Component } from '@angular/core';
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-theme-toggle',
  template: `
    <div class="theme-switch" (click)="toggleTheme()">
      <div class="switch" [class.dark]="isDarkMode">
        <div class="icon">
          <i *ngIf="!isDarkMode" class="fas fa-sun"></i>
          <i *ngIf="isDarkMode" class="fas fa-moon"></i>
        </div>
        <div class="circle"></div>
      </div>
    </div>
  `,
  styles: [`
    .theme-switch {
      width: 60px;
      height: 30px;
      background: var(--menu-bg);
      border-radius: 15px;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      transition: background 0.3s ease;

      .switch {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0 5px;
        position: relative;

        .icon {
          font-size: 14px;
          z-index: 1;
          transition: color 0.3s ease;

          i {
            color: var(--text-color);
          }

          .fa-sun {
            margin: 4px 0 0 30px;
          }
        }

        .circle {
          width: 20px;
          height: 20px;
          background: var(--text-color);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: left 0.3s ease;
        }

        &.dark {
          .circle {
            left: calc(100% - 25px);
          }
          .icon i {
            color: #ffd700;
          }
        }

        .circle {
          left: 5px;
        }
      }
    }
  `]
})
export class ThemeToggleComponent {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setTheme(this.isDarkMode ? 'dark' : 'light');
  }
}
