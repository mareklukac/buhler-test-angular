import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private destroyRef = inject(DestroyRef);
  time = signal(new Date());
  isDark = signal(this.resolveInitialTheme());

  toggleTheme() {
    this.isDark.update((v) => !v);
    document.body.classList.toggle('dark', this.isDark());
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
  }

  constructor() {
    document.body.classList.toggle('dark', this.isDark());

    const timeInterval = setInterval(() => {
      this.time.set(new Date());
    }, 60000);

    this.destroyRef.onDestroy(() => {
      clearInterval(timeInterval);
    });
  }

  private resolveInitialTheme(): boolean {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
