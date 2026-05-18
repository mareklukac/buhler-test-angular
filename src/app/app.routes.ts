import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./overview/overview').then((m) => m.Overview),
  },
  {
    path: 'machine/:name',
    loadComponent: () => import('./machine-detail/machine-detail').then((m) => m.MachineDetail),
  },
  { path: '**', redirectTo: '' },
];
