import { Injectable } from '@angular/core';
import { Task } from '../types/common.types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tasks: Task[] = [
    { id: 1, text: 'Покормить кота', description: 'Покормить и не забыть налить ему воды' },
    {
      id: 2,
      text: 'Создать шаблон компонента',
      description: 'Создать шаблон для компонентов to-do-list-item и to-do-list',
    },
    {
      id: 3,
      text: 'Придумать задачи для шаблона компонента',
      description: 'Написать моковые задачи для приложения списка задач',
    },
  ];

  getTasks(): Task[] {
    if (this.tasks) {
      return this.tasks;
    } else {
      return [];
    }
  }

  addTask(task: Task): void {
    if (this.tasks) {
      this.tasks.push(task);
    }
  }

  deleteTask(id: number): void {
    if (this.tasks) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
  }

  editTask(id: number, text: string): void {
    if (this.tasks) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === id) {
          task.text = text;
        }
        return task;
      });
    }
  }
}
