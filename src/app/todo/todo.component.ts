import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public todoItemForm: FormGroup
  public current_date;
  public todoItem;
  public todo = [
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
  constructor(
    private tdForm: FormBuilder
  ) { }

  ngOnInit(): void {
    this.todoItemForm = this.tdForm.group({
      title: '',
      description: '',
    });
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
  onSubmit() {
    let temp;
    temp = this.todoItemForm.getRawValue();
    this.todoItem = {
      title: temp.title,
      description: temp.description,
      created_date: this.getDate()
    }
    console.log(this.todoItem);
    this.todo.push(this.todoItem);
    console.log(this.todo);

  }
  getDate() {
    this.current_date = new Date();
    return this.current_date;
  }
}
