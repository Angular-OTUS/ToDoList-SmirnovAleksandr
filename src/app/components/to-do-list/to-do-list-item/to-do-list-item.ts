import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ButtonComponent } from '../../common-ui/button-component/button-component';
import { CommonModule } from '@angular/common';
import { ShowTooltip } from '../../../directives/show-tooltip';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-to-do-list-item',
  imports: [
    ButtonComponent,
    CommonModule,
    ShowTooltip,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
})
export class ToDoListItem implements OnInit {
  @Input() text?: string;
  @Input() id!: number;
  @Input() selectedItemId?: number | null;
  @Input() isEdited?: boolean = false;
  @Output() deleteTaskEvent = new EventEmitter();
  @Output() saveTextTaskEvent = new EventEmitter();

  public taskFormControl = new FormControl(this.text ? this.text : '', [Validators.required]);

  ngOnInit() {
    if (!this.text) {
      this.text = '';
    }
    this.taskFormControl = new FormControl(this.text, [Validators.required]);
  }

  saveCurrentTask(text: string | null) {
    this.text = text ? text : '';
    this.isEdited = false;
    this.saveTextTaskEvent.emit(text);
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
