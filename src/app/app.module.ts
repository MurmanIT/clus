import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { TableSortPipe } from './pipes/table/table-sort.pipe';
import { TableService } from './services/table/table.service';


@NgModule({
  declarations: [
    TableSortPipe,
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
