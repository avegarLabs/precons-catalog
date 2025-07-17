import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard/dashboard.component'),

    children: [
       {
        path: 'index',
        loadComponent: () =>
          import('./dashboard/pages/index/index.component'),
      },
      {
        path: 'resources',
        loadComponent: () =>
          import('./dashboard/pages/persons/persons.component'),
      },
      {
        path: 'workers',
        loadComponent: () =>
          import('./dashboard/pages/workers/workers.component'),
      },
      {
        path: 'equipment',
        loadComponent: () =>
          import('./dashboard/pages/equipments/equipments.component'),
      },
      {
        path: 'juego',
        loadComponent: () =>
          import('./dashboard/pages/juegos/juegos.component'),
      },
      {
        path: 'semi',
        loadComponent: () =>
          import('./dashboard/pages/semielaborados/semielaborados.component'),
      },
      {
        path: 'renglones',
        loadComponent: () =>
          import('./dashboard/pages/renglones/renglones.component'),
      },
       {
        path: 'search',
        loadComponent: () =>
          import('./dashboard/pages/search/search.component'),
      },

      {
        path: '**',
        redirectTo: 'index',
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
