import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableComponent } from './components';
import { TableSortPipe } from './pipes';
import { TableService } from './services';



@NgModule({
  declarations: [
    TableComponent,
    TableSortPipe,
  ],
  imports: [
    CommonModule,
  ],
  providers:[
    TableService
  ]
})
export class AdminModule { }
