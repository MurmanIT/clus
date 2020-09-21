import { ItemType, TableType } from '@admin/models';
import { TableService } from '@admin/services';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, pluck, takeUntil } from 'rxjs/operators';

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

  private updateTable(): void {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
