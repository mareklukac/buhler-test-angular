import { Component } from '@angular/core';
import { Header } from './header/header';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-root',
  imports: [Header, Nav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
