import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinancialService } from '@core/services/financial.service';
import { HeadlinesService } from '@core/services/headlines.service';
import Utils from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {

  ticker: string = '';
  isLoading: boolean = false;
  isStockChartLoading: boolean = false;
  isTrendChartLoading: boolean = false;

  stockData: any[] = [];
  headlinesData: any[] = [];
  sentimentData: any[] = [];

  constructor(private financialService: FinancialService, private headlinesService: HeadlinesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getRouterParameter();
    this.getStockTickerDetails();
    this.getHeadlinesSentiment();
  }

  getRouterParameter(): void {
    this.route.params.subscribe(params => {
      console.log('Ticker: ', params.ticker);
      this.ticker = params.ticker;
      this.isLoading = false;
    });
  }

  getStockTickerDetails(): void {
    this.isStockChartLoading = true;
    this.financialService.getStockTickerDetails(this.ticker).subscribe(response => {
      this.stockData = response;
      this.isStockChartLoading = false;
    });
  }

  getDailyStockDetails(): void {
  }

  getHeadlinesSentiment(): void {
    this.isTrendChartLoading = true;
    this.headlinesService.getHeadlinesSentiment(this.ticker).subscribe(response => {
      this.headlinesData = response;
      this.sentimentData = Utils.groupSentimentByDate(response);
      this.isTrendChartLoading = false;
    });
  }

}
