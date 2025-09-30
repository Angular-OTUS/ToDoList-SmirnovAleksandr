import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-component',
  imports: [CommonModule],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.scss',
})
export class ToastComponent implements OnInit {
  @Input() toasts: string[] = [];
  @Output() toastRemoved = new EventEmitter<string>();
  toastService = inject(ToastService);

  private removingIndices = new Set();

  ngOnInit(): void {
    this.toastService.toastsChanged.subscribe((toasts: string[]) => {
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
}
