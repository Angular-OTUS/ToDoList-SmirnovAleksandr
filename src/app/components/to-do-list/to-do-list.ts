import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToDoListItem } from './to-do-list-item/to-do-list-item';
import { Loader } from '../common-ui/loader/loader';
import { ButtonComponent } from '../common-ui/button-component/button-component';
import { ShowTooltip } from '../../directives/show-tooltip';

export interface Task {
  id: number;
  text: string;
  description?: string | null;
}

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoListItem,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    Loader,
    ButtonComponent,
    ShowTooltip,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {
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
  public isLoading = true;
  public taskFormControl = new FormControl('', [Validators.required]);
  public descriptionFormControl = new FormControl('');
  public selectedItemId: number | null = null;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });
  }

  onAddTask(taskText: string | null, description: string | null) {
    if (taskText) {
      const lastId = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id : 0;
      this.tasks.push({ id: lastId + 1, text: taskText, description: description });
      this.taskFormControl.setValue('');
      this.descriptionFormControl.setValue('');
    } else {
      if (this.taskFormControl.hasError('required')) {
        this.taskFormControl.markAsTouched();
      }
    }
  }

  onListItemClick(taskId: number) {
    this.selectedItemId = taskId;
  }

  getTaskDescription(): string | null {
    if (this.selectedItemId === null || this.selectedItemId > this.tasks.length) {
      return '';
    }
    const task = this.tasks.find((task) => task.id === this.selectedItemId);
    if (!task) {
      console.log(`task not found`);
      return '';
    }
    return task.description !== undefined ? task.description : '';
  }
}
