import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ViewTableDirective } from './directives/view-table/view-table.directive';
import { TableSortPipe } from './pipes/table/table-sort.pipe';
import { TableService } from './services/table/table.service';
import { TableComponent } from './components/table/table.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    TableSortPipe,
    ViewTableDirective,
    AppComponent,
    TableComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    TableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
