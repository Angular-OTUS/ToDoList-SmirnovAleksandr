import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ButtonComponent } from '../../common-ui/button-component/button-component';

@Component({
  selector: 'app-to-do-list-item',
  imports: [ButtonComponent],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItem implements OnInit {
  @Input() text?: string;
  @Input() id!: number;
  @Output() deleteTaskEvent = new EventEmitter();

  ngOnInit() {
    if (!this.text) {
      this.text = '';
    }
  }

  deleteCurrentTask(id: number) {
    this.deleteTaskEvent.emit(id);
  }
}
