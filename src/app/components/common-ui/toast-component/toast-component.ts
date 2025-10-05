import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast-component',
  imports: [CommonModule],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.scss',
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() toasts: string[] = [];
  @Output() toastRemoved = new EventEmitter<string>();
  toastService = inject(ToastService);
  private subscription?: Subscription;

  private removingIndices = new Set();

  ngOnInit(): void {
    this.subscription = this.toastService.toastsChanged.subscribe((toasts: string[]) => {
      this.toasts = toasts;
    });
  }

  removeToast(toast: string): void {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.removingIndices.add(index);

      setTimeout(() => {
        this.toastRemoved.emit(toast);
        this.removingIndices.delete(index);
      }, 300);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
