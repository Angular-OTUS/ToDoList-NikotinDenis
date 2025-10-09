/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoListItem } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from '../button-component/button-component';
import { ListItem } from '../../interfaces/list-item';
import { TipTextDirective } from '../../directives/tip-text.directive';
import { TodoListService } from '../../services/todo-list-service';
import { ToastsComponent } from '../Toasts/toasts-component/toasts-component';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule, ToDoListItem, ButtonComponent, MatInputModule, MatProgressSpinnerModule, TipTextDirective, ToastsComponent],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {

  protected isLoading: boolean = true;
  protected inputedValue: string = '';
  protected inputedDescription: string = '';
  protected selectedItemId: number;
  protected selectedItem: ListItem;

  private todoListService = inject(TodoListService);
  private toastService = inject(ToastService);

  private mouseX: number;
  private mouseY: number;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }

  protected deleteItem(id: number) {
    this.todoListService.delete(id);
    this.toastService.showToast({title:'Info', message: 'To do deleted', status:'info', duration: 3000});
  }

  protected addItem() {
    this.todoListService.addItem({ text: this.inputedValue, description: this.inputedDescription })
    this.inputedValue = '';
    this.inputedDescription = '';
    this.toastService.showToast({title:'Success', message: 'To do added', status:'success', duration: 3000});
  }

  protected getTodoList(): ListItem[] {
    return this.todoListService.todoList;
  }

  protected onItemClicked(itemId: number) {
    this.selectItemId(itemId);
  }

  protected onItemDblClicked(itemId: number) {
    this.editTodoItemTitle(itemId);
  }

  private selectItemId(itemId: number) {
    this.selectedItemId = itemId;
    this.selectedItem = this.todoListService.getListItem(itemId);
  }

  private editTodoItemTitle(itemId: number) {
    this.todoListService.createEditTodoItemDialog(itemId, {x: this.mouseX, y: this.mouseY} );
  }

  


}
