import { DatePipe } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private destroyRef = inject(DestroyRef);
  time = signal(new Date());

  constructor() {
    const timeInterval = setInterval(() => {
      this.time.set(new Date());
    }, 60000);

    this.destroyRef.onDestroy(() => {
      clearInterval(timeInterval);
    });
  }
}
