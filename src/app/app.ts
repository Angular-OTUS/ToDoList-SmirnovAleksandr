import { Component, inject, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { ToDoList } from './components/to-do-list/to-do-list';
import { ToastComponent } from './components/common-ui/toast-component/toast-component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [ToDoList, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ToDoList');
  currentToasts: string[] = [];
  toastService = inject(ToastService);

  constructor() {
    this.toastService.toastsChanged.subscribe((toasts: string[]) => {
      this.currentToasts = toasts;
    });
  }

  onToastRemoved(toast: string): void {
    this.toastService.removeToast(toast);
  }
}
