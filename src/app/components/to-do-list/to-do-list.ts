import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToDoListItem } from './to-do-list-item/to-do-list-item';
import { Loader } from '../common-ui/loader/loader';
import { DataService } from '../../services/data.service';
import { Task, TaskStatus, TypeStatusFilter } from '../../types/common.types';
import { ToastService } from '../../services/toast.service';
import { MatSelectModule } from '@angular/material/select';
import { ToDoListCreate } from './to-do-list-create/to-do-list-create';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  imports: [
    ToDoListItem,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    Loader,
    ToDoListCreate,
    RouterOutlet,
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
  public router = inject(Router);
  public tasks: Task[] = [];
  public filteredTasks: Task[] = [];
  public selectedFilter: TypeStatusFilter = 'All';
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.dataService
      .getTasks()
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
          return of([]);
        }),
      )
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.filterTasks();
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
      .addTask({ text: taskText, description, status: TaskStatus.InProgress })
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
          return of([]);
        }),
      )
      .subscribe({
        next: () => {
          this.loadTasks();
          this.toastService.showToast(`✅ Добавлена задача: ${taskText}`);
        },
      });
  }

  deleteTask(id: number): void {
    this.dataService
      .deleteTask(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
          return of([]);
        }),
      )
      .subscribe({
        next: () => {
          this.loadTasks();
          this.cdr.detectChanges();
          this.toastService.showToast(`❌ Задача удалена!`);
        },
      });
  }

  saveTextTask(text: string, id: number): void {
    this.dataService
      .updateTask(id, { text })
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
          return of([]);
        }),
      )
      .subscribe({
        next: () => {
          this.editedItemId = null;
          this.toastService.showToast(`✏️ Задача отредактирована: ${text}`);
        },
      });
  }

  changeTaskStatus(status: TaskStatus, id: number): void {
    this.dataService
      .updateTask(id, { status })
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: Error) => {
          this.toastService.showToast(`⚠️ Ошибка! ${error.message}`);
          return of([]);
        }),
      )
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
      });
  }

  onListItemClick(taskId: number) {
    this.selectedItemId = taskId;
    this.router.navigate([`tasks/${taskId}`]);
  }

  onListItemDblClick(taskId: number) {
    this.editedItemId = taskId;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
