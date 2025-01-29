import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-ph',
  templateUrl: './ph.component.html',
  styleUrl: './ph.component.css'
})
export class PhComponent implements OnInit{
  width = '200';
  height = '400';
  type = 'thermometer';
  dataFormat = 'json';
  dataSource: any;
  ngOnInit() {
    this.setChartSize(); // Ajustar tamaño inicial

    this.dataSource = {
      chart: {
        caption: "Temperatura Actual",
        subcaption: "Celsius",
        lowerLimit: "0",
        upperLimit: "100",
        numberSuffix: "°C",
        showhovereffect: "1",
        thmFillColor: "#008EE4",
        thmOriginX: "50%", // Centramos el termómetro
        chartBottomMargin: "20",
        showGaugeBorder: "1",
        gaugeBorderColor: "#008EE4",
        gaugeBorderThickness: "2",
        gaugeBorderAlpha: "30",
        thmBorderColor: "#008EE4",
        thmBorderThickness: "2",
        thmBorderAlpha: "30",
        showValue: "1",
        showBorder: "0",
        bgColor: "#fcfcfc",
        theme: "fusion"
      },
      value: "65"
    };
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setChartSize(); // Ajustar tamaño en cambio de ventana
  }

  setChartSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      this.height = '300'; // Reduce la altura en móviles
    } else {
      this.height = '400'; // Mantiene la altura en pantallas grandes
    }
  }
}
