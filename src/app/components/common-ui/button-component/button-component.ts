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
  @Input() title?: string = 'button';
  @Input() isDelete = false;
  @Input() isAdd = false;
  @Input() isDisabled = false;
  @Input() type: TypeButton = 'button';
}
