import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'vehiculos-list',
    loadComponent: () => import('./pages/vehiculos-list/vehiculos-list.page').then( m => m.VehiculosListPage)
  },
];
