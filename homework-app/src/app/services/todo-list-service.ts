/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, HostListener, inject, Injectable, Renderer2 } from "@angular/core";
import { InputedData, ListItem } from "../interfaces/list-item";
import { EditTodoListItem } from "../components/edit-todo-list-item/edit-todo-list-item";

@Injectable({
    providedIn: 'root',
})
export class TodoListService {


    private editItemListDialogRef: ComponentRef<EditTodoListItem>;
    private environmentInjector = inject(EnvironmentInjector);
    private appRef = inject(ApplicationRef);



    public todoList: ListItem[] = [
        { id: 1, text: 'Buy a new gaming laptop', description: "Brand new gaming laptop get it right now !!!" },
        { id: 2, text: 'Complete previous task', description: "Dont forget to complete, it is important !!!" },
        { id: 3, text: 'Create some angular app', description: 'You have to create a new angular app for learning!!!' },
    ]

    public addItem(data: InputedData) {
        const array = this.todoList.map(item => item.id);
        const maxIndex = Math.max(...array)
        this.todoList.push({ id: maxIndex + 1, text: data.text, description: data.description })
    }

    public delete(id: number) {
        this.todoList = this.todoList.filter((item) => id !== item.id)
    }

    public changeItemTitle(id: number, title: string) {
        const listItem = this.getListItem(id);
        listItem.text = title;
        this.destroyEditTodoItemTitleDialog();
    }

    public getListItem(id: number): ListItem {
        return this.todoList.filter(item => item.id == id)[0]
    }

    public createEditTodoItemDialog(id: number, coordinates:{x:number; y: number}) {
        
        if(this.editItemListDialogRef){
            this.destroyEditTodoItemTitleDialog();
        }

        this.editItemListDialogRef = createComponent(EditTodoListItem, { environmentInjector: this.environmentInjector });

        this.appRef.attachView(this.editItemListDialogRef.hostView);
        document.body.appendChild(this.editItemListDialogRef.location.nativeElement);
        
        const itemListDialogElement = this.editItemListDialogRef.location.nativeElement;
        itemListDialogElement.style.left = `${coordinates.x}px`;
        itemListDialogElement.style.top = `${coordinates.y}px`;

        this.editItemListDialogRef.instance.id = id;
    }

    private destroyEditTodoItemTitleDialog() {
        this.appRef.detachView(this.editItemListDialogRef.hostView);
        this.editItemListDialogRef.destroy();
        this.editItemListDialogRef = null;
    }

}