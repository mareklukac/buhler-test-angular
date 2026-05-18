import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private destroyRef = inject(DestroyRef);
  time = signal(new Date());
  isDark = signal(false);

  toggleTheme() {
    this.isDark.update((v) => !v);
    document.body.classList.toggle('dark', this.isDark());
  }

  constructor() {
    const timeInterval = setInterval(() => {
      this.time.set(new Date());
    }, 60000);

    this.destroyRef.onDestroy(() => {
      clearInterval(timeInterval);
    });
  }
}
