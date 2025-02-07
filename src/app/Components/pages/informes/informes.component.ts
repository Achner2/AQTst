import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MeasurementResponse } from '../../../interfaces/table-graphic';
import $ from 'jquery';
import 'datatables.net';

import 'datatables.net-bs5';
import 'datatables.net-buttons';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'jszip';
import 'pdfmake/build/pdfmake';  
import 'pdfmake/build/vfs_fonts';  
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import 'datatables.net-dt';
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GraphicTableService } from '../../../Services/metricService/graphic-table.service';



@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedDateTime: Date = new Date();
  private root: am5.Root | null = null;
  private chart: any; 
  datosOriginales: any[] = []; 
  datosFiltrados: any[] = [];  
  selectedDay: string = ''; 
  selectedSensor: string = 'PH';  
  

  sensors: { name: string, id: string, componentId: number }[] = [
    { name: 'PH', id: 'measurementTablePH', componentId: 1 },
    { name: 'Cloro', id: 'measurementTableCloro', componentId: 2 },
    { name: 'Temperatura', id: 'measurementTableTemperatura', componentId: 3 },
    { name: 'Nivel', id: 'measurementTableNivel', componentId: 4 },
    { name: 'Flujo', id: 'measurementTableFlujo', componentId: 5 },
    { name: 'Caudal', id: 'measurementTableCaudal', componentId: 6 },
    { name: 'Color', id: 'measurementTableColor', componentId: 7 },
    { name: 'Turbidez', id: 'measurementTableTurbidez', componentId: 8 }
  ];

  private renderizarGraficoConDatos(data: any[]): void {
    // Dispose existing chart
    if (this.root) {
      this.root.dispose();
    }
 
    this.root = am5.Root.new("chartdiv");
    this.root.setThemes([am5themes_Animated.new(this.root)]);
  
    const chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX"
      })
    );
  
    const chartData = data.map(item => ({
      date: new Date(item.dateMeasurementComponent).getTime(),
      value: parseFloat(item.measurementValue)
    }));
  
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(this.root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(this.root, {})
      })
    );
  
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );
  
    const series = chart.series.push(
      am5xy.LineSeries.new(this.root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(this.root, {
          labelText: "{valueY}"
        })
      })
    );
  
    series.data.setAll(chartData);
  
    series.appear(1000);
    chart.appear(1000, 100);
  }
  
  submitDate(): void {
    if (this.selectedDateTime) {
      console.log(`Fecha seleccionada: ${this.selectedDateTime}`);
      // Aquí puedes implementar la lógica para consultar datos basados en la fecha
    } else {
      console.warn('Por favor selecciona una fecha y hora.');
    }
  }
  
  
  private dataTables: any = {}; 


  constructor(private measurementService: GraphicTableService) {}

  ngOnInit(): void {
    this.loadDataPH();
    this.loadDataCloro();
    this.loadDataTemperatura();
    this.loadDataNivel();
    this.loadDataFlujo();
    this.loadDataCaudal();
    this.loadDataColor();
    this.loadDataTurbidez();

    this.filtrarDatos();
    this.selectedSensor = 'PH'; 
    
  }
  
  filtrarDatos() {

    const tableId = this.sensors.find(s => s.name === this.selectedSensor)?.id;
    
    if (!tableId) {
      console.error('No se encontró tabla para el sensor:', this.selectedSensor);
      return;
    }
  
    const tableData = $(`#${tableId}`).DataTable().data().toArray();
  
    if (tableData.length > 0) {
      this.renderizarGraficoConDatos(tableData);
    } else {
      console.warn(`No hay datos para el sensor ${this.selectedSensor}`);
    }
  }
  
  private configurarGraficoNuevo(): void {
    const root = am5.Root.new("chartdiv");  

    const fechas = [''];
    const valores = [7.5, 8.0, 6.8];

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0
    }));
    
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);
    
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    
    var value = 20;
    function generateData() {
      value = am5.math.round(Math.random() * 10 - 4.8 + value, 1);
      if (value < 0) {
        value = Math.random() * 10;
      }
    
      if (value > 100) {
        value = 100 - Math.random() * 10;
      }
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    interface DataItem {
      date: number;
      value: number;
    }
    
    function generateDatas(count: number): DataItem[] {  
      var data: DataItem[] = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }
    
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 90
      })
    }));
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));
    
    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true
    });
    
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));
    
    var rangeDataItem = yAxis.makeDataItem({});
    yAxis.createAxisRange(rangeDataItem);
    
    var container = am5.Container.new(root, {
      centerY: am5.p50,
      draggable: true,
      layout: root.horizontalLayout
    })
    
    container.adapters.add("x", function() {
      return 0;
    });
    
    container.adapters.add("y", function(y) {
      const validY = typeof y === "number" ? y : 0;
      
      return Math.max(0, Math.min(chart.plotContainer.height(), validY));
    });
    
container.events.on("dragged", function() {
  var value = yAxis.positionToValue(yAxis.toAxisPosition(container.y() / chart.plotContainer.height()));
  
  updateLabel(value);
}); 
    
    yAxis.topGridContainer.children.push(container);
    
    rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: container
    }));
    
    rangeDataItem.get("grid")?.setAll({
      strokeOpacity: 1,
      visible: true,
      stroke: am5.color(0x000000),
      strokeDasharray: [2, 2]
    });
    
    var background = am5.RoundedRectangle.new(root, {
      fill: am5.color(0xffffff),
      fillOpacity: 1,
      strokeOpacity: 0.5,
      cornerRadiusTL: 0,
      cornerRadiusBL: 0,
      cursorOverStyle: "ns-resize",
      stroke: am5.color(0xff0000)
    })
    
    container.set("background", background);
    
    var label = container.children.push(am5.Label.new(root, {
      paddingTop: 5,
      paddingBottom: 5
    }))
    
    var xButton = container.children.push(am5.Button.new(root, {
      cursorOverStyle: "pointer",
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 2,
      paddingRight: 8
    }))
    
    xButton.set("label", am5.Label.new(root, {
      text: "X",
      paddingBottom: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingLeft: 0,
      fill: am5.color(0xff0000)
    }))
    
    xButton.get("background")?.setAll({
      strokeOpacity: 0,
      fillOpacity: 0
    });
    
    xButton.events.on("click", function() {
      yAxis.disposeDataItem(rangeDataItem);
    })
    
    function updateLabel(value: number | null): void {
      var y = container.y();
      var position = yAxis.toAxisPosition(y / chart.plotContainer.height());
      
      if (value == null) {
        value = yAxis.positionToValue(position);
      }
      
      label.set("text", root.numberFormatter.format(value, "#.00") + ">Stop loss");
      
      rangeDataItem.set("value", value);
    }
    
    series.events.on("datavalidated", () => {
      var max = yAxis.getPrivate("max", 1);
      var min = yAxis.getPrivate("min", 0);
    
      var value = min + (max - min) / 2;
      rangeDataItem.set("value", value);
      updateLabel(value);
    })
    
    var data = generateDatas(300);
    series.data.setAll(data);
    xAxis.data.setAll(data);
    
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    
  }

  ngAfterViewInit(): void {
   

    if (document.getElementById('chartdiv')) {
      this.configurarGraficoNuevo(); 
    } else {
      console.error('Chart container "chartdiv" not found');
    }
  }

  ngOnDestroy(): void {
    Object.keys(this.dataTables).forEach(key => {
      if (this.dataTables[key]) {
        this.dataTables[key].destroy(true);
      }
    });
  }

  loadDataPH(): void {
    this.initializeDataTable('measurementTablePH', '08000015', 6, 1);
  }
  
  loadDataCloro(): void {
    this.initializeDataTable('measurementTableCloro', '08000015', 6, 0);
  }
  
  loadDataTemperatura(): void {
    this.initializeDataTable('measurementTableTemperatura', '08000015', 6, 2);
  }
  
  loadDataNivel(): void {
    this.initializeDataTable('measurementTableNivel', '08000015', 1, 0);
  }
  
  loadDataFlujo(): void {
    this.initializeDataTable('measurementTableFlujo', '08000015', 3, 0);
  }
  
  loadDataCaudal(): void {
    this.initializeDataTable('measurementTableCaudal', '08000015', 2, 0);
  }
  
  loadDataColor(): void {
    this.initializeDataTable('measurementTableColor', '08000015', 4, 0);
  }
  
  loadDataTurbidez(): void {
    this.initializeDataTable('measurementTableTurbidez', '08000015', 8, 1);
  }
  
  
  initializeDataTable(tableId: string, serial: string, componentType: number, parameter: number): void {
    if ($.fn.dataTable.isDataTable(`#${tableId}`)) {
      $(`#${tableId}`).DataTable().clear().destroy();
    }
  
    this.dataTables[tableId] = $(`#${tableId}`).DataTable({
      paging: true,
      pageLength: 10,
      searching: true,
      ordering: true,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        const page = dataTablesParameters.start / dataTablesParameters.length;
        const size = dataTablesParameters.length;
        const searchTerm = dataTablesParameters.search.value;
  
        this.measurementService.getTableHistoryBySerialAndComponent(serial, componentType, parameter, page, size)
          .subscribe((response: MeasurementResponse) => {
            callback({
              recordsTotal: response.data.totalElements,
              recordsFiltered: response.data.totalElements,
              data: response.data.content
            });
          });
      },
      language: {
        paginate: {
          next: 'Siguiente',
          previous: 'Anterior',
        },
        search: 'Buscar:',
        emptyTable: 'No hay datos disponibles en la tabla',
      },
      columns: [
        { data: 'serialEquipment' },
        { data: 'componentName' },
        { data: 'variableName' },
        { data: 'variableUnits' },
        { data: 'dateReception' },
        { data: 'dateMeasurementComponent' },
        { data: 'measurementValue' },
        { data: 'alertName' },
        { data: 'measurementTypeName' }
      ]
    });
  }
  

  exportarExcel(tableId: string): void {
    const tableElement = document.getElementById(tableId);
    if (!tableElement) {
      console.error(`La tabla con ID ${tableId} no existe`);
      return;
    }
  
    const worksheet = XLSX.utils.table_to_sheet(tableElement);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    XLSX.writeFile(workbook, `Datos_${tableId}.xlsx`);
  }
  
  exportarPDF(tableId: string): void {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error(`La tabla con ID ${tableId} no existe`);
      return;
    }
  
    const doc = new jsPDF();
    autoTable(doc, {
      html: `#${tableId}`,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      margin: { top: 10 }
    });
  
    doc.save(`Datos_${tableId}.pdf`);
  }
  
  imprimirTabla(tableId: string): void {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error(`La tabla con ID ${tableId} no existe`);
      return;
    }
  
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      const styles = `
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h1 {
            text-align: center;
            font-size: 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          @media print {
            body {
              font-size: 12pt;
            }
            table {
              page-break-inside: avoid;
            }
            th {
              background-color: #ddd !important;
              -webkit-print-color-adjust: exact;
            }
          }
        </style>
      `;
  
      newWindow.document.write(`
        <html>
          <head>
            <title>Impresión de Informe</title>
            ${styles}
          </head>
          <body>
            <h1>Reporte de Datos</h1>
            ${table.outerHTML}
          </body>
        </html>
      `);
  
      newWindow.document.close();
      newWindow.print();
    }
  }
  
  
}