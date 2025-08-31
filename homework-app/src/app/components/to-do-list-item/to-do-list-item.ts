import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-to-do-list-item',
  imports: [CommonModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css'
})
export class ToDoListItem {

  @Input() itemData: ListItem;
  @Output() onDelete = new EventEmitter<number>();

  protected onDeleteClick(id: number){
    this.onDelete.emit(id);
  }

}

export interface ListItem{
  id: number;
  text: string;
} 
