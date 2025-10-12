import { Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/common-ui/toast-component/toast-component';
import { ToastService } from './services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ToastComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  protected readonly title = signal('ToDoList');
  currentToasts: string[] = [];
  toastService = inject(ToastService);
  private subscription: Subscription;

  constructor() {
    this.subscription = this.toastService.toastsChanged.subscribe((toasts: string[]) => {
      this.currentToasts = toasts;
    });
  }

  onToastRemoved(toast: string): void {
    this.toastService.removeToast(toast);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
