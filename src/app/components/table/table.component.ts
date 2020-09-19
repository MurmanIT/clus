import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter, pluck, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ItemType } from 'src/app/models';
import { TableService } from 'src/app/services';
import { TableType } from './../../models/table/table.type';

@Component({
  selector: 'app-table-components',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject();

  private sourceTable$: Observable<TableType> = this.tableService.getSource();

  private subjectTable$: BehaviorSubject<TableType> = new BehaviorSubject(null);

  public table$: Observable<ItemType[]> = this.subjectTable$.pipe(
    filter(table => !!table),
    pluck('data')
  );


  constructor(
    private tableService: TableService,
    private cdr: ChangeDetectorRef
  ) {
    this.sourceTable$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => this.subjectTable$.next(data));
  }

  public trackByMethod(index: number, name: ItemType): number {
    return name.id;
  };

  private randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  private updateTable(): void {
    this.tableService.getRandomRange().pipe(
      withLatestFrom(this.subjectTable$),
      switchMap(([interval, source]) => {
        const index = this.randomInt(0, source.data.length - 1);
        source.data[index] = {
          ...source.data[index], rating: index
        };
        return of(source);
      })
    ).subscribe((data) => {
        this.subjectTable$.next(data);
        this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.updateTable();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
