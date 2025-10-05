import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShowTooltip } from '../../../directives/show-tooltip';
import { ButtonComponent } from '../../common-ui/button-component/button-component';

@Component({
  selector: 'app-to-do-list-create',
  imports: [
    ButtonComponent,
    ShowTooltip,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './to-do-list-create.html',
  styleUrl: './to-do-list-create.scss',
})
export class ToDoListCreate {
  @Output() addTaskEvent = new EventEmitter();
  public taskFormControl = new FormControl('', [Validators.required]);
  public descriptionFormControl = new FormControl('');
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  onAddTask(taskText: string | null, description: string | null) {
    if (taskText) {
      const newTask: [string, string | null] = [taskText, description];
      this.addTaskEvent.emit(newTask);
      this.taskFormControl.setValue('', { emitEvent: false });
      this.taskFormControl.markAsPristine();
      this.taskFormControl.markAsUntouched();
      this.cdr.detectChanges();
      this.descriptionFormControl.setValue('', { emitEvent: false });
      this.descriptionFormControl.markAsPristine();
      this.descriptionFormControl.markAsUntouched();
    } else {
      if (this.taskFormControl.hasError('required')) {
        this.taskFormControl.markAsTouched();
      }
    }
  }
}
