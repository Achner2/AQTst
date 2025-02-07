import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-flujo-sensor',
  templateUrl: './flujo-sensor.component.html',
  styleUrls: ['./flujo-sensor.component.css']
})
export class FlujoSensorComponent implements OnChanges {
  @Input() data: any[] = []; // Recibimos los datos desde el componente padre

  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '               ',
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
      showValue: '1', 
      responsive: '1',
      valueFontColor: "#e9f0f7"
    },
    colorRange: {
      color: [
        { minValue: '0', maxValue: '0.5', label: 'Sin Flujo', code: '#D6EBFF' },  // Azul muy claro
        { minValue: '0.5', maxValue: '1', label: 'Con Flujo', code: '#99CCFF' } 
      ],
    },
    pointers: {
      pointer: [{ value: '0' }],
    },
  };

  currentFlow: number = 0;
  status: string = 'Sin Flujo';
  lastUpdate: string = this.getCurrentTime();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      const latestMeasurement = this.data[0]; // Tomamos la última medición recibida
      this.updateFlow(latestMeasurement.measurementValue);
      this.status = latestMeasurement.alertName;
      this.lastUpdate = this.formatDate(latestMeasurement.dateMeasurementComponent);
    }
  }

  updateFlow(value: number) {
    this.currentFlow = value;
    this.dataSource.pointers.pointer[0].value = value.toString();
    this.updateStatus(value);
    this.lastUpdate = this.getCurrentTime();
  }

  updateStatus(value: number) {
    if (value === 0) {
      this.status = 'Sin Flujo';
    } else {
      this.status = 'Con Flujo';
    }
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleString('es-CO', { timeZone: 'UTC' });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', { timeZone: 'UTC' });
  }
}
