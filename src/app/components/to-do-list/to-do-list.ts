import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToDoListItem } from './to-do-list-item/to-do-list-item';
import { Loader } from '../common-ui/loader/loader';
import { ButtonComponent } from '../common-ui/button-component/button-component';
import { ShowTooltip } from '../../directives/show-tooltip';
import { DataService } from '../../services/data.service';
import { Task } from '../../types/common.types';
import { ToastService } from '../../services/toast.service';

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
  public isLoading = true;
  public taskFormControl = new FormControl('', [Validators.required]);
  public descriptionFormControl = new FormControl('');
  public selectedItemId: number | null = null;
  public editedItemId: number | null = null;
  public dataService = inject(DataService);
  public toastService = inject(ToastService);
  public tasks: Task[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    this.tasks = this.dataService.getTasks();
  }

  deleteTask(id: number): void {
    this.dataService.deleteTask(id);
    this.selectedItemId = null;
    this.loadTasks();
    this.toastService.showToast(`❌ Задача удалена!`);
  }

  saveTextTask(text: string, id: number): void {
    this.dataService.editTask(id, text);
    this.toastService.showToast(`✏️ Задача отредактирована: ${text}`);
  }

  onAddTask(taskText: string | null, description: string | null) {
    if (taskText) {
      const lastId = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id : 0;
      this.dataService.addTask({ id: lastId + 1, text: taskText, description });
      this.toastService.showToast(`✅ Добавлена задача: ${taskText}`);
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

  onListItemDblClick(taskId: number) {
    this.editedItemId = taskId;
  }

  getTaskDescription(): string | null {
    if (this.selectedItemId === null) {
      return '';
    }
    const task = this.tasks.find((task) => task.id === this.selectedItemId);
    if (!task) {
      // после удаления элемента при ховере на задачу срабатывает эта ветка, несмотря на обнуление this.selectedItemId
      // и пытается найти удаленный id. Почему?
      console.log(`task not found: ${this.selectedItemId}`);
      return '';
    }
    return task.description !== undefined ? task.description : '';
  }
}
