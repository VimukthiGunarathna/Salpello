import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TodoListStorageService } from '../todo-list-storage.service';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todoItemForm: FormGroup
  public current_date;
  public todoItem;
  public todo;
  public done;
  public in_progress;

  constructor(
    private tdForm: FormBuilder,
    private todoListService:TodoListService
  ) { }

  ngOnInit(): void {
    this.todo = this.todoListService.getTodoList();
    this.todoItemForm = this.tdForm.group({
      title: '',
      description: '',
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  onSubmit() {
    let temp;
    temp = this.todoItemForm.getRawValue();
    this.todoItem = {
      title: temp.title,
      description: temp.description,
      created_date: this.getDate(),
      isDeleted:false
    }
    console.log(this.todoItem);
    this.todo.push(this.todoItem);
    console.log(this.todo);

    this.addTodoItem(this.todoItem);
  }

  getDate() {
    this.current_date = new Date();
    return this.current_date;
  }

  addTodoItem(todoItem){
    this.todo = this.todoListService.addItem(todoItem);
  }
}
