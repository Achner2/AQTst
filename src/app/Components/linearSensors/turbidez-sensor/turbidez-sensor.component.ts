import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-turbidez-sensor',
  templateUrl: './turbidez-sensor.component.html',
  styleUrls: ['./turbidez-sensor.component.css']
})
export class TurbidezSensorComponent implements OnChanges {
  @Input() data: any[] = [];

  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '            ',
      lowerLimit: '0',
      upperLimit: '40',
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
        { minValue: '0', maxValue: '5', label: 'Excelente', code: '#D6EBFF' },  // Azul muy claro
  { minValue: '5', maxValue: '10', label: 'Buena', code: '#BFE1FF' },     // Azul más claro
  { minValue: '10', maxValue: '20', label: 'Regular', code: '#99CCFF' },  // Azul medio claro
  { minValue: '20', maxValue: '40', label: 'Mala', code: '#80BBFF' }   // Azul intermedio
      ],
    },
    pointers: {
      pointer: [{ value: '5' }],
    },
    trendPoints: {
    },
  };

  currentTurbidity: number = 0;
  status: string = '';
  lastUpdate: string = this.getCurrentTime();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      const latestMeasurement = this.data[0]; // Tomamos la medición más reciente
      this.updatePointerValue(latestMeasurement.measurementValue.toString());
      this.status = latestMeasurement.alertName;
      this.lastUpdate = this.formatDate(latestMeasurement.dateMeasurementComponent);
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

  updatePointerValue(value: string) {
    this.currentTurbidity = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }
}
