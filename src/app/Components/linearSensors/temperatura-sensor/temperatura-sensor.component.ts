import { Component } from '@angular/core';

@Component({
  selector: 'app-temperatura-sensor',
  templateUrl: './temperatura-sensor.component.html',
  styleUrl: './temperatura-sensor.component.css'
})
export class TemperaturaSensorComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '                    ',
      lowerLimit: '-50',
      upperLimit: '100',
      numberSuffix: '°C',
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
        { minValue: '0', maxValue: '10', label: 'Muy Frío', code: '#4A90E2' },  // Azul vibrante
        { minValue: '10', maxValue: '20', label: 'Frío', code: '#5AB3D1' },     // Azul moderado
        { minValue: '20', maxValue: '25', label: 'Normal', code: '#A8D08D' },    // Verde fresco
        { minValue: '25', maxValue: '35', label: 'Caliente', code: '#FF9F43' },  // Naranja cálido
        { minValue: '35', maxValue: '200', label: 'Muy Caliente', code: '#E94E77' } // Rojo vibrante
      ],
    },
    pointers: {
      pointer: [{ value: '22' }],
    },
    trendPoints: {
      point: [
        { startValue: '20', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '25', displayValue: '', dashed: '1', showValues: '0' },
        { startValue: '20', endValue: '25', displayValue: '', alpha: '40' },
      ],
    },
  };

  currentTemp: number = 22;
  status: string = 'Normal';
  lastUpdate: string = this.getCurrentTime();

  constructor() {
    let targetValue = this.currentTemp;
    setInterval(() => {
      targetValue = parseFloat((Math.random() * (30 - 15) + 15).toFixed(2));
      this.smoothTransition(this.currentTemp, targetValue.toString());
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
    this.currentTemp = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }

  updateStatus(value: number) {
    if (value >= 0 && value <= 10) {
      this.status = 'Muy Frío';
    } else if (value > 10 && value <= 20) {
      this.status = 'Frío';
    } else if (value > 20 && value <= 25) {
      this.status = 'Normal';
    } else if (value > 25 && value <= 35) {
      this.status = 'Caliente';
    } else {
      this.status = 'Muy Caliente';
    }
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
  }
}