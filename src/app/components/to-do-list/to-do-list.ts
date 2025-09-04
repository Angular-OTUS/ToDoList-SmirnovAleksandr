import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToDoListItem } from './to-do-list-item/to-do-list-item';

export interface Task {
  id: number;
  text: string;
}

@Component({
  selector: 'app-to-do-list',
  imports: [ToDoListItem, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList {
  btnDisabled = false;
  tasks: Task[] = [
    { id: 1, text: 'Покормить кота' },
    { id: 2, text: 'Создать шаблон компонента' },
    { id: 3, text: 'Придумать задачи для шаблона компонента' },
  ];

  taskFormControl = new FormControl('', [Validators.required]);

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });
  }

  onAddTask(text: string | null) {
    if (text) {
      const lastId = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id : 0;
      this.tasks.push({ id: lastId + 1, text });
      this.taskFormControl.setValue('');
    } else {
      if (this.taskFormControl.hasError('required')) {
        this.taskFormControl.markAsTouched();
      }
    }
  }
}
