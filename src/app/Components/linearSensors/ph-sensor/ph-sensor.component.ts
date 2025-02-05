import { Component } from '@angular/core';

@Component({
  selector: 'app-ph-sensor',
  templateUrl: './ph-sensor.component.html',
  styleUrls: ['./ph-sensor.component.css']
})
export class PhSensorComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '                  ',
      lowerLimit: '1',
      upperLimit: '14',
      numberSuffix: '',
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
        { minValue: '1', maxValue: '3', label: 'Muy Ácido', code: '#FF4C4C' },   
        { minValue: '4', maxValue: '6', label: 'Ácido', code: '#FF9966' },      
        { minValue: '7', maxValue: '7.5', label: 'Neutro', code: '#A1D99B' },    
        { minValue: '8', maxValue: '10', label: 'Básico', code: '#66B3FF' },     
        { minValue: '11', maxValue: '14', label: 'Muy Básico', code: '#3399FF' }
      ],
    },
    pointers: {
      pointer: [{ value: '7' }],
    },
    trendPoints: {
      point: [
        { startValue: '6.5', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '7.5', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '6.5', endValue: '7.5', displayValue: '', alpha: '40' },
      ],
    },
  };

  currentPh: number = 7;
  status: string = 'Neutro'; 
  lastUpdate: string = this.getCurrentTime(); 

  constructor() {
    let targetValue = this.currentPh;
    setInterval(() => {
      targetValue = parseFloat((Math.random() * (8 - 6) + 6).toFixed(2));
      this.smoothTransition(this.currentPh, targetValue.toString());
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
    this.currentPh = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }

  updateStatus(value: number) {
    if (value >= 1 && value <= 3) {
      this.status = 'Muy Ácido';
    } else if (value >= 4 && value <= 6) {
      this.status = 'Ácido';
    } else if (value >= 7 && value <= 7.5) {
      this.status = 'Neutro';
    } else if (value >= 8 && value <= 10) {
      this.status = 'Básico';
    } else {
      this.status = 'Muy Básico';
    }
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
  }
}
