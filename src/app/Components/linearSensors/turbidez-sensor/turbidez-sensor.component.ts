import { Component } from '@angular/core';

@Component({
  selector: 'app-turbidez-sensor',
  templateUrl: './turbidez-sensor.component.html',
  styleUrls: ['./turbidez-sensor.component.css']
})
export class TurbidezSensorComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '                    ',
      lowerLimit: '0',
      upperLimit: '40',
      numberSuffix: ' NTU',
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
        { minValue: '0', maxValue: '5', label: 'Excelente', code: '#A1D99B' },
        { minValue: '5', maxValue: '10', label: 'Buena', code: '#66B3FF' },
        { minValue: '10', maxValue: '20', label: 'Regular', code: '#FF9966' },
        { minValue: '20', maxValue: '40', label: 'Mala', code: '#FF4C4C' }
      ],
    },
    pointers: {
      pointer: [{ value: '5' }],
    },
    trendPoints: {
      point: [
        { startValue: '0', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '10', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '0', endValue: '10', displayValue: '', alpha: '40' },
      ],
    },
  };

  currentTurbidity: number = 5;
  status: string = 'Excelente';
  lastUpdate: string = this.getCurrentTime();

  constructor() {
    let targetValue = this.currentTurbidity;
    setInterval(() => {
      targetValue = parseFloat((Math.random() * (15 - 2) + 2).toFixed(2));
      this.smoothTransition(this.currentTurbidity, targetValue.toString());
    }, 3000);
  }

  smoothTransition(currentValue: number, targetValue: string) {
    let step = (parseFloat(targetValue) - currentValue) / 10;
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
    this.currentTurbidity = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }

  updateStatus(value: number) {
    if (value >= 0 && value <= 5) {
      this.status = 'Excelente';
    } else if (value > 5 && value <= 10) {
      this.status = 'Buena';
    } else if (value > 10 && value <= 20) {
      this.status = 'Regular';
    } else {
      this.status = 'Mala';
    }
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
  }
}