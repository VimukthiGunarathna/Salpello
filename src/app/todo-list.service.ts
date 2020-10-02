import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TodoListStorageService } from './todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private storage: TodoListStorageService) { }

  /**
   * Get initial data collection
   * @param type : Type of data points
   */
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
    if (type == "deleted") {
      return this.storage.getInProgressList();
    }
  }

  /**
   * Add item to the local storage
   * @param item : Target item
   */
  addItem(item) {
    return this.storage.post(item);
  }

  /**
  * Add item to the local storage
  * @param item : Target item
  */
  deleteItem(item) {
    return this.storage.delete(item);
  }

  /**
  * Add item to the local storage
  * @param item : Target item
  */
  updateItem(item, changes) {
    return this.storage.put(item, changes);
  }

  /**
  * String validation for title property
  * @param userControl : user input dom values
  */
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

  /**
  * Search  title string in the collection 
  * @param title : inserted title string 
  */
  validateTitle(title: string) {
    console.log(this.storage.validateTitle(title));
    return (this.storage.validateTitle(title) > -1);
  }
}
