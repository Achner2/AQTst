import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  
  private chart: am5xy.XYChart | undefined; 
  private root: am5.Root | null = null;
  selectedDateTime: Date = new Date();
  datosSensores: any[] = [
    { sensor: 'PH', altoAlto: '> 9.0', alto: '> 8.5', bajo: '< 6.0', bajoBajo: '< 5.7' },
    { sensor: 'Cloro', altoAlto: '> 3.0', alto: '> 2.8', bajo: '< 0.3', bajoBajo: '< 0.2' },
    { sensor: 'Temperatura', altoAlto: '> 9.0', alto: '> 8.5', bajo: '< 6.0', bajoBajo: '< 5.7' },
    { sensor: 'Nivel', altoAlto: '> 6.0', alto: '> 5.3', bajo: '< 2.0', bajoBajo: '< 1.0' },
    { sensor: 'Color', altoAlto: '> 18.0', alto: '> 15.0', bajo: '< 1.0', bajoBajo: '< 0.0' },
    { sensor: 'Flujo', altoAlto: '> 1.0', alto: '> 1.0', bajo: '< 0.0', bajoBajo: '< 0.0' }
  ];
  
  datosOriginales: any[] = []; 
  datosFiltrados: any[] = [];  
  selectedDay: string = ''; 

  datosSensorPH = this.datosSensores.filter(dato => dato.sensor === 'PH');
  datosSensorTemperatura = this.datosSensores.filter(dato => dato.sensor === 'Temperatura');
  datosSensorCloro = this.datosSensores.filter(dato => dato.sensor === 'Cloro');
  datosSensorNivel = this.datosSensores.filter(dato => dato.sensor === 'Nivel');
  datosSensorColor = this.datosSensores.filter(dato => dato.sensor === 'Color');
  datosSensorFlujo = this.datosSensores.filter(dato => dato.sensor === 'Flujo');

  private renderizarGrafico(): void {
    if (this.root) {
      this.root.dispose();
    }

    this.root = am5.Root.new("sensorChartContainer");
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    let chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: true,
        panY: true,
      })
    );

    chart.children.unshift(
      am5.Label.new(this.root, {
        text: `Datos del Sensor: ${this.selectedSensor}`,
        fontSize: 20,
        centerX: am5.percent(50),
        x: am5.percent(50),
        paddingTop: 10,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(this.root, {
        baseInterval: { timeUnit: "day", count: 1 },
        renderer: am5xy.AxisRendererX.new(this.root, {}),
        tooltip: am5.Tooltip.new(this.root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {}),
      })
    );

    let series = chart.series.push(
      am5xy.LineSeries.new(this.root, {
        name: this.selectedSensor,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(this.root, {
          labelText: "{valueY}",
        }),
      })
    );

    const data = this.getDataForSensor(this.selectedSensor);
    series.data.setAll(data);
  }

  getDataForSensor(sensor: string): any[] {
    switch (sensor) {
      case 'PH':
        return [{ date: Date.UTC(2025, 0, 1), value: 7.5 }, { date: Date.UTC(2025, 0, 2), value: 8.0 }];
      case 'Cloro':
        return [{ date: Date.UTC(2025, 0, 1), value: 2.5 }, { date: Date.UTC(2025, 0, 2), value: 3.0 }];
      case 'Temperatura':
        return [{ date: Date.UTC(2025, 0, 1), value: 21.5 }, { date: Date.UTC(2025, 0, 2), value: 22.8 }];
      case 'Nivel':
        return [{ date: Date.UTC(2025, 0, 1), value: 5.0 }, { date: Date.UTC(2025, 0, 2), value: 6.2 }];
      case 'Color':
        return [{ date: Date.UTC(2025, 0, 1), value: 15.0 }, { date: Date.UTC(2025, 0, 2), value: 16.8 }];
      case 'Flujo':
        return [{ date: Date.UTC(2025, 0, 1), value: 0.5 }, { date: Date.UTC(2025, 0, 2), value: 1.1 }];
      default:
        return [];
    }
  }
  
  filtrarPorSensor(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSensor = selectElement.value;
  
    const datosSeleccionados = this.datosSensores.find(dato => dato.sensor === this.selectedSensor);
  
    if (datosSeleccionados) {
      this.datosFiltrados = [datosSeleccionados];
    } else {
      this.datosFiltrados = [];
    }

    this.renderizarGrafico();
  }

  submitDate(): void {
    if (this.selectedDateTime) {
      alert(`Fecha y hora seleccionadas: ${this.selectedDateTime}`);
    } else {
      alert('Por favor selecciona una fecha y hora.');
    }
  }
  
  selectedSensor: string = 'PH';  
  
  constructor() { }
  
  ngOnInit(): void {
    this.inicializarTablas();
    this.configurarGraficoNuevo();
    this.selectedSensor = 'PH'; 
    this.filtrarDatos();
    this.renderizarGrafico();
  }
  
  filtrarDatos() {
    this.renderizarGrafico();
  }
  
  actualizarGrafico() {
    let chartData = this.datosSensorPH.map(d => ({
      category: d.FechaDeMedicion,
      value: d.Valor,
    }));

    if (this.chart && this.chart.series && this.chart.series.getIndex(0)) {
      this.chart.series.getIndex(0)!.data.setAll(chartData);
    }
  }

  private inicializarTablas(): void {
    const tables = [
      { id: '#tablaSensorPH', nombre: 'Sensor PH' },
      { id: '#tablaSensorCloro', nombre: 'Sensor Cloro' },
      { id: '#tablaSensorTemperatura', nombre: 'Sensor Temperatura' },
      { id: '#tablaSensorNivel', nombre: 'Sensor Nivel' },
      { id: '#tablaSensorColor', nombre: 'Sensor Color' },
      { id: '#tablaSensorFlujo', nombre: 'Sensor Flujo' }
    ];
  
    tables.forEach((tableConfig) => {
      const table = $(tableConfig.id).DataTable({
        paging: true,
        searching: true,
        ordering: true,
        autoWidth: false,
        info: true,
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        order: [[0, 'asc']],
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json',
        },
        dom: '<"row"<"col-md-4"l><"col-md-4 "B><"col-md-4"f>>rtip',
        buttons: this.obtenerBotonesDeExportacion(tableConfig.nombre),
        responsive: true, // Ahora debe ser aceptado
      });
    });
  }
  
  private obtenerBotonesDeExportacion(nombreTabla: string): any[] {
    return [
      {
        text: '',
        className: 'fas fa-file-excel excel', 
        action: (e: any, dt: any) => {
          const dataExport = dt.buttons.exportData();
          this.exportarExcel(nombreTabla, dataExport);
        },
      },
      {
        extend: 'pdfHtml5',
        text: '',
        className: 'fas fa-file-pdf pdf', 
        title: `Informe de ${nombreTabla}`,
        customize: (doc: any) => {
          doc.defaultStyle.fontSize = 10;
          doc.styles.tableHeader = {
            fontSize: 12,
            fillColor: '#b4b4b4',
            bold: true,
            alignment: 'center',
          };
          doc.pageMargins = [20, 40, 20, 30];
        },
      },
      {
        extend: 'print',
        text: '',
        className: 'fas fa-print print', 
        title: `Informe de ${nombreTabla}`,
      },
    ];
  }

  private exportarExcel(nombreTabla: string, data: any): void {
    try {
      const encabezados = data.header;
      const cuerpo = data.body;
  
      const datosCompletos = [encabezados, ...cuerpo];
  
      const ws = XLSX.utils.aoa_to_sheet(datosCompletos);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, nombreTabla);
  
      ws['!cols'] = encabezados.map(() => ({ wch: 20 }));

      const archivoExcel = `${nombreTabla}.xlsx`;
      XLSX.writeFile(wb, archivoExcel);
  
    } catch (error) {
      console.error('Error exportando a Excel:', error);
    }
  }
  
  private configurarGraficoNuevo(): void {
    const root = am5.Root.new("chartdiv");  

    const fechas = [''];
    const valores = [7.5, 8.0, 6.8];

    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
      })
    );
  }
}
