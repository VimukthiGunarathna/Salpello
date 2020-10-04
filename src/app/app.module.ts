import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Dependencies 
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faCog, faPlus, faPlusSquare, faEllipsisV, faTrash, faAngleDown } from '@fortawesome/free-solid-svg-icons';

// Components 
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

// Service
import { TodoListStorageService } from './todo-list-storage.service';
import { HttpClientModule } from '@angular/common/http';

//Materials
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';



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
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatExpansionModule
  ],
  providers: [TodoListStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, faCog, faPlus,faPlusSquare,faEllipsisV,faTrash,faAngleDown);
  }
}
