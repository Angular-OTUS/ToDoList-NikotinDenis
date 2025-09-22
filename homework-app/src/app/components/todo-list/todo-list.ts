/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from '../button-component/button-component';
import { ListItem } from '../../interfaces/list-item';
import { TipTextDirective } from '../../directives/tip-text.directive';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, ToDoListItem, ButtonComponent, MatInputModule, MatProgressSpinnerModule, TipTextDirective],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {

  protected isLoading: boolean = true;
  protected inputedValue: string = '';
  protected inputedDescription: string = '';
  protected selectedItemId: number;
  protected selectedItem: ListItem;


  protected todoList: ListItem[] = [
    { id: 1, text: 'Buy a new gaming laptop', description: "Brand new gaming laptop get it right now !!!" },
    { id: 2, text: 'Complete previous task', description: "Dont forget to complete, it is important !!!" },
    { id: 3, text: 'Create some angular app', description: 'You have to create a new angular app for learning!!!' },
  ]

  ngOnInit(): void {
    setTimeout(()=> {
      this.isLoading = false;
    }, 500)
  }

  protected deleteItem(id: number) {

    const index = this.todoList.findIndex((item) =>
      item.id == id,
    );
    this.todoList.splice(index, 1);
  }

  protected addItem() {
    const array = this.todoList.map(item => item.id);
    const maxIndex = Math.max(...array)
    this.todoList.push({ id: maxIndex + 1, text: this.inputedValue, description:this.inputedDescription })
    this.inputedValue = '';
    this.inputedDescription = '';
  }

  protected onItemClicked(itemId: number){
    this.selectItemId(itemId);
  }

  private selectItemId(itemId: number){
    this.selectedItemId = itemId;
    this.selectedItem = this.todoList.filter(item => item.id == this.selectedItemId)[0];
  }
}
