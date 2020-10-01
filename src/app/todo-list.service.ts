import { Injectable } from '@angular/core';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private storage: TodoListStorageService) { }

  getTodoList() {
    return this.storage.getTodoList();
  }

  addItem(item) {
    return this.storage.post(item);
  }
}
