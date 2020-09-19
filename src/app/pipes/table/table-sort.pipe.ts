import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class TableSortPipe implements PipeTransform {

  transform(arraySource: any, field: string): any[] {
    if (!Array.isArray(arraySource)) {
      return;
    }
    arraySource.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return arraySource;
  }
}
