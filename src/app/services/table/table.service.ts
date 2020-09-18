import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, range } from 'rxjs';
import { catchError, concatMap, delay } from 'rxjs/operators';
import { ItemType } from 'src/app/models';
import { environment }  from '@env';

@Injectable()

export class TableService {

  constructor(private http: HttpClient) { }

  getSource(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(`${environment.sourceAPI}v1/beacons`)
      .pipe(
        catchError(
          error => {
            console.error(error);
            return EMPTY;
          }
        )
      );
  };

  getRandomRange(): Observable<number> {
    return range(1, 10).pipe(
      concatMap(rangeInterval => of(rangeInterval).pipe(
        delay(1000 + Math.random() * 4000),
      ))
    );
  }
}
