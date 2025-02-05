import { Component } from '@angular/core';

@Component({
  selector: 'app-nivel-sensor',
  templateUrl: './nivel-sensor.component.html',
  styleUrl: './nivel-sensor.component.css'
})
export class NivelSensorComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '            ',
      lowerLimit: '0',
      upperLimit: '30',
      numberSuffix: ' cm',
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
        { minValue: '0', maxValue: '5', label: 'Muy Bajo', code: '#FF4C4C' },
        { minValue: '5', maxValue: '10', label: 'Bajo', code: '#FF9966' },
        { minValue: '10', maxValue: '20', label: 'Normal', code: '#A1D99B' },
        { minValue: '20', maxValue: '25', label: 'Alto', code: '#66B3FF' },
        { minValue: '25', maxValue: '30', label: 'Muy Alto', code: '#3399FF' }
      ],
    },
    pointers: {
      pointer: [{ value: '15' }],
    },
    trendPoints: {
      point: [
        { startValue: '10', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '20', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '10', endValue: '20', displayValue: '', alpha: '40' },
      ],
    },
  };

  currentLevel: number = 15;
  status: string = 'Normal';
  lastUpdate: string = this.getCurrentTime();

  constructor() {
    let targetValue = this.currentLevel;
    setInterval(() => {
      targetValue = parseFloat((Math.random() * (25 - 5) + 5).toFixed(2));
      this.smoothTransition(this.currentLevel, targetValue.toString());
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
    this.currentLevel = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }

  updateStatus(value: number) {
    if (value >= 0 && value <= 5) {
      this.status = 'Muy Bajo';
    } else if (value > 5 && value <= 10) {
      this.status = 'Bajo';
    } else if (value > 10 && value <= 20) {
      this.status = 'Normal';
    } else if (value > 20 && value <= 25) {
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
