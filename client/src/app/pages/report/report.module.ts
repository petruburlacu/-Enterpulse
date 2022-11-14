import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { FinancialService } from '@core/services/financial.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HeadlinesService } from '@core/services/headlines.service';
import { StockChartComponent } from '../../core/components/stock-chart/stock-chart.component';
import { TrendChartComponent } from '../../core/components/trend-chart/trend-chart.component';
import { TableComponent } from '../../core/components/table/table.component';


@NgModule({
  declarations: [ReportComponent, StockChartComponent, TrendChartComponent, TableComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzIconModule,
    NzSpinModule,
    NzTableModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
  ],
  providers: [FinancialService, HeadlinesService]
})
export class ReportModule { }
