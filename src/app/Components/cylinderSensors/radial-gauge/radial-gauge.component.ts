import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as JSC from 'jscharting';

@Component({
  selector: 'app-chart',
  templateUrl: './radial-gauge.component.html',

})
export class RadialGaugeComponent implements AfterViewInit, OnChanges {
  @Input() data: any[] = []; 
  chart!: JSC.Chart; 
  chartInitialized = false; 

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data'] && this.data.length > 0) {
      if (this.chartInitialized) {
        const temperatura = this.data[0]?.measurementValue || 0;
        this.setGauge(100, temperatura); 
      }
    }
  }

  initChart(): void {
    if (this.chartInitialized) {
      return;
    }

    try {
      this.chart = JSC.chart('chartDiv1', {
        debug: true,
        type: 'gauge',
        animation_duration: 1000,
        legend_visible: false,
        xAxis: { spacingPercentage: 0.25 },
        yAxis: {
          defaultTick: { padding: -5, label_style_fontSize: '14px' },
          line: { width: 9, color: 'smartPalette', breaks_gap: 0.06 },
          scale_range: [0, 100],
        },
        palette: {
          pointValue: '{%value/100}',
          colors: ['green', 'yellow', 'red'],
        },
        defaultTooltip_enabled: false,
        defaultSeries: {
          angle: { sweep: 180 },
          shape: {
            innerSize: '70%',
            label: {
              text: `<span color="%color">{%sum:n1}</span><br/><span color="#696969" fontSize="30px">°C</span>`,
              style_fontSize: '46px',
              verticalAlign: 'middle',
            },
          },
        },
        series: [{ type: 'column roundcaps', points: [{ id: '1', x: 'speed', y: 0 }] }],
      });

      this.chartInitialized = true;
      console.log('✅ Gráfico inicializado.');

      setTimeout(() => this.updateGauge(), 0);
    } catch (error) {
    }
  }

  setGauge(max: number, y: number): void {
    if (!this.chart) {
      return;
    }


    try {
      this.chart.options({
        series: [{
          points: [{ id: '1', x: 'speed', y: y }]
        }]
      });
    } catch (error) {
    }
  }

  updateGauge(): void {
    if (this.chart && this.data.length > 0) {
      const temperatura = this.data[0]?.measurementValue || 0;
      this.setGauge(100, temperatura);
    }
  }
}
