import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexFill,
  ApexStroke,
  ApexResponsive,
  ApexDataLabels,
  ApexOptions,
} from 'ng-apexcharts';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  chartOptions: Partial<ApexOptions> | any;

  ngOnInit(): void {
    this.initializeChart();
  }

  initializeChart(): void {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
          chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };
      }
}
