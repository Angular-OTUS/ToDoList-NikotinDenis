import { Component, inject, OnInit } from '@angular/core';
import { ListItem } from '../../interfaces/list-item';
import { FormsModule } from '@angular/forms';
import { TodoListService } from '../../services/todo-list-service';
import { ListItemStatus } from '../../enums/todo-enums';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-item-view',
  imports: [FormsModule],
  templateUrl: './todo-item-view.html',
  styleUrl: './todo-item-view.css',
})
export class TodoItemView implements OnInit {

  protected selectedItem: ListItem;

  private activateRoute = inject(ActivatedRoute)
  private todoService = inject(TodoListService)

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params)=> {
      const id = params.get('id');
      this.selectedItem = this.todoService.getListItem(Number(id));
    })
  }

  public check(){
    return this.selectedItem?.status == ListItemStatus.Completed ? true : false;
  }



  protected onChanged($event) {
    if ($event.target.checked) {
      this.todoService.fullfillItem(this.selectedItem.id);
    }
  }

}
