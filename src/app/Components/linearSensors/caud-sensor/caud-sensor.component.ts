import { Component } from '@angular/core';

@Component({
  selector: 'app-caud-sensor',
  templateUrl: './caud-sensor.component.html',
  styleUrls: ['./caud-sensor.component.css']
})
export class CaudSensorComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '            ',
      lowerLimit: '0.1',
      upperLimit: '30',
      numberSuffix: ' lts',
      chartBottomMargin: '50',
      valueFontSize: '11',
      valueFontBold: '0',
      chartLeftMargin: '20',
      chartRightMargin: '20',
      chartTopMargin: '20',
      animationDuration: '1',
      responsive: '1',
    },
    colorRange: {
      color: [
        { minValue: '0.1', maxValue: '10', label: 'Bajo', code: '#66B3FF' }, 
        { minValue: '10', maxValue: '20', label: 'Medio', code: '#A1D99B' }, 
        { minValue: '20', maxValue: '30', label: 'Alto', code: '#FF9966' } 
      ],
    },
    pointers: {
      pointer: [{ value: '0.1' }],
    },
    trendPoints: {
      point: [
        { startValue: '10', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '20', displayValue: '', dashed: '1', showValues: '0' },
      ],
    },
  };

  currentFlow: number = 0.1;
  status: string = 'Bajo'; 
  lastUpdate: string = this.getCurrentTime(); 

  constructor() {
    let targetValue = this.currentFlow;
    setInterval(() => {
      targetValue = parseFloat((Math.random() * (30 - 0.1) + 0.1).toFixed(2));
      this.smoothTransition(this.currentFlow, targetValue.toString());
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
    this.currentFlow = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }

  updateStatus(value: number) {
    if (value >= 0.1 && value < 10) {
      this.status = 'Bajo';
    } else if (value >= 10 && value < 20) {
      this.status = 'Medio';
    } else if (value >= 20 && value <= 30) {
      this.status = 'Alto';
    }
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  }

}