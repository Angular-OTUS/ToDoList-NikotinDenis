/* eslint-disable @angular-eslint/no-output-on-prefix */
import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button-component/button-component';
import { ListItem} from '../../interfaces/list-item';
import { TipTextDirective } from '../../directives/tip-text.directive';
import { FormsModule } from '@angular/forms';
import { TodoListService } from '../../services/todo-list-service';
import { ListItemStatus } from '../../enums/todo-enums';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule,ButtonComponent, TipTextDirective, FormsModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css',
})
export class ToDoListItem {

  @Input() itemData: ListItem;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onChecked = new EventEmitter();

  private todoService = inject(TodoListService)

  protected checkboxStatus = computed(() => {
    return this.itemData.status == ListItemStatus.Completed ? true : false;
  })

  protected onDeleteClick(id: number){
    this.onDelete.emit(id);
  }

  protected onChanged($event){
    if($event.target.checked){
      this.todoService.fullfillItem(this.itemData.id);
    }
  }



}

