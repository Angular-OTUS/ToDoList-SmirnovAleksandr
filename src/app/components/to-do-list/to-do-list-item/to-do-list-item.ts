import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-to-do-list-item',
  imports: [],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItem {
  @Input() text!: string;
  @Input() id!: number;
  @Output() deleteTaskEvent = new EventEmitter<number>();

  deleteCurrentTask(id: number) {
    this.deleteTaskEvent.emit(id);
  }
}
