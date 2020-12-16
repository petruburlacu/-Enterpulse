import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.less']
})
export class StockChartComponent implements OnInit, OnDestroy {

  // https://stackoverflow.com/questions/57599052/how-to-import-a-type-definition-separately-from-module-import
  // Discussion to resolve chinese charts issue
  upColor = '#00da3c';
  downColor = '#ec0000';

  chartOptions: EChartOption;

  @Input() stockTickerName: string = 'TSLA';
  @Input() stockData: any[] = [];

  constructor() {
   }

  ngOnInit(): void {
    this.setChartOptions();
  }

  ngOnDestroy(): void {
  }

  /**
   * Populate echarts data
   *
   * @returns {*}
   * @memberof EnterpulseChartComponent
   */
  splitStockData(): any {
    let dates = [];
    let stockData = [];
    let stockVolumes = [];

    this.stockData.forEach(entry => {
      let stock = [];
      dates = [...dates, entry.date];
      stock = [...stock, entry.open];
      stock = [...stock, entry.close];
      stock = [...stock, entry.low];
      stock = [...stock, entry.high];
      stockData = [...stockData, stock];
      stockVolumes = [...stockVolumes, entry.volume];
    });
    return { dates, stockData, stockVolumes };
  }

  calculateMA(dayCount, data): any {
    const result = [];
    for (let i = 0, len = data.stockData.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += data.stockData[i - j][1];
      }
      result.push(+(sum / dayCount).toFixed(3));
    }
    return result;
  }

  // https://echarts.apache.org/examples/en/editor.html?c=candlestick-brush
  setChartOptions(): void {
    const data = this.splitStockData();
    this.chartOptions = {
      title: {
        text: 'Stock Data'
      },
      type: 'brush',
      areas: [
        {
          brushType: 'lineX',
          coordRange: data.dates,
          xAxisIndex: 0
        }
      ],
      animation: false,
      legend: {
        bottom: 10,
        left: 'center',
        data: [this.stockTickerName, 'MA5']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: (pos, params, el, elRect, size) => {
          const obj = { top: 10 };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        }
      },
      axisPointer: {
        link: { xAxisIndex: 'all' }
      },
      toolbox: {
        feature: {
          dataView: { show: true, title: 'Data View', readOnly: false },
          restore: { show: true, title: 'Reset' },
          saveAsImage: { show: true, title: 'Download' },
          dataZoom: {
            yAxisIndex: false
          },
          brush: {
            type: ['lineX', 'clear']
          },
        }
      },
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.1
        }
      },
      visualMap: {
        show: false,
        seriesIndex: 5,
        dimension: 2,
        pieces: [{
          value: 1,
          color: this.downColor
        }, {
          value: -1,
          color: this.upColor
        }]
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '50%'
        },
        {
          left: '10%',
          right: '8%',
          top: '63%',
          height: '16%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: data.dates,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        },
        {
          type: 'category',
          gridIndex: 1,
          data: data.dates,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 0,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          top: '85%',
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: this.stockTickerName,
          type: 'candlestick',
          data: data.stockData,
          itemStyle: {
            color: this.upColor,
            color0: this.downColor,
            borderColor: null,
            borderColor0: null
          },
          tooltip: {
            formatter: (param) => {
              param = param[0];
              return [
                'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                'Open: ' + param.data[0] + '<br/>',
                'Close: ' + param.data[1] + '<br/>',
                'Lowest: ' + param.data[2] + '<br/>',
                'Highest: ' + param.data[3] + '<br/>'
              ].join('');
            }
          },
          animationDelay: (idx) => {
            return idx * 10;
          }
        },
        {
          name: 'MA5',
          type: 'line',
          data: this.calculateMA(4, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5
          },
          animationDelay: (idx) => {
            return idx * 10 + 100;
          }
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.stockVolumes,
          animationDelay: (idx) => {
            return idx * 10 + 200;
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => {
        return idx * 5;
      }
    };
  }

}
