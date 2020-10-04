import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TodoListStorageService } from '../todo-list-storage.service';
import { TodoListService } from '../todo-list.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  // Form data
  public todoItemForm: FormGroup;
  public updateItemForm: FormGroup

  // Functional variables
  public current_date;
  public todoItem;
  public updateItem;
  public selected_Item;

  // Collections for cards 
  public todo;
  public done;
  public in_progress;
  public deleted_items;




  constructor(
    private tdForm: FormBuilder,
    private todoListService: TodoListService,
    private httpService: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todo = this.todoListService.getList('todo');
    this.done = this.todoListService.getList('done');
    this.in_progress = this.todoListService.getList('progress');
    this.deleted_items = this.todoListService.getList('deleted');

    this.todoItemForm = this.tdForm.group({
      title: ['', [Validators.required], this.todoListService.isTitleValid.bind(this.todoListService)],
      description: ['', [Validators.required]],
    });

    this.updateItemForm = this.tdForm.group({
      title: ['', [Validators.required,]],
      description: ['', [Validators.required,]],
    });
  }

  get todoItemFormControl() {
    return this.todoItemForm.controls;
  }

  /**
   * Handling the browser refresh event to 
   * execute the replace collection function
   * @param event : browser refresh event
   */
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    if ((this.todo && this.deleted_items && this.done && this.in_progress) != null) {
      this.todoListService.replaceCollection(this.todo, this.deleted_items, this.in_progress, this.done);
    }
  }

  /**
   * Drag and drop functionality
   * @param event 
   */
  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /**
   * New todo item creation
   */
  public onSubmit() {
    if (this.todoItemForm.valid) {
      let temp;
      temp = this.todoItemForm.getRawValue();
      this.todoItem = {
        title: temp.title,
        description: temp.description,
        created_date: this.getDate()
      }
      this.todo.push(this.todoItem);
      this.addTodoItem(this.todoItem);
    }
  }

  /**
   * Currently selected item
   * @param item : Selected item 
   */
  public selectedItem(item) {
    console.log(item);

    this.selected_Item = item;
  }

  private addTodoItem(todoItem) {
    this.todo = this.todoListService.addItem(todoItem);
  }

  deleteItem(todoItem) {
    this.deleted_items.push(todoItem);
    this.todo = this.todoListService.deleteItem(todoItem);
  }

  /**
   * Update items on todo's list
   * @param todoItem : selected item 
   */
  editItem() {
    let temp;
    temp = this.updateItemForm.getRawValue();
    this.updateItem = {
      title: temp.title,
      description: temp.description,
      created_date: this.getDate()
    }
    this.todo = this.todoListService.updateItem(this.selected_Item, this.updateItem);
  }

  /**
   * Initialize the date object and returns the formated date
   */
  getDate() {
    const currentDate = new Date();
    this.current_date = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
    return this.current_date;
  }
}
