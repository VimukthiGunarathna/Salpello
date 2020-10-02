import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Deault data import
import { default_inProgressList, default_todoList, default_doneList, default_deletedItems } from './todo/data/seed.data';

// Local storage buckets
const todoStorage = 'todo';
const doneStorage = 'done';
const progressStorage = 'progress';

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService {
  private todoList;
  private doneList;
  private inProgressList;
  private deletedItems;

  constructor(private httpClient: HttpClient) {
    this.todoList = JSON.parse(localStorage.getItem(todoStorage)) || default_todoList;
    this.doneList = JSON.parse(localStorage.getItem(doneStorage)) || default_doneList;
    this.inProgressList = JSON.parse(localStorage.getItem(progressStorage)) || default_inProgressList;
    this.deletedItems = JSON.parse(localStorage.getItem(progressStorage)) || default_deletedItems;
  }
  // GET calls
  getToDoList() {
    if (this.todoList != null) {
      return [...this.todoList];
    }
  }
  getDoneList() {
    if (this.doneList != null) {
      return [...this.doneList];
    }
  }
  getInProgressList() {
    if (this.inProgressList != null) {
      return [...this.inProgressList];
    }
  }
  getDeletedItems() {
    if (this.deletedItems != null) {
      return [...this.deletedItems];
    }
  }

  // POST calls
  post(item) {
    this.todoList.push(item);
    return this.updateStorage();
  }

  // UPDATE calls
  put(item, changes) {
    Object.assign(this.todoList[this.findItemIndex(item)], changes);
    return this.updateStorage();
  }

  // DELETE calls
  delete(item) {
    this.todoList.splice(this.findItemIndex(item), 1);
    return this.updateStorage();
  }


  validateTitle(title: string) {
    return this.findItemIndexofTitle(title)
  }


  // HELPER METHODS
  private updateStorage() {
    localStorage.setItem(todoStorage, JSON.stringify(this.todoList));
    return this.getToDoList();
  }

  /**
   * Returns 0 if the item exist
   * @param item : search item
   */
  private findItemIndex(item) {
    return this.todoList.indexOf(item);
  }

  /**
   * Returns 0 if the item exist
   * @param title : search item
   */
  private findItemIndexofTitle(title) {
    return this.todoList.map(function (e) { return e.title; }).indexOf(title);
  }
}
