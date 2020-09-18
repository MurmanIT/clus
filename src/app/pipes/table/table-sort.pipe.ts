import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'table-sort'
})
export class TableSortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
