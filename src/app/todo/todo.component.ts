import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo = [
    {
      title:'Get up',
      date:'2020/12/12',
      description:'hALAL'
    },
    {
      title:'Pick up groceries',
      date:'2020/12/12',
      description:'hALAL'
    },
    {
      title:'Go home',
      date:'2020/12/12',
      description:'hALAL'
    },
    {
      title:'Fall asleep',
      date:'2020/12/12',
      description:'hALAL'
    }
  ];

  done = [
    {
      title:'Brush teeth',
      date:'2020/12/12',
      description:'hALAL'
    },
    {
      title:'Take a shower',
      date:'2020/12/12',
      description:'hALAL'
    },
    {
      title:'Check e-mail',
      date:'2020/12/12',
      description:'hALAL'
    },
    {
      title: 'Walk dog',
      date:'2020/12/12',
      description:'hALAL'
    }   
  ];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
