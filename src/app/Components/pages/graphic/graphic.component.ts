import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { GraphicService } from '../../../Services/metricService/graphic.service';
import { MeasurementResponse } from '../../../interfaces/graphic';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit, OnDestroy {
  selectedSensor: string = '';
  selectedDateTime: string = '';
  sensors = [
    { name: 'pH' },
    { name: 'Cloro' },
    { name: 'Temperatura' },
    { name: 'Turbidez' },
    { name: 'Flujo' },
    { name: 'Color' }
  ];

  private root?: am5.Root;
  private chart?: am5xy.XYChart;
  private series?: am5xy.LineSeries;

  constructor(private graphicService: GraphicService) {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    this.root?.dispose();
  }

  createChart(): void {
    if (this.root) {
      this.root.dispose();
    }

    this.root = am5.Root.new('chartdiv');
    this.root.setThemes([am5themes_Animated.default.new(this.root)]);

    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      })
    );

    let xAxis = this.chart.xAxes.push(
      am5xy.DateAxis.new(this.root, {
        maxDeviation: 0.2,
        baseInterval: { timeUnit: 'minute', count: 1 },
        renderer: am5xy.AxisRendererX.new(this.root, {})
      })
    );

    let yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );

    this.series = this.chart.series.push(
      am5xy.LineSeries.new(this.root, {
        name: 'Sensor Data',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        valueXField: 'date',
        tooltip: am5.Tooltip.new(this.root, { labelText: '{valueY}' })
      })
    );

    this.series.data.setAll([]);
  }

  filtrarDatos(): void {
    if (!this.selectedSensor) return;
  
    console.log('Filtrando datos para:', this.selectedSensor);
  
    this.graphicService
      .getMeasurementHistory('08000015', 1, 6, 0, 10) // Usamos los valores de prueba
      .subscribe(
        (response: MeasurementResponse) => {
          console.log('Respuesta de la API:', response); // Para depuración
  
          if (response?.success && response.data?.measurementHistoryGraphic?.length) {
            const datos = response.data.measurementHistoryGraphic.map((item) => ({
              date: new Date(item.dateMeasurementComponent).getTime(),
              value: item.measurementValue
            }));
  
            this.series?.data.setAll(datos);
            this.series?.appear(1000);
          } else {
            console.warn('No se encontraron datos para el gráfico.');
          }
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
  }

  submitDate(): void {
    console.log('Fecha seleccionada:', this.selectedDateTime);
    this.filtrarDatos();
  }
}
