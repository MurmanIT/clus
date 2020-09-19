import { environment } from './../../../environments/environment';
import { ItemType } from 'src/app/models';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TableService } from './table.service';

describe('Service: Table', () => {
  let injector: TestBed;
  let service: TableService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TableService]
    });
    injector = getTestBed();
    service = injector.get(TableService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('#getSource', () => {
    it('should return an Observalbe<TableType>', () => {
      const dummyTable = [
        {
          id: 15,
          createdAt: '2020-09-17T19:10:24.113Z',
          moduleName: 'moduleName 15',
          modulePurpose: 71,
          rating: 96
        },
        {
          id: 17,
          createdAt: '2020-09-17T19:10:24.113Z',
          moduleName: 'moduleName 18',
          modulePurpose: 71,
          rating: 70
        }
      ];

      service.getSource().subscribe(data => {
        expect(data).toEqual({ data: dummyTable, count: dummyTable.length });
      });

      const req = httpMock.expectOne(`${environment.sourceAPI}v1/beacons`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyTable);

    });
  });
});
