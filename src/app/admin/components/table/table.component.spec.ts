import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TableSortPipe } from 'src/app/pipes';
import { TableService } from 'src/app/services';
import { TableComponent } from './table.component';


describe('TableComponent', () => {

  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  let tableService: TableService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ TableSortPipe ],
      declarations: [ TableComponent ],
      providers: [{
        provide: TableService, useValue: {
          getSource: () => of({
            data: [
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
            ],
            count: 2
          }),
          getRandomRange: () => of(1)
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    tableService = TestBed.get(TableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
