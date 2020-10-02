import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
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
  deleteItem(item) {
    return this.storage.delete(item);
  }
  updateItem(item, changes) {
    return this.storage.put(item, changes);
  }

  isTitleValid(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateTitle(userControl.value)) {
          resolve({ titleNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateTitle(title: string) {
    console.log(this.storage.validateTitle(title));
    return (this.storage.validateTitle(title) > -1);
  }
}
