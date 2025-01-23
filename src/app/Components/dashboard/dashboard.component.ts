import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isSidebarOpen: boolean = false;

  toggleSidebar() {

    this.isSidebarOpen = !this.isSidebarOpen;
  }

  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Ventas totales'
    },
    xAxis: {
      categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo']
    },
    yAxis: {
      title: {
        text: 'Cantidad (en miles)'
      }
    },
    series: [
      {
        name: 'Ventas',
        data: [100, 200, 150, 300, 250]
      }
    ] as Highcharts.SeriesOptionsType[]
  };


  chartOptions3: Highcharts.Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Registro de Metricas'
    },
    xAxis: {
      categories: ['Buena', 'mala', 'regular', 'prioridad', 'peligro']
    },
    yAxis: {
      title: {
        text: 'Cantidad (en miles)'
      }
    },
    series: [
      {
        name: 'Ventas',
        data: [1003, 20, 33311, 9900, 2850] // Datos del gráfico
      }
    ] as Highcharts.SeriesOptionsType[]
  };




  chartOptions2: Highcharts.Options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Alertas Diarias'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Snow depth (m)'
      },
      min: 0
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    },
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
          fillColor: '#FFFFFF',
          enabled: true,
          radius: 2.5,
          lineWidth: 1,
          lineColor: undefined
        }
      }
    },
    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],
    series: [
      {
        name: 'Winter 2021-2022',
        type: 'spline',
        data: [
          [Date.UTC(1970, 10, 5), 0],
          [Date.UTC(1970, 10, 12), 0.1],
          [Date.UTC(1970, 10, 21), 0.15]
        ]
      },
      {
        name: 'Winter 2022-2023',
        type: 'spline',
        data: [
          [Date.UTC(1970, 10, 3), 0],
          [Date.UTC(1970, 10, 9), 0],
          [Date.UTC(1970, 10, 12), 0.03]
        ]
      }
    ]
  };  

  chartOptions4: Highcharts.Options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Mi primer gráfico de Highcharts'
    },
    xAxis: {
      categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio']
    },
    yAxis: {
      title: {
        text: 'Número de visitas'
      }
    },
    series: [{
      name: 'Visitas',
      type: 'line',
      data: [29, 71, 106, 129, 144, 176, 135]
    }]
  };

}
