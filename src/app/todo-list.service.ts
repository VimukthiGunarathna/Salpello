import { Injectable } from '@angular/core';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private storage: TodoListStorageService) { }

  getList(type) {
    if (type == "todo") {
      return this.storage.getToDoList();
    }
    if (type == "done") {
      return this.storage.getDoneList();
    }
    if (type == "progress") {
      return this.storage.getInProgressList();
    }
  }

  addItem(item) {
    return this.storage.post(item);
  }
  deleteItem(item){
    return this.storage.delete(item);
  }
}
