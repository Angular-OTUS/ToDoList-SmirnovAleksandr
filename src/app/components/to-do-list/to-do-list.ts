import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToDoListItem } from './to-do-list-item/to-do-list-item';
import { Loader } from '../common-ui/loader/loader';
import { DataService } from '../../services/data.service';
import { Task, TypeStatus, TypeStatusFilter } from '../../types/common.types';
import { ToastService } from '../../services/toast.service';
import { MatSelectModule } from '@angular/material/select';
import { ToDoListCreate } from './to-do-list-create/to-do-list-create';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoListItem,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    Loader,
    ToDoListCreate,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit, OnDestroy {
  public isLoading = true;
  public selectedItemId: number | null = null;
  public editedItemId: number | null = null;
  public dataService = inject(DataService);
  public toastService = inject(ToastService);
  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public selectedFilter: TypeStatusFilter = 'All';
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>(); // корректно ли использовать один destroy для нескольких подписок?

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.dataService
      .getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.filterTasks();
          this.isLoading = false;
        },
        error: (error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
          this.isLoading = false;
        },
      });
  }

  filterTasks(): void {
    if (this.selectedFilter === 'All') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter((task) => task.status === this.selectedFilter);
    }
  }

  addTask(taskArr: [string, string | null]) {
    const taskText = taskArr[0];
    const description = taskArr[1];
    this.dataService
      .addTask({ text: taskText, description, status: 'InProgress' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadTasks();
          this.toastService.showToast(`✅ Добавлена задача: ${taskText}`);
        },
        error: (error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
        },
      });
  }

  deleteTask(id: number): void {
    this.dataService
      .deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.selectedItemId = null;
          this.loadTasks();
          this.cdr.detectChanges();
          this.toastService.showToast(`❌ Задача удалена!`);
        },
        error: (error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
        },
      });
  }

  saveTextTask(text: string, id: number): void {
    this.dataService
      .updateTask(id, { text })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.editedItemId = null;
          this.toastService.showToast(`✏️ Задача отредактирована: ${text}`);
        },
        error: (error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
        },
      });
  }

  changeTaskStatus(status: TypeStatus, id: number): void {
    this.dataService
      .updateTask(id, { status })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          if (status === 'Completed') {
            this.toastService.showToast(
              `✅ Задача выполнена: ${this.tasks.find((task) => task.id === id)?.text}`,
            );
          } else {
            this.toastService.showToast(
              `⏳ Задача в процессе: ${this.tasks.find((task) => task.id === id)?.text}`,
            );
          }
          this.loadTasks();
        },
        error: (error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
        },
      });
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
      console.log(`task not found: ${this.selectedItemId}`);
      return '';
    }
    return task.description !== undefined ? task.description : '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
