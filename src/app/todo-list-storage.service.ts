import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Deault data import
import { default_inProgressList, default_todoList, default_doneList, default_deletedItems } from './todo/data/seed.data';

// Local storage buckets
const todoStorage = 'todo';
const doneStorage = 'done';
const progressStorage = 'progress';
const deleteStorage = 'delete';

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService {
  private todoList;
  private doneList;
  private inProgressList;
  private deletedItemsList;

  constructor(private httpClient: HttpClient) {
    if (this.todoList = JSON.parse(localStorage.getItem(todoStorage)) == null) {
      console.log('hi');
    }
    this.todoList = JSON.parse(localStorage.getItem(todoStorage)) || default_todoList;
    this.doneList = JSON.parse(localStorage.getItem(doneStorage)) || default_doneList;
    this.inProgressList = JSON.parse(localStorage.getItem(progressStorage)) || default_inProgressList;
    this.deletedItemsList = JSON.parse(localStorage.getItem(deleteStorage)) || default_deletedItems;
  }

  // GET calls
  public getToDoList() {
    if (this.todoList != null) {
      return [...this.todoList];
    }
  }
  public getDoneList() {
    if (this.doneList != null) {
      return [...this.doneList];
    }
  }
  public getInProgressList() {
    if (this.inProgressList != null) {
      return [...this.inProgressList];
    }
  }
  public getDeletedItems() {
    if (this.deletedItemsList != null) {
      return [...this.deletedItemsList];
    }
  }


  // POST calls
  public post(item) {
    this.todoList.push(item);
    return this.updateStorage();
  }

  // UPDATE calls
  public put(item, changes) {
    Object.assign(this.todoList[this.findItemIndex(item)], changes);
    return this.updateStorage();
  }
  public replaceStorageCollections(todo, deleted, progress, done) {
    localStorage.setItem(todoStorage, JSON.stringify(todo));
    localStorage.setItem(doneStorage, JSON.stringify(done));
    localStorage.setItem(progressStorage, JSON.stringify(progress));
    localStorage.setItem(deleteStorage, JSON.stringify(deleted));
  }

  // DELETE calls
  public delete(item) {
    this.todoList.splice(this.findItemIndex(item), 1);
    return this.updateStorage();
  }


  public validateTitle(title: string) {
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
