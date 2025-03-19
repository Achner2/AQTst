import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as JSC from 'jscharting';

@Component({
  selector: 'app-cloro-gauge-component',
  templateUrl: './cloro-gauge-component.component.html',
})
export class CloroGaugeComponentComponent implements AfterViewInit, OnChanges {
  @Input() data: any[] = [];
  chart!: JSC.Chart;
  chartInitialized = false;

  ngAfterViewInit(): void {
    setTimeout(() => this.initChart(), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('🔍 Datos recibidos en el componente:', this.data);

    if (changes['data'] && this.data.length > 0) {
      const cloroData = this.data[0];
      const cloroValue = cloroData.measurementValue;

      if (typeof cloroValue === 'number' && !isNaN(cloroValue)) {
        console.log('🌡️ Valor de cloro recibido:', cloroValue);

        if (this.chartInitialized) {
          setTimeout(() => this.updateGauge(cloroValue), 0);
        } else {
          console.warn('⚠️ El gráfico aún no está inicializado.');
        }
      } else {
        console.error('⚠️ El valor de cloro no es un número válido:', cloroValue);
      }
    }
  }

  initChart(): void {
    if (this.chartInitialized) {
      console.warn('⚠️ El gráfico ya está inicializado.');
      return;
    }

    try {
      this.chart = JSC.chart('chartDiv', {
        debug: true,
        defaultSeries_type: 'gauge linear vertical ',
        yAxis: {
          defaultTick_enabled: false,
          customTicks: [350, 600, 700, 800, 850],
          scale: { range: [350, 850] },
          line: {
            width: 5,
            color: 'smartPalette',
            breaks_gap: 0.03,
          },
        },
        legend_visible: false,
        palette: {
          pointValue: '%yValue',
          ranges: [
            { value: 350, color: '#FF5353' },
            { value: 600, color: '#FFD221' },
            { value: 700, color: '#77E6B4' },
            { value: [800, 850], color: '#21D683' },
          ],
        },
        defaultSeries: {
          defaultPoint_tooltip: '<b>%seriesName Score:</b> %yValue',
          shape_label: {
            text: '%name',
            verticalAlign: 'bottom',
            style_fontSize: 15,
          },
        },
        series: [
          {
            name: 'Cloro',
            points: [['score', [350, 0]]], 
          },
        ],
      });

      this.chartInitialized = true;
      console.log('✅ Gráfico inicializado.');

      if (this.data.length > 0) {
        const initialCloroValue = this.data[0].measurementValue;
        if (typeof initialCloroValue === 'number' && !isNaN(initialCloroValue)) {
          setTimeout(() => this.updateGauge(initialCloroValue), 0);
        }
      }
    } catch (error) {
      console.error('Error al inicializar el gráfico:', error);
    }
  }

  updateGauge(cloroValue: number): void {
    if (!this.chart) {
      console.warn('⚠️ El gráfico aún no está inicializado.');
      return;
    }

    console.log('📊 Actualizando gráfico con valor de cloro:', cloroValue);

    try {
      this.chart.options({
        series: [
          {
            points: [['score', [350, cloroValue]]] 
          },
        ],
      });
    } catch (error) {
      console.error('Error al actualizar el gráfico:', error);
    }
  }
}
