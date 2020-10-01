import { Injectable } from '@angular/core';
const storageName = 'aah_todo_list';

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService {

  private todoList;
  constructor() {
    this.todoList = JSON.parse(localStorage.getItem(storageName));
  }

  // get items
  getList() {
    return [...this.todoList];
  }

  // add a new item
  addListItem(item) {
    this.todoList.push(item);
    return this.updateStorage();
  }

  // update an item
  updateListItem(item, changes) {
    Object.assign(this.todoList[this.findItemIndex(item)], changes);
    return this.updateStorage();
  }

  // remove an item
  deleteListItem(item) {
    this.todoList.splice(this.findItemIndex(item), 1);
    return this.updateStorage();
  }


  // Helper methods
  private updateStorage() {
    localStorage.setItem(storageName, JSON.stringify(this.todoList));

    return this.getList();
  }
  private findItemIndex(item) {
    return this.todoList.indexOf(item);
  }
}
