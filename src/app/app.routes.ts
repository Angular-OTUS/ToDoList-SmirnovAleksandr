import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./components/to-do-list/to-do-list-routes').then((c) => c.toDoListRoutes),
    title: 'Список задач',
  },
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
];
