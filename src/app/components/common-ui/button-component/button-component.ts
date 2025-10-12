import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TypeButton } from '../../../types/common.types';

@Component({
  selector: 'app-button-component',
  imports: [CommonModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  @Input() isDelete = false;
  @Input() isAdd = false;
  @Input() isEdit = false;
  @Input() isDisabled = false;
  @Input() type: TypeButton = 'button';
}
