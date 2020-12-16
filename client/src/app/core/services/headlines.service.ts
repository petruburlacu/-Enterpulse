import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants/constants';

@Injectable()
export class HeadlinesService {

    private HEADLINES_SENTIMENT_URL = '/api/ticker/headlines/sentiment';
    private HEADLINES_URL = '/api/ticker/headlines';

    constructor(private httpService: HttpClient) { }

    getHeadlinesSentiment(search: string): Observable<any> {
        const param = '?search=' + search;
        return this.httpService.get(Constants.BASE_URL + this.HEADLINES_SENTIMENT_URL + param);
    }

    getHeadlines(search: string): Observable<any> {
        const param = '?search=' + search;
        return this.httpService.get(Constants.BASE_URL + this.HEADLINES_URL + param);
    }

}
