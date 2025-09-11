import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToDoListItem } from './to-do-list-item/to-do-list-item';
import { Loader } from '../common-ui/loader/loader';
import { ButtonComponent } from '../common-ui/button-component/button-component';

export interface Task {
  id: number;
  text: string;
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
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {
  public tasks: Task[] = [
    { id: 1, text: 'Покормить кота' },
    { id: 2, text: 'Создать шаблон компонента' },
    { id: 3, text: 'Придумать задачи для шаблона компонента' },
  ];
  public isLoading = true;
  public taskFormControl = new FormControl('', [Validators.required]);

  deleteTask(id: number): void {
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

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
