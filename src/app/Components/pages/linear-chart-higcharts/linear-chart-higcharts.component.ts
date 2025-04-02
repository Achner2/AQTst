import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-linear-chart-higcharts',
  templateUrl: './linear-chart-higcharts.component.html',
  styleUrl: './linear-chart-higcharts.component.css'
})
export class LinearChartHigchartsComponent implements AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  
  localData: [number, number][] = [
    [Date.now() - 5000, 150],
    [Date.now() - 4000, 152],
    [Date.now() - 3000, 148],
    [Date.now() - 2000, 155],
    [Date.now() - 1000, 160]
  ];

  chart!: Highcharts.StockChart;
  customColor = '#bee78d';

  ngAfterViewInit(): void {
    this.chart = Highcharts.stockChart(this.chartContainer.nativeElement, {
      navigator: { enabled: true },
      credits: { enabled: false },
      scrollbar: { enabled: true },
      xAxis: { overscroll: 40 },
      series: [{
        name: 'Custom Data',
        data: this.localData,
        type: 'areaspline',
        threshold: null,
        tooltip: { valueDecimals: 2 },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, this.customColor],
            [
              1,
              (Highcharts as any).color(this.customColor)
                .setOpacity(0)
                .get('rgba')
            ]
          ]
        },
        color: this.customColor,
        lastPrice: {
          enabled: true,
          color: 'transparent',
          label: {
            enabled: true,
            backgroundColor: '#ffffff',
            borderColor: '#bee78d',
            borderWidth: 1,
            style: { color: '#000000' }
          }
        }
      }]
    });

    this.simulateDataFlow();
  }

  simulateDataFlow(): void {
    setInterval(() => {
      const newTime = Date.now();
      const newValue = 140 + Math.random() * 20; 
      this.localData.push([newTime, newValue]);
      if (this.localData.length > 20) {
        this.localData.shift(); 
      }
      
      const series = this.chart.series[0];
      series.setData(this.localData, true, false, false);
    }, 1000);
  }

  updateColor(newColor: string): void {
    this.customColor = newColor;
    this.chart.series[0].update({
          type: 'areaspline',
          color: this.customColor,
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, this.customColor],
              [
                1,
                (Highcharts as any).color(this.customColor)
                  .setOpacity(0)
                  .get('rgba')
              ]
            ]
          }
        }, true);
  }
}