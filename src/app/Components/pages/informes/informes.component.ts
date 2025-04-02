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
  
  // Property for multiple metric selection
  selectedMetrics: string[] = [];
  // Property to control visible sensors
  visibleSensors: { name: string, id: string, componentId: number }[] = [];
  // Property to control whether to show the graph
  showGraph: boolean = true;

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

  private dataTables: any = {}; 
  
  constructor(private measurementService: GraphicTableService) {}

  ngOnInit(): void {
    // Initialize with all metrics selected
    this.selectedMetrics = this.sensors.map(sensor => sensor.name);
    this.visibleSensors = [...this.sensors];
    
    // Initialize all tables with a delay to allow DOM to be ready
    setTimeout(() => {
      this.loadAllData();
    }, 500);
    
    // Default PH for graph
    this.selectedSensor = 'PH';
  }
  
  ngAfterViewInit(): void {
    // Initialize graph with a delay to ensure DOM is ready
    setTimeout(() => {
      if (document.getElementById('chartdiv')) {
        this.filtrarDatos();
      } else {
        console.error('Chart container "chartdiv" not found');
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    // Clean up DataTables
    Object.keys(this.dataTables).forEach(key => {
      if (this.dataTables[key]) {
        this.dataTables[key].destroy(true);
      }
    });
    
    // Clean up AmCharts
    if (this.root) {
      this.root.dispose();
    }
  }
  
  // Method to apply the metric filter
  applyMetricFilter(): void {
    if (this.selectedMetrics.length === 0) {
      alert('Por favor, seleccione al menos una métrica');
      return;
    }
    
    // Update visible sensors based on selection
    this.visibleSensors = this.sensors.filter(sensor => 
      this.selectedMetrics.includes(sensor.name)
    );
    
    // If currently selected sensor for the graph is no longer visible,
    // select the first visible sensor
    if (!this.selectedMetrics.includes(this.selectedSensor) && this.visibleSensors.length > 0) {
      this.selectedSensor = this.visibleSensors[0].name;
      // Update the graph
      setTimeout(() => {
        this.filtrarDatos();
      }, 300);
    } else if (this.visibleSensors.length > 0) {
      // Still update the graph to reflect changes
      setTimeout(() => {
        this.filtrarDatos();
      }, 300);
    }
    
    // Update graph visibility
    this.showGraph = this.visibleSensors.length > 0;
    
    // Reinitialize visible tables
    setTimeout(() => {
      this.visibleSensors.forEach(sensor => {
        this.initializeDataTable(sensor.id, '08000015', sensor.componentId, sensor.name === 'PH' ? 1 : 0);
      });
    }, 300);
    
    console.log('Filtro aplicado. Métricas visibles:', this.visibleSensors.map(s => s.name));
  }
  
  // Method to reset the metric filter
  resetMetricFilter(): void {
    this.selectedMetrics = this.sensors.map(sensor => sensor.name);
    this.visibleSensors = [...this.sensors];
    this.showGraph = true;
    this.selectedSensor = 'PH';
    
    // Reinitialize all tables
    setTimeout(() => {
      this.loadAllData();
      this.filtrarDatos();
    }, 300);
    
    console.log('Filtro reseteado. Mostrando todas las métricas.');
  }
  
  // Load all tables
  loadAllData(): void {
    this.loadDataPH();
    this.loadDataCloro();
    this.loadDataTemperatura();
    this.loadDataNivel();
    this.loadDataFlujo();
    this.loadDataCaudal();
    this.loadDataColor();
    this.loadDataTurbidez();
  }
  
  // Filter data for the graph
  filtrarDatos(): void {
    const tableId = this.sensors.find(s => s.name === this.selectedSensor)?.id;
    
    if (!tableId) {
      console.error('No se encontró tabla para el sensor:', this.selectedSensor);
      return;
    }
  
    // Check if the table exists and contains data
    if ($.fn.dataTable.isDataTable(`#${tableId}`)) {
      const tableData = $(`#${tableId}`).DataTable().data().toArray();
  
      if (tableData.length > 0) {
        this.renderizarGraficoConDatos(tableData);
      } else {
        console.warn(`No hay datos para el sensor ${this.selectedSensor}`);
      }
    } else {
      console.warn(`La tabla ${tableId} no está inicializada`);
    }
  }
  
  // Render the graph with data
  private renderizarGraficoConDatos(data: any[]): void {
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
  
    // Add title to the chart with the sensor name
    chart.children.unshift(
      am5.Label.new(this.root, {
        text: `Gráfico de ${this.selectedSensor}`,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 15,
        paddingBottom: 0
      })
    );
    
    series.appear(1000);
    chart.appear(1000, 100);
  }
  
  // Methods to load each type of data
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
  
  // Initialize DataTable with server-side processing
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
            // Log API response for debugging
            console.log(`Datos para ${tableId}:`, response);
  
            callback({
              recordsTotal: response.data.totalElements,
              recordsFiltered: response.data.totalElements,
              data: response.data.content
            });

            // After loading data, update the graph if this is the selected sensor
            if (this.getSensorNameByTableId(tableId) === this.selectedSensor) {
              setTimeout(() => {
                this.filtrarDatos();
              }, 300);
            }
          });
      },
      language: {
        paginate: {
          next: 'Siguiente',
          previous: 'Anterior',
        },
        search: 'Buscar:',
        emptyTable: 'No hay datos disponibles en la tabla',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        infoEmpty: 'Mostrando 0 a 0 de 0 registros',
        infoFiltered: '(filtrado de _MAX_ registros totales)',
        lengthMenu: 'Mostrar _MENU_ registros',
        loadingRecords: 'Cargando...',
        processing: 'Procesando...',
        zeroRecords: 'No se encontraron registros coincidentes'
      },
      columns: this.getColumnsForTable(tableId)
    });
  }
  
  // Method to define columns based on the table
  getColumnsForTable(tableId: string): any[] {
    const baseColumns = [
      { data: 'serialEquipment' },
      { data: 'measurementValue' },
      { data: 'alertName' }
    ];
    
    // For Cloro and PH, add the 'Component' column
    if (tableId === 'measurementTableCloro' || tableId === 'measurementTablePH') {
      baseColumns.push({ data: 'componentName' });
    }
    
    // For all except PH, add the 'Variable' column
    if (tableId !== 'measurementTablePH') {
      baseColumns.push({ data: 'variableName' });
    }
    
    // All tables have these last columns
    baseColumns.push(
      { data: 'dateMeasurementComponent' },
      { data: 'dateReception' }
    );
    
    return baseColumns;
  }
  
  // Export methods
  exportarExcel(tableId: string): void {
    const tableElement = document.getElementById(tableId);
    if (!tableElement) {
      console.error(`La tabla con ID ${tableId} no existe`);
      return;
    }
  
    const worksheet = XLSX.utils.table_to_sheet(tableElement);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    XLSX.writeFile(workbook, `Datos_${this.getSensorNameByTableId(tableId)}.xlsx`);
  }
  
  exportarPDF(tableId: string): void {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error(`La tabla con ID ${tableId} no existe`);
      return;
    }
  
    const doc = new jsPDF();
    const sensorName = this.getSensorNameByTableId(tableId);
    
    // Add title to PDF
    doc.setFontSize(16);
    doc.text(`Informe de ${sensorName}`, 105, 15, { align: 'center' });
    
    autoTable(doc, {
      html: `#${tableId}`,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      margin: { top: 25 }
    });
  
    doc.save(`Informe_${sensorName}.pdf`);
  }
  
  imprimirTabla(tableId: string): void {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error(`La tabla con ID ${tableId} no existe`);
      return;
    }
  
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      const sensorName = this.getSensorNameByTableId(tableId);
      const styles = `
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h1 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
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
            .no-print {
              display: none;
            }
          }
          .print-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .print-date {
            font-size: 14px;
            color: #666;
          }
          .print-button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
        </style>
      `;
  
      newWindow.document.write(`
        <html>
          <head>
            <title>Informe de ${sensorName}</title>
            ${styles}
          </head>
          <body>
            <div class="print-header">
              <div class="print-date">Fecha: ${new Date().toLocaleDateString()}</div>
              <button class="print-button no-print" onclick="window.print()">Imprimir</button>
            </div>
            <h1>Informe de ${sensorName}</h1>
            ${table.outerHTML}
          </body>
        </html>
      `);
  
      newWindow.document.close();
      
      // Auto print after a short delay to ensure content is loaded
      setTimeout(() => {
        newWindow.print();
      }, 500);
    }
  }
  
  // Helper method to get the sensor name from the table ID
  getSensorNameByTableId(tableId: string): string {
    const sensor = this.sensors.find(s => s.id === tableId);
    return sensor ? sensor.name : 'Datos';
  }
}