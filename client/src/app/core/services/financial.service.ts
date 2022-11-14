import { Injectable } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants/constants';

@Injectable()
export class FinancialService {

    private TICKERS_URL = '/api/tickers';
    private TICKER_DETAILS_URL = '/api/ticker/details';

    constructor(private httpService: HttpClient) { }

    getStockTickers(): Observable<any> {
        return this.httpService.get(Constants.BASE_URL + this.TICKERS_URL);
    }

    getStockTickerDetails(search: string): Observable<any> {
        const param = '?search=' + search;
        return this.httpService.get(Constants.BASE_URL + this.TICKER_DETAILS_URL + param);
    }

    testData(): Observable<any> {
        const body = {
            Since: '2020-11-13',
            Until: '2020-11-17',
            Search: 'BLK'
        };
        return this.httpService.get('https://echarts.apache.org/examples/data/asset/data/stock-DJI.json', {});
    }
}
