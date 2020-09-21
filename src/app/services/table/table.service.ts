import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { EMPTY, Observable, of, range } from 'rxjs';
import { catchError, concatMap, delay, switchMap } from 'rxjs/operators';
import { ItemType } from 'src/app/models';
import { TableType } from './../../models/table/table.type';

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

  private randomRange(beginRange: number, endRange: number): Observable<number> {
    return range(beginRange, endRange).pipe(
      concatMap(rangeInterval => of(rangeInterval).pipe(
        delay(1000 + Math.random() * 3000),
      ))
    );
  }

  public getRandomRange(endRange: number = 3): Observable<number> {
    let beginRange = 1;
    return this.randomRange(beginRange, endRange).pipe(
      switchMap((i) => {
        if (i === endRange) {
          return this.getRandomRange( Math.floor(Math.random() * 1000) );
        } else {
          return of(i);
        }
      })
    );
  }
}
