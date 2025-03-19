import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as JSC from 'jscharting';

@Component({
  selector: 'app-ph-gauge',
  templateUrl: './ph-gauge.component.html'

})
export class PhGaugeComponent implements AfterViewInit, OnChanges {
  @Input() data: any[] = [];
  chart!: JSC.Chart;
  chartInitialized = false;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      const phValue = this.data[0]?.measurementValue || 0;
      if (this.chartInitialized) {
        this.updateGauge(phValue);
      }
    }
  }

  initChart(): void {
    if (this.chartInitialized) {
      return;
    }

    try {
      this.chart = JSC.chart('chartDiv3', {
        debug: true,
        defaultSeries_type: 'gauge linear horizontal',
        xAxis: {
          defaultTick_enabled: false,
          customTicks: [100, 600, 700, 800, 850], 
          scale: { range: [350, 600] },
          line: {
            width: 5,
            color: 'smartPalette',
            breaks_gap: 0.03
          }
        },
        legend_visible: false,
        palette: {
          pointValue: '%yValue',
          ranges: [
            { value: 350, color: '#FF5353' },
          ]
        },
        defaultSeries: {
          defaultPoint_tooltip: '<b>%seriesName Score:</b> %yValue',
          shape_label: {
            text: '%name',
            verticalAlign: 'bottom',
            style_fontSize: 15
          }
        },
        series: [
          {
            name: '2017',
            points: [['score', [350, 658]]]
          },
        ]
      });

      this.chartInitialized = true;

      // Actualiza el gráfico inmediatamente después de la inicialización
      const phValue = this.data.length > 0 ? this.data[0]?.measurementValue || 0 : 0;
      this.updateGauge(phValue);

    } catch (error) {
      console.error('Error al inicializar el gráfico:', error);
    }
  }

  updateGauge(phValue: number): void {
    if (!this.chart) {
      return;
    }

    try {
      // Asegúrate de que el valor esté dentro del rango del gráfico
      const adjustedPhValue = Math.min(Math.max(phValue, 350), 600);
      this.chart.options({
        series: [{
          points: [['score', [350, adjustedPhValue]]] // Esto asegura que el gráfico se llene hacia la derecha
        }]
      });
    } catch (error) {
      console.error('Error actualizando el gráfico:', error);
    }
  }
}
