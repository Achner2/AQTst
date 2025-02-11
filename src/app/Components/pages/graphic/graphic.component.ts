import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { GraphicService } from '../../../Services/metricService/graphic.service';
import { MeasurementResponse } from '../../../interfaces/graphic';


import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


interface SensorRange {
  from: number;
  to: number;
  color: string;
  label: string;
}

interface SensorConfig {
  name: string;
  componentType: number;
  parameter: number;
  ranges: SensorRange[];
  unit: string;
}


@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit, OnDestroy {
  selectedSensor: string = '';
  selectedDateTime: string = '';
  private allDataGraphic: { date: number; value: number }[] = [];
  private root!: am5.Root;
  private chart!: am5xy.XYChart;
  private series!: am5xy.LineSeries;
  private rangeDataSeries: am5xy.LineSeries[] = [];

  private readonly COLORS = {
    HIGH_HIGH: am5.color("rgba(255, 0, 0, 0.2)"),
    HIGH: am5.color("rgba(255, 165, 0, 0.2)"),
    NORMAL: am5.color("rgba(0, 255, 0, 0.2)"),
    LOW: am5.color("rgba(255, 255, 0, 0.2)"),
    LOW_LOW: am5.color("rgba(139, 0, 0, 0.2)")
  };

  private readonly sensorConfigs: { [key: string]: SensorConfig } = {
    'pH': {
      name: 'pH',
      componentType: 6,
      parameter: 1,
      unit: 'pH',
      ranges: [
        { from: 9.0, to: 14.0, color: '#ff0000', label: 'Alto-Alto' },
        { from: 8.5, to: 9.0, color: '#ffa500', label: 'Alto' },
        { from: 6.0, to: 8.5, color: '#00ff00', label: 'Normal' },
        { from: 5.7, to: 6.0, color: '#ffff00', label: 'Bajo' },
        { from: 0, to: 5.7, color: '#8b0000', label: 'Bajo-Bajo' }
      ]
    },
    'Cloro': {
      name: 'Cloro',
      componentType: 6,
      parameter: 0,
      unit: 'mg/L',
      ranges: [
        { from: 3.0, to: 5.0, color: '#ff0000', label: 'Alto-Alto' },
        { from: 2.8, to: 3.0, color: '#ffa500', label: 'Alto' },
        { from: 0.3, to: 2.8, color: '#00ff00', label: 'Normal' },
        { from: 0.2, to: 0.3, color: '#ffff00', label: 'Bajo' },
        { from: 0, to: 0.2, color: '#8b0000', label: 'Bajo-Bajo' }
      ]
    },
    'Temperatura': {
      name: 'Temperatura',
      componentType: 6,
      parameter: 2,
      unit: '°C',
      ranges: [
        { from: 35.0, to: 100.0, color: '#ff0000', label: 'Alto-Alto' },
        { from: 30.0, to: 35.0, color: '#ffa500', label: 'Alto' },
        { from: 1.0, to: 30.0, color: '#00ff00', label: 'Normal' },
        { from: 0.0, to: 1.0, color: '#ffff00', label: 'Bajo' },
        { from: -50.0, to: 0.0, color: '#8b0000', label: 'Bajo-Bajo' }
      ]
    },
    'Nivel': {
      name: 'Nivel',
      componentType: 7,
      parameter: 0,
      unit: 'm',
      ranges: [
        { from: 6.0, to: 10.0, color: '#ff0000', label: 'Alto-Alto' },
        { from: 5.3, to: 6.0, color: '#ffa500', label: 'Alto' },
        { from: 2.0, to: 5.3, color: '#00ff00', label: 'Normal' },
        { from: 1.0, to: 2.0, color: '#ffff00', label: 'Bajo' },
        { from: 0.0, to: 1.0, color: '#8b0000', label: 'Bajo-Bajo' }
      ]
    },
    'Flujo': {
      name: 'Flujo',
      componentType: 3,
      parameter: 0,
      unit: 'm³/s',
      ranges: [
        { from: 1.0, to: 2.0, color: '#ff0000', label: 'Alto-Alto' },
        { from: 0.0, to: 0.0, color: '#8b0000', label: 'Bajo-Bajo' }
      ]
    },
    'Caudal': {
      name: 'Caudal',
      componentType: 5,
      parameter: 0,
      unit: 'L/s',
      ranges: [
        { from: 75.0, to: 100.0, color: '#ff0000', label: 'Alto-Alto' },
        { from: 60.0, to: 75.0, color: '#ffa500', label: 'Alto' },
        { from: 20.0, to: 60.0, color: '#00ff00', label: 'Normal' },
        { from: 0.1, to: 20.0, color: '#ffff00', label: 'Bajo' },
        { from: 0.0, to: 0.1, color: '#8b0000', label: 'Bajo-Bajo' }
      ]
    },
    'Color': {
      name: 'Color',
      componentType: 4,
      parameter: 0,
      unit: 'UPC',
      ranges: [
        { from: 18.0, to: 30.0, color: '#ff0000', label: 'Alto-Alto' },
        { from: 15.0, to: 18.0, color: '#ffa500', label: 'Alto' },
        { from: 1.0, to: 15.0, color: '#00ff00', label: 'Normal' },
        { from: 0.1, to: 1.0, color: '#ffff00', label: 'Bajo' },
        { from: 0.0, to: 0.1, color: '#8b0000', label: 'Bajo-Bajo' }
      ]
    },
    'Turbidez': {
      name: 'Turbidez',
      componentType: 8,
      parameter: 1,
      unit: 'NTU',
      ranges: [
        { from: 1.79, to: 5.0, color: '#ff0000', label: 'Alto-Alto' },
        { from: 1.3, to: 1.79, color: '#ffa500', label: 'Alto' },
        { from: 0.1, to: 1.3, color: '#00ff00', label: 'Normal' },
        { from: 0.01, to: 0.1, color: '#ffff00', label: 'Bajo' },
        { from: 0.0, to: 0.01, color: '#8b0000', label: 'Bajo-Bajo' }
      ]
    }
};
  
  
  sensors = [
    { name: 'pH', componentType: 6, parameter: 1 },
    { name: 'Cloro', componentType: 6, parameter: 0 },
    { name: 'Temperatura', componentType: 6, parameter: 2 },
    { name: 'Turbidez', componentType: 8, parameter: 1 },
    { name: 'Flujo', componentType: 3, parameter: 0 },
    { name: 'Color', componentType: 4, parameter: 0 }
  ];
  
  API_URL = 'https://api.tu-servidor.com/endpoint';


  constructor(private graphicService: GraphicService, private http: HttpClient) {}

  getMeasurementHistory(
    serial: string,
    direction: number,
    channel: number,
    page: number,
    pageSize: number,
    selectedDate: Date | null,
    
  ): Observable<MeasurementResponse> {
    let params = new HttpParams()
      .set('serial', serial)
      .set('direction', direction.toString())
      .set('channel', channel.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('timestamp', Date.now().toString()); 

    if (selectedDate) {
      const isoDate = selectedDate.toISOString();
      params = params.set('dateFilter', isoDate);
    }

    console.log('Llamando API con:', params.toString()); 

    return this.http.get<MeasurementResponse>(this.API_URL, { params });
  }

  ngOnInit(): void {
    this.createChart();
   
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.dispose();
    }
  }

  private createChart(): void {
    if (this.root) {
      this.root.dispose();
    }

    // Create root and chart
    this.root = am5.Root.new('chartdiv');
    this.root.setThemes([am5themes_Animated.default.new(this.root)]);

    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
        layout: this.root.verticalLayout
      })
    );

    // Add gradient background
    this.chart.setAll({
      background: am5.Rectangle.new(this.root, {
        fillGradient: am5.LinearGradient.new(this.root, {
          stops: [{
            color: am5.color(0xf7f7f7)
          }, {
            color: am5.color(0xf0f0f0)
          }]
        })
      })
    });

    // Create axes with improved styling
    const xAxis = this.chart.xAxes.push(
      am5xy.DateAxis.new(this.root, {
        maxDeviation: 0.2,
        baseInterval: { timeUnit: 'minute', count: 1 },
        renderer: am5xy.AxisRendererX.new(this.root, {
          minGridDistance: 80,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        }),
        tooltip: am5.Tooltip.new(this.root, {
          themeTags: ["axis"],
          animationDuration: 200
        })
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
      fontWeight: "500"
    });

    const yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {
          opposite: false
        })
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fontSize: 12,
      fontWeight: "500"
    });

    // Create main series with improved styling
    this.series = this.chart.series.push(
      am5xy.LineSeries.new(this.root, {
        name: "Mediciones",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(this.root, {
          labelText: "{valueY}",
          pointerOrientation: "horizontal",
          background: am5.Rectangle.new(this.root, {
            fillOpacity: 0.95,
            fill: am5.color(0xffffff),
            strokeWidth: 2,
            stroke: am5.color(0x000000)
          })
        })
      })
    );

    // Improve series styling
    this.series.strokes.template.setAll({
      strokeWidth: 3,
      strokeOpacity: 0.8,
      stroke: am5.color(0x0077cc)
    });

    this.series.fills.template.setAll({
      fillOpacity: 0.3,
      visible: true
    });

    // Add scrollbar
    this.chart.set("scrollbarX", am5.Scrollbar.new(this.root, {
      orientation: "horizontal",
      marginBottom: 20
    }));

    // Create and style the legend
    const legend = this.chart.children.push(
      am5.Legend.new(this.root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15
      })
    );

    legend.labels.template.setAll({
      fontSize: 12,
      fontWeight: "500"
    });

    legend.data.setAll(this.chart.series.values);

    // Add cursor
    this.chart.set("cursor", am5xy.XYCursor.new(this.root, {
      behavior: "none",
      xAxis: xAxis,
      yAxis: yAxis
    }));

    // Apply animations
    this.series.appear(1000);
    this.chart.appear(1000, 100);
  }

  private updateRanges(): void {
    if (!this.selectedSensor || !this.sensorConfigs[this.selectedSensor]) return;
  
    const sensorConfig = this.sensorConfigs[this.selectedSensor];
    const yAxis = this.chart.yAxes.getIndex(0);
    if (!yAxis) return;
  
    // Clear existing ranges
    yAxis.axisRanges.clear();
    this.rangeDataSeries.forEach(series => series.dispose());
    this.rangeDataSeries = [];
  
    // Add range areas
    sensorConfig.ranges.forEach((range, index) => {
      const rangeAxis = yAxis.makeDataItem({
        value: range.from,
        endValue: range.to
      } as any);
  
      yAxis.createAxisRange(rangeAxis);
  
      rangeAxis.get("axisFill")?.setAll({
        fill: am5.color(range.color),
        visible: true
      });
  
      rangeAxis.get("label")?.setAll({
        text: range.label,
        inside: true,
        centerY: am5.p50,
        fontWeight: "600",
        fontSize: 12
      });
  
      rangeAxis.get("grid")?.setAll({
        stroke: am5.color(range.color),
        strokeDasharray: [4, 4]
      });
  
      const rangeSeries = this.chart.series.push(
        am5xy.LineSeries.new(this.root, {
          name: range.label,
          xAxis: this.chart.xAxes.getIndex(0)!,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          fill: am5.color(range.color)
        })
      );
  
      if (this.allDataGraphic.length > 0) {
        const rangeData = this.allDataGraphic.map(point => ({
          date: point.date,
          value: point.value >= range.from && point.value < range.to ? point.value : null
        }));
        rangeSeries.data.setAll(rangeData);
      }
  
      this.rangeDataSeries.push(rangeSeries);
    });
  }
  
  
  filtrarDatos(): void {
    if (!this.selectedSensor || !this.sensorConfigs[this.selectedSensor]) {
      console.warn('Sensor no válido seleccionado');
      return;
    }

    const sensorConfig = this.sensorConfigs[this.selectedSensor];
    
    this.graphicService
      .getMeasurementHistory('08000015', sensorConfig.componentType, sensorConfig.parameter, 0, 10)
      .subscribe({
        next: (response: MeasurementResponse) => {
          if (response?.success && response.data?.measurementHistoryGraphic?.length > 0) {
            this.allDataGraphic = response.data.measurementHistoryGraphic.map(item => ({
              date: new Date(item.dateMeasurementComponent).getTime(),
              value: item.measurementValue
            }));

            let filteredData = this.allDataGraphic;

            if (this.selectedDateTime) {
              const selectedDate = new Date(this.selectedDateTime);
              const tolerance = 5 * 60 * 1000;

              filteredData = this.allDataGraphic.filter(item => {
                const itemDate = new Date(item.date).getTime();
                return Math.abs(itemDate - selectedDate.getTime()) <= tolerance;
              });
            }

            this.series.data.setAll(filteredData);
            this.updateRanges();
            
            // Update chart title with units
            this.chart.setAll({
              tooltipText: `${sensorConfig.name} (${sensorConfig.unit})`
            });
          } else {
            this.series.data.setAll([]);
            console.warn('No hay datos disponibles para graficar');
          }
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
        }
      });
  }
  submitDate(): void {
    if (!this.selectedSensor || !this.selectedDateTime) {
      alert("Por favor seleccione un sensor y una fecha válida.");
      return;
    }
    this.filtrarDatos(); // Ejecutar la función principal para el filtrado
  }
}