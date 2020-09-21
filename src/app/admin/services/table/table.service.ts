import { ItemType, TableType } from '@admin/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()

export class TableService {

  constructor(private http: HttpClient) { }

  public getSource(): Observable<TableType> {
    return this.http.get<ItemType[]>(`${environment.sourceAPI}v1/beacons`)
      .pipe(
        switchMap((data) => {
          return of({
            data, count: data.length
          });
        }),
        catchError(
          error => {
            console.error(error);
            return EMPTY;
          }
        )
      );
  };
}
