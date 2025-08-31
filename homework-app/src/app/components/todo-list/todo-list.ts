import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListItem, ToDoListItem } from '../to-do-list-item/to-do-list-item';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, ToDoListItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {

  protected inputedValue: string = '';

  protected todoList: ListItem[] = [
    { id: 1, text: 'Buy a new gaming laptop' },
    { id: 2, text: 'Complete previous task' },
    { id: 3, text: 'Create some angular app' },
  ]

  protected deleteItem(id: number) {

    let index = this.todoList.findIndex((item) =>
      item.id == id
    );
    this.todoList.splice(index, 1);
  }

  protected addItem() {
    let array = this.todoList.map( item => item.id);
    let maxIndex = Math.max(...array)
    this.todoList.push({id: maxIndex+1, text: this.inputedValue})
    this.inputedValue = '';
  }
}
