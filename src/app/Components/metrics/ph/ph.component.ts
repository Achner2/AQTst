import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ph',
  templateUrl: './ph.component.html',
  styleUrl: './ph.component.css'
})
export class PhComponent implements OnInit{
  width = '250';
  height = '400';
  type = 'thermometer';
  dataFormat = 'json';
  dataSource: any;
  ngOnInit() {
    this.dataSource = {
      chart: {
        caption: "Temperatura Actual",
        subcaption: "Celsius",
        lowerLimit: "0",
        upperLimit: "100",
        numberSuffix: "°C",
        showhovereffect: "1",
        thmFillColor: "#008EE4",
        thmOriginX: "100",
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
      value: "65" // Valor actual del termómetro
    };
  }
}
