import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexStroke,
  ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  fill: ApexFill;
  forecastDataPoints?: any;
};

@Component({
  selector: 'app-forescast-char',
  templateUrl: './forescast-char.component.html',
  styleUrls: ['./forescast-char.component.css']
})
export class ForescastCharComponent {
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Sales',
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }
      ],
      chart: {
        height: 200,
        type: 'line'
      },
      title: {
        text: 'Forecast',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#666'
        }
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000',
          '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000',
          '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001',
          '4/11/2001', '5/11/2001', '6/11/2001'
        ],
        tickAmount: 10,
        labels: {
          formatter: (value, timestamp, opts) =>
            opts.dateFormatter(new Date(timestamp || 0), 'dd MMM')
        }
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#00125e'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      }
    };
  }
}
