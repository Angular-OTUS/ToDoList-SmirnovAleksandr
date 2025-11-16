import { Routes } from '@angular/router';

export const toDoListRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./to-do-list').then((c) => c.ToDoList),
    title: 'Список задач',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./to-do-list-item-view/to-do-list-item-view').then((c) => c.ToDoListItemView),
      },
    ],
  },
];
