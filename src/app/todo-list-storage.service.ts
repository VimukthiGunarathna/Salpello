import { Injectable } from '@angular/core';
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
  public default_todoList = [
    {
      title: 'Get up',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
    {
      title: 'Pick up groceries',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
    {
      title: 'Go home',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
    {
      title: 'Fall asleep',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    }
  ];
  public default_doneList = [
    {
      title: 'Run 10km',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
    {
      title: 'Talk to sister',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
    {
      title: 'Go on a trip',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
  ];
  public default_inProgressList = [
    {
      title: 'Brush teeth',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
    {
      title: 'Take a shower',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
    {
      title: 'Check e-mail',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    },
    {
      title: 'Walk dog',
      date: '2020/12/12',
      description: 'hALAL',
      isDeleted: false
    }
  ];
  constructor() {
    this.todoList = JSON.parse(localStorage.getItem(todoStorage)) || this.default_todoList;
    this.doneList = JSON.parse(localStorage.getItem(doneStorage)) || this.default_doneList;
    this.inProgressList = JSON.parse(localStorage.getItem(progressStorage)) || this.default_inProgressList;
  }

  // get items
  getToDoList() {
    return [...this.todoList];
  }
  getDoneList() {
    return [...this.doneList];
  }
  getInProgressList() {
    return [...this.inProgressList];
  }

  // add a new item
  post(item) {
    this.todoList.push(item);
    return this.updateStorage();
  }

  // update an item
  put(item, changes) {
    Object.assign(this.todoList[this.findItemIndex(item)], changes);
    return this.updateStorage();
  }

  // remove an item
  delete(item) {
    this.todoList.splice(this.findItemIndex(item), 1);
    return this.updateStorage();
  }


  // Helper methods
  private updateStorage() {
    localStorage.setItem(todoStorage, JSON.stringify(this.todoList));
    return this.getToDoList();
  }

  private findItemIndex(item) {
    return this.todoList.indexOf(item.title);
  }

}
