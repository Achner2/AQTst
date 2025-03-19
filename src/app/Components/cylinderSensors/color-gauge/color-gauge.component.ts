import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as JSC from 'jscharting';

@Component({
  selector: 'app-color-gauge',
  templateUrl: './color-gauge.component.html',
})
export class ColorGaugeComponent {
  @Input() data: any[] = []; 
  chart!: JSC.Chart;
  chartInitialized = false;

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('🎨 Datos de color recibidos:', this.data);

    if (changes['data'] && this.data.length > 0) {
      const colorValue = this.data[0]?.measurementValue || 0;
      console.log('🎨 Valor de color:', colorValue);

      if (this.chartInitialized) {
        this.updateGauge(colorValue);
      } else {
        console.warn('⚠️ El gráfico aún no está inicializado.');
      }
    }
  }

  initChart(): void {
    if (this.chartInitialized) {
      return;
    }

    try {
      this.chart = JSC.chart('colorChart', {
        debug: true,
        type: 'gauge',
        animation_duration: 1000,
        legend_visible: false,
        xAxis: { spacingPercentage: 0.25 },
        yAxis: {
          defaultTick: { padding: -5, label_style_fontSize: '14px' },
          line: { width: 9, color: 'smartPalette', breaks_gap: 0.06 },
          scale_range: [0, 500], 
        },
        palette: {
          pointValue: '{%value/500}',
          colors: ['blue', 'green', 'yellow', 'red'],
        },
        defaultTooltip_enabled: false,
        defaultSeries: {
          angle: { sweep: 180 },
          shape: {
            innerSize: '70%',
            label: {
              text: `<span color="%color">{%sum:n1}</span><br/><span color="#696969" fontSize="30px">Pt-Co</span>`,
              style_fontSize: '46px',
              verticalAlign: 'middle',
            },
          },
        },
        series: [{ type: 'column roundcaps', points: [{ id: '1', x: 'color', y: 0 }] }],
      });

      this.chartInitialized = true;
      console.log('✅ Gráfico de color inicializado.');

      if (this.data.length > 0) {
        this.updateGauge(this.data[0].measurementValue || 0);
      }
    } catch (error) {
      console.error('Error al inicializar el gráfico:', error);
    }
  }

  updateGauge(value: number): void {
    if (!this.chart) {
      console.warn('⚠️ El gráfico aún no está inicializado.');
      return;
    }

    console.log('🎨 Actualizando gráfico de color con valor:', value);

    try {
      this.chart.options({
        series: [{ points: [{ id: '1', x: 'color', y: value }] }]
      });
    } catch (error) {
      console.error('Error al actualizar el gráfico:', error);
    }
  }
}
