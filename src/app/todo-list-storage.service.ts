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
      created_date: '2020/12/12',
      description: 'hALAL'
    },
    {
      title: 'Pick up groceries',
      created_date: '2020/12/12',
      description: 'hALAL'
    },
    {
      title: 'Go home',
      created_date: '2020/12/12',
      description: 'hALAL'
    },
    {
      title: 'Fall asleep',
      created_date: '2020/12/12',
      description: 'hALAL'
    }
  ];
  public default_doneList = [
    {
      title: 'Run 10km',
      created_date: '2020/12/12',
      description: 'hALAL'
    },
    {
      title: 'Talk to sister',
      created_date: '2020/12/12',
      description: 'hALAL'
    },
    {
      title: 'Go on a trip',
      created_date: '2020/12/12',
      description: 'hALAL'
    },
  ];
  public default_inProgressList = [
    {
      title: 'Brush teeth',
      created_date: '2020/12/12',
      description: 'hALAL'
    },
    {
      title: 'Take a shower',
      created_date: '2020/12/12',
      description: 'hALAL'
    },
    {
      title: 'Check e-mail',
      created_date: '2020/12/12',
      description: 'hALAL'
    },
    {
      title: 'Walk dog',
      created_date: '2020/12/12',
      description: 'hALAL'
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
    Object.assign(this.default_todoList[this.findItemIndex(item)], changes);
    return this.updateStorage();
  }

  // remove an item
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
