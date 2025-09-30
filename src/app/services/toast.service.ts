import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toastsChanged = new EventEmitter<string[]>();
  private toasts: string[] = [];

  showToast(message: string, duration = 3000): void {
    this.toasts.push(message);
    this.toastsChanged.emit([...this.toasts]);

    setTimeout(() => {
      this.removeToast(message);
    }, duration);
  }

  removeToast(message: string): void {
    const index = this.toasts.indexOf(message);
    if (index > -1) {
      this.toasts.splice(index, 1);
      this.toastsChanged.emit([...this.toasts]);
    }
  }
}
