import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ButtonComponent } from '../../common-ui/button-component/button-component';
import { CommonModule } from '@angular/common';
import { ShowTooltip } from '../../../directives/show-tooltip';

@Component({
  selector: 'app-to-do-list-item',
  imports: [ButtonComponent, CommonModule, ShowTooltip],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItem implements OnInit {
  @Input() text?: string;
  @Input() id!: number;
  @Input() selectedItemId?: number | null;
  @Output() deleteTaskEvent = new EventEmitter();

  ngOnInit() {
    if (!this.text) {
      this.text = '';
    }
  }

  deleteCurrentTask(id: number) {
    this.deleteTaskEvent.emit(id);
  }

  isSelected() {
    if (this.selectedItemId !== null) {
      if (this.selectedItemId === this.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
