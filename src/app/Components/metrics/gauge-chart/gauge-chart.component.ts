import { Component, OnInit, OnDestroy } from '@angular/core';
import * as echarts from 'echarts/core';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit, OnDestroy {
  private chart: any;
  private option: EChartsOption;
  private intervalId: any;
  public currentValue: number = 20;
  public status: string = 'Normal';
  public lastUpdate: string = 'Hace 2 segundos';

  constructor() {
    this.option = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: { color: this.getColor(this.currentValue) },
          progress: { show: true, width: 30 },
          pointer: { show: false },
          axisLine: { lineStyle: { width: 30 } },
          axisTick: { distance: -45, splitNumber: 5, lineStyle: { width: 2, color: '#999' } },
          splitLine: { distance: -52, length: 14, lineStyle: { width: 3, color: '#999' } },
          axisLabel: { distance: -20, color: '#999', fontSize: 20 },
          detail: { valueAnimation: true, width: '50%', lineHeight: 40, fontSize: 35, fontWeight: 'bolder', formatter: '{value} °C' },
          data: [{ value: this.currentValue }]
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: { color: '#a09e9d' },
          progress: { show: true, width: 8 },
          pointer: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          detail: { show: false },
          data: [{ value: this.currentValue }]
        }
      ]
    };
  }

  ngOnInit(): void {
    const chartDom = document.getElementById('main') as HTMLElement;
    this.chart = echarts.init(chartDom);
    this.chart.setOption(this.option);

    window.addEventListener('resize', this.resizeChart);

    this.intervalId = setInterval(() => {
      const random = +(Math.random() * 60).toFixed(2);
      this.currentValue = random;
      this.status = this.getStatus(random);
      this.lastUpdate = `Hace ${Math.floor(Math.random() * 5) + 1} segundos`;

      this.chart.setOption({
        series: [
          {
            data: [{ value: random }],
            itemStyle: { color: this.getColor(random) }
          },
          { data: [{ value: random }] }
        ]
      });
    }, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    window.removeEventListener('resize', this.resizeChart);
    this.chart.dispose();
  }

  private resizeChart = () => {
    this.chart?.resize();
  };

  private getColor(value: number): string {
    if (value < 20) return '#e24421'; // Bajo
    if (value >= 20 && value < 40) return '#21e2d0'; // Medio
    return '#21e238'; // Alto
  }

  private getStatus(value: number): string {
    if (value < 20) return 'Bajo';
    if (value >= 20 && value < 40) return 'Medio';
    return 'Alto';
  }
}