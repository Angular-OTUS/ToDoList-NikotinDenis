/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipTextDirective } from '../../directives/tip-text.directive';

@Component({
  selector: 'app-button-component',
  imports: [TipTextDirective],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css',
})
export class ButtonComponent {

  @Input() title: string;
  @Input() disabled: boolean;

  @Output() onButtonClicked = new EventEmitter();


  public onButtonClick(){
    this.onButtonClicked.emit();
  }

}
