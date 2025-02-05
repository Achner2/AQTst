import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-caudal-sensor',
  templateUrl: './caudal-sensor.component.html',
  styleUrl: './caudal-sensor.component.css'
})
export class CaudalSensorComponent implements OnInit {
  chart!: am4charts.XYChart3D;
  currentFlow: number = 35; // Valor inicial del caudal en metros
  status: string = "Caudal normal"; // Estado inicial
  lastUpdate: string = new Date().toLocaleString(); // Última actualización

  private dataInterval: any; // Para almacenar el setInterval

  constructor() { }

  ngOnInit(): void {
    // Aplicar el tema animado
    am4core.useTheme(am4themes_animated);

    // Crear instancia del gráfico
    this.chart = am4core.create("chartdiv2", am4charts.XYChart3D);
    this.chart.titles.create().text = "";

    // Datos iniciales
    this.chart.data = [{
      "category": "Caudal",
      "value1": this.currentFlow,
      "value2": 100 - this.currentFlow
    }];

    // Ejes
    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;

    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.labels.template.adapter.add("text", (text) => {
      if (text && (Number(text) > 100 || Number(text) < 0)) {
        return "";
      } else {
        return `${text} m³/s`; // Mostrar caudal en metros cúbicos por segundo
      }
    });

    // Series (barras de caudal)
    let series1 = this.chart.series.push(new am4charts.ConeSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.categoryX = "category";
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.fillOpacity = 0.9;
    series1.columns.template.strokeOpacity = 1;
    series1.columns.template.strokeWidth = 2;

    // Cambiar el color según el caudal
    series1.columns.template.adapter.add("fill", (fill, target) => {
      let value = target.dataItem ? (target.dataItem as any).valueY : 0;
      if (value > 75) {
        return am4core.color("#3089d7"); // Azul para caudal alto
      } else if (value > 50) {
        return am4core.color("#d7d730"); // Amarillo para caudal medio
      } else {
        return am4core.color("#d75130"); // Rojo para caudal bajo
      }
    });

    series1.columns.template.adapter.add("stroke", (stroke, target) => {
      let value = target.dataItem ? (target.dataItem as any).valueY : 0;
      if (value > 75) {
        return am4core.color("#3089d7"); // Azul para caudal alto
      } else if (value > 50) {
        return am4core.color("#d7d730"); // Amarillo para caudal medio
      } else {
        return am4core.color("#d75130"); // Rojo para caudal bajo
      }
    });

    let series2 = this.chart.series.push(new am4charts.ConeSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.categoryX = "category";
    series2.stacked = true;
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.fill = am4core.color("#000");
    series2.columns.template.fillOpacity = 0.1;
    series2.columns.template.stroke = am4core.color("#000");
    series2.columns.template.strokeOpacity = 0.2;
    series2.columns.template.strokeWidth = 2;

    this.dataInterval = setInterval(() => {
      this.updateData();
    }, 5000); 
  }

  updateData(): void {
    this.currentFlow = Math.random() * 100; // Valor aleatorio del caudal
    this.chart.data = [{
      "category": "Caudal",
      "value1": this.currentFlow,
      "value2": 100 - this.currentFlow
    }];
    this.lastUpdate = new Date().toLocaleString();
    this.status = this.currentFlow > 75 ? "Caudal alto" : 
                  this.currentFlow > 50 ? "Caudal medio" : "Caudal bajo";
  }

  ngOnDestroy(): void {
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
    }
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
