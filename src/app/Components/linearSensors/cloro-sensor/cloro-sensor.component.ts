import { Component } from '@angular/core';

@Component({
  selector: 'app-cloro-sensor',
  templateUrl: './cloro-sensor.component.html',
  styleUrl: './cloro-sensor.component.css'
})
export class CloroSensorComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '              ',
      lowerLimit: '0.1',
      upperLimit: '5',
      numberSuffix: 'mg/l',
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
        { minValue: '0', maxValue: '0.5', label: 'Muy Bajo', code: '#FF4C4C' },
        { minValue: '0.5', maxValue: '1', label: 'Bajo', code: '#FF9966' },
        { minValue: '1', maxValue: '3', label: 'Óptimo', code: '#A1D99B' },
        { minValue: '3', maxValue: '4', label: 'Alto', code: '#66B3FF' },
        { minValue: '4', maxValue: '5', label: 'Muy Alto', code: '#3399FF' }
      ],
    },
    pointers: {
      pointer: [{ value: '1.5' }],
    },
    trendPoints: {
      point: [
        { startValue: '1', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '3', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '1', endValue: '3', displayValue: '', alpha: '40' },
      ],
    },
  };

  currentCloro: number = 1.5;
  status: string = 'Óptimo';
  lastUpdate: string = this.getCurrentTime();

  constructor() {
    let targetValue = this.currentCloro;
    setInterval(() => {
      targetValue = parseFloat((Math.random() * (3.5 - 0.5) + 0.5).toFixed(2));
      this.smoothTransition(this.currentCloro, targetValue.toString());
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
    this.currentCloro = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }

  updateStatus(value: number) {
    if (value >= 0 && value <= 0.5) {
      this.status = 'Muy Bajo';
    } else if (value > 0.5 && value <= 1) {
      this.status = 'Bajo';
    } else if (value > 1 && value <= 3) {
      this.status = 'Óptimo';
    } else if (value > 3 && value <= 4) {
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