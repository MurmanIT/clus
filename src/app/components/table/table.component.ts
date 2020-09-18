import { TableService } from '@app/services';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Self } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ItemType } from '@app/models';

@Component({
  selector: 'app-table-components',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject();

  public sourceTable$: Observable<ItemType[]> = this.tableService.getSource();

  public dataTable:ItemType[] = null;

  constructor(
    private tableService: TableService,
    private cdr: ChangeDetectorRef
  ) {}

  public trackByMethod(index: number, name: ItemType): number {
    return name.id;
  };

  ngOnInit() {
    this.sourceTable$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.dataTable = data;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
