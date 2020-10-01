import { Injectable } from '@angular/core';
const storageName = 'aah_todo_list';

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService {
  private todoList;
  private doneList;
  private inProgressList;
  public defaultList = [
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
  public done = [
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
  public in_progress = [
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
    this.todoList = JSON.parse(localStorage.getItem(storageName)) || this.defaultList;
    this.doneList = JSON.parse(localStorage.getItem(storageName)) || this.done;
    this.inProgressList = JSON.parse(localStorage.getItem(storageName)) || this.in_progress;
  }

  // get items
  getTodoList() {
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
    localStorage.setItem(storageName, JSON.stringify(this.todoList));
    return this.getTodoList();
  }

  private findItemIndex(item) {
    return this.todoList.indexOf(item);
  }

}
