import { Component, Input, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import Utils from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-trend-chart',
  templateUrl: './trend-chart.component.html',
  styleUrls: ['./trend-chart.component.less']
})
export class TrendChartComponent implements OnInit {

  @Input() sentimentData: any[] = [];
  @Input() stockTickerName: string = '';

  chartOptions: EChartOption;

  constructor() { }

  ngOnInit(): void {
    this.setChartOptions();
  }

  splitSentimentData(): any {
    let dates = [];
    let vaderScores = [];
    let bertScores = [];

    this.sentimentData.forEach(entry => {
      dates = [...dates, entry.date];
      vaderScores = [...vaderScores, entry.scoreVader];
      bertScores = [...bertScores, entry.scoreBert];
    });
    return { dates, vaderScores, bertScores };
  }

  setChartOptions(): void {
    const data = this.splitSentimentData();
    console.log(data);
    this.chartOptions = {
      title: {
          text: 'Headlines Sentiment'
      },
      legend: {
          data: ['Vader Sentiment', 'BERT Sentiment']
      },
      toolbox: {
          // y: 'bottom',
          feature: {
              magicType: {
                  type: ['stack', 'tiled']
              },
              dataView: {},
              saveAsImage: {
                  pixelRatio: 2
              }
          }
      },
      tooltip: {},
      xAxis: {
          data: data.dates,
          splitLine: {
              show: false
          }
      },
      yAxis: {
      },
      series: [{
          name: 'Vader Sentiment',
          type: 'bar',
          data: data.vaderScores,
          animationDelay: (idx) => {
              return idx * 10;
          }
      }, {
          name: 'BERT Sentiment',
          type: 'bar',
          data: data.bertScores,
          animationDelay: (idx) => {
              return idx * 10 + 100;
          }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => {
          return idx * 5;
      }
  };

  }
}
