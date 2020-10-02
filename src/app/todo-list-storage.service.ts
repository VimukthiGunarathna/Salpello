import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { default_inProgressList, default_todoList, default_doneList } from './todo/data/seed.data';

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


  filePath = '../assets/default-data.json';

  constructor(private httpClient: HttpClient) {
    this.todoList = JSON.parse(localStorage.getItem(todoStorage)) || default_todoList;
    this.doneList = JSON.parse(localStorage.getItem(doneStorage)) || default_doneList;
    this.inProgressList = JSON.parse(localStorage.getItem(progressStorage)) || default_inProgressList;
  }
  // get calls
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

  // post calls
  post(item) {
    this.todoList.push(item);
    return this.updateStorage();
  }

  // update calls
  put(item, changes) {
    Object.assign(this.todoList[this.findItemIndex(item)], changes);
    return this.updateStorage();
  }

  // delete calls
  delete(item) {
    this.todoList.splice(this.findItemIndex(item), 1);
    return this.updateStorage();
  }


  validateTitle(title: string) {
    return this.findItemIndexofTitle(title)
  }


  // Helper methods
  private updateStorage() {
    localStorage.setItem(todoStorage, JSON.stringify(this.todoList));
    return this.getToDoList();
  }

  private findItemIndex(item) {
    return this.todoList.indexOf(item);
  }

  private findItemIndexofTitle(title) {
    return this.todoList.map(function (e) { return e.title; }).indexOf(title);
  }
}
