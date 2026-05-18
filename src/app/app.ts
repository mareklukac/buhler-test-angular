import { Component } from '@angular/core';
import { Header } from './header/header';
import { Nav } from './nav/nav';
import { Overview } from './overview/overview';

@Component({
  selector: 'app-root',
  imports: [Header, Nav, Overview],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
