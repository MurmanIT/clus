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

  private sourceTable$: Observable<ItemType[]> = this.tableService.getSource();

  constructor(
    private tableService: TableService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
