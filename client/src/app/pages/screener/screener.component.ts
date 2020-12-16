import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialService } from '@core/services/financial.service';
import { TickerItem } from 'src/app/shared/models/ticker-item';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.less']
})
export class ScreenerComponent implements OnInit {

  inputTickerValue: string = '';
  tickerData: TickerItem[] = [];
  filteredTickerData: TickerItem[] = [];
  selectedTicker: TickerItem = null;
  isLoading: boolean = false;

  constructor(private financialService: FinancialService, private router: Router) { }

  ngOnInit(): void {
    this.getTickers();
  }

  getTickers(): void {
    this.financialService.getStockTickers().subscribe(response => {
      this.tickerData = response._PyTickerSymbols__stocks.companies;
      this.filteredTickerData = this.tickerData;
    });
  }

  onInputSearch(search: string): void {
    this.filteredTickerData = this.tickerData.filter(ticker => ticker.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

  onSelection(ticker: TickerItem): void {
    console.log(ticker);
  }

  trackByFn(index, item): number {
    return index;
  }

  getReport(): void {
    const ticker = this.inputTickerValue;
    console.log('Generating enterpulse report for: ' + this.inputTickerValue);
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    this.router.navigate([this.router.url + '/report', ticker]);
  }

}
