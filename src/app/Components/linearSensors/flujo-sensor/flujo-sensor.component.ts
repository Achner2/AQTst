import { Component } from '@angular/core';

@Component({
  selector: 'app-flujo-sensor',
  templateUrl: './flujo-sensor.component.html',
  styleUrl: './flujo-sensor.component.css'
})
export class FlujoSensorComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '              ',
      lowerLimit: '0',
      upperLimit: '1',
      numberSuffix: '',
      chartBottomMargin: '50',
      valueFontSize: '11',
      valueFontBold: '0',
      chartLeftMargin: '20',
      chartRightMargin: '20',
      chartTopMargin: '20',
      animationDuration: '1',
      showValue: '1', // Mostrar el valor numérico en el gráfico
      responsive: '1', // Habilita la responsividad del gráfico
    },
    colorRange: {
      color: [
        { minValue: '0', maxValue: '0.5', label: 'Sin Flujo', code: '#FF4C4C' }, // Rojo
        { minValue: '0.5', maxValue: '1', label: 'Con Flujo', code: '#A1D99B' }  // Verde
      ],
    },
    pointers: {
      pointer: [{ value: '0' }], // Valor inicial: 0 (sin flujo)
    },
  };

  currentFlow: number = 0; // 0: Sin flujo, 1: Con flujo
  status: string = 'Sin Flujo';
  lastUpdate: string = this.getCurrentTime();

  constructor() {
    // Simula un cambio aleatorio entre 0 y 1 cada 3 segundos
    setInterval(() => {
      const targetValue = Math.round(Math.random());
      this.updateFlow(targetValue);
    }, 3000);
  }

  updateFlow(value: number) {
    this.currentFlow = value;
    this.dataSource.pointers.pointer[0].value = value.toString();
    this.updateStatus(value);
    this.lastUpdate = this.getCurrentTime();
  }

  updateStatus(value: number) {
    this.status = value === 0 ? 'Sin Flujo' : 'Con Flujo';
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
  }
}
