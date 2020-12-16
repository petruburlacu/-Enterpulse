import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('enterpulseTable', {static: false}) enterpulseTable?: NzTableComponent<any>;
  @ViewChild('defaultTemplate', {static: false}) defaultTemplate: TemplateRef<any>;

  @Input() tableData: any[] = [];
  @Input() tableColumns: any[] = [];
  @Input() tableType: string = '';

  private destroy$ = new Subject();
  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.setTableColumns();
  }

  ngAfterViewInit(): void {
    this.enterpulseTable?.cdkVirtualScrollViewport?.scrolledIndexChange.pipe(takeUntil(this.destroy$)).subscribe((data: number) => {
      console.log('scroll index to', data);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setTableTemplate(): TemplateRef<any> {
    return this.defaultTemplate;
  }

  scrollToIndex(index: number): void {
    this.enterpulseTable?.cdkVirtualScrollViewport?.scrollToIndex(index);
  }

  trackByIndex(_: number, data: any): number {
    return data.index;
  }

  setTableColumns(): void {
    this.tableColumns = [
      { header: 'Date', field: 'date', sort: true, width: '10%'},
      { header: 'Headline', field: 'text', sort: false, width: '65%'},
      { header: 'Vader Sentiment', field: 'vader_score', sort: true, width: '10%'},
      { header: 'BERT Sentiment', field: 'bert_score', sort: true, width: '15%'}
    ];
  }
}
