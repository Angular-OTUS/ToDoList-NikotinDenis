/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { ListItem} from '../../interfaces/list-item';
import { TipTextDirective } from '../../directives/tip-text.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule,ButtonComponent, TipTextDirective, FormsModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
})
export class ToDoListItem {

  @Input() itemData: ListItem;
  @Output() onDelete = new EventEmitter<number>();

  protected onDeleteClick(id: number){
    this.onDelete.emit(id);
  }

}

