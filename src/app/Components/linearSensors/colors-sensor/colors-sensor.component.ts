import { Component } from '@angular/core';

@Component({
  selector: 'app-colors-sensor',
  templateUrl: './colors-sensor.component.html',
  styleUrl: './colors-sensor.component.css'
})
export class ColorsSensorComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '            ',
      lowerLimit: '0',
      upperLimit: '800',
      numberSuffix: ' PCU',
      chartBottomMargin: '50',
      valueFontSize: '11',
      valueFontBold: '0',
      chartLeftMargin: '20',
      chartRightMargin: '20',
      chartTopMargin: '20',
      animationDuration: '1',
      responsive: '1', // Habilita la responsividad del gráfico
    },
    colorRange: {
      color: [
        { minValue: '0', maxValue: '200', label: 'Bajo', code: '#A1D99B' },
        { minValue: '201', maxValue: '400', label: 'Moderado', code: '#66B3FF' },
        { minValue: '401', maxValue: '600', label: 'Alto', code: '#FF9966' },
        { minValue: '601', maxValue: '800', label: 'Muy Alto', code: '#FF4C4C' },
      ],
    },
    pointers: {
      pointer: [{ value: '0' }], // Valor inicial
    },
    trendPoints: {
      point: [
        { startValue: '200', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '400', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '600', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '200', endValue: '400', displayValue: '', alpha: '40' },
        { startValue: '400', endValue: '600', displayValue: '', alpha: '40' },
        { startValue: '600', endValue: '800', displayValue: '', alpha: '40' },
      ],
    },
  };

  currentPcu: number = 0; // Valor inicial
  status: string = 'Bajo';
  lastUpdate: string = this.getCurrentTime();

  constructor() {
    let targetValue = this.currentPcu;
    setInterval(() => {
      targetValue = parseFloat((Math.random() * (800 - 0) + 0).toFixed(2));
      this.smoothTransition(this.currentPcu, targetValue.toString());
    }, 3000);
  }

  smoothTransition(currentValue: number, targetValue: string) {
    let step = (parseFloat(targetValue) - currentValue) / 10;
    let counter = 0;
    let interval = setInterval(() => {
      currentValue += step;
      this.updatePointerValue(currentValue.toFixed(2));
      this.updateStatus(currentValue);
      this.lastUpdate = this.getCurrentTime();

      if (Math.abs(parseFloat(targetValue) - currentValue) < 0.05) {
        clearInterval(interval);
        this.updatePointerValue(targetValue);
        this.updateStatus(parseFloat(targetValue));
      }
    }, 100);
  }

  updatePointerValue(value: string) {
    this.currentPcu = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }

  updateStatus(value: number) {
    if (value >= 0 && value <= 200) {
      this.status = 'Bajo';
    } else if (value >= 201 && value <= 400) {
      this.status = 'Moderado';
    } else if (value >= 401 && value <= 600) {
      this.status = 'Alto';
    } else {
      this.status = 'Muy Alto';
    }
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
  }
}
