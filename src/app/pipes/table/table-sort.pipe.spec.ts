/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TableSortPipe } from './table-sort.pipe';

describe('Pipe: TableSorte', () => {

  it('create an instance', () => {
    let pipe = new TableSortPipe();
    expect(pipe).toBeTruthy();
  });

  describe('TableSortPipe', () => {
    const pipe = new TableSortPipe();
    const dummyArray = [
      {
        id: 5,
        name: 'X'
      },
      {
        id: 3,
        name: 'A'
      }
    ];

    const sortArray = [
      {
        id: 3,
        name: 'A'
      },
      {
        id: 5,
        name: 'X'
      }
    ];

    it('transforms array by field `name`', () => {
        expect(pipe.transform(dummyArray, 'name')).toEqual(sortArray);
    });
  });
});
