import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

// Dependencies 
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faCog, faPlus, faPlusSquare, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons';

// Components 
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

// Service
import { TodoListStorageService } from './todo-list-storage.service';



@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [TodoListStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, faCog, faPlus,faPlusSquare,faEllipsisV,faTrash);
  }
}
