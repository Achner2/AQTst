import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-nivel-sensor',
  templateUrl: './nivel-sensor.component.html',
  styleUrls: ['./nivel-sensor.component.css']
})
export class NivelSensorComponent implements OnChanges {
  @Input() data: any[] = [];

  dataSource = {
    chart: {
      theme: 'fusion',
      caption: 'Sensor de Nivel',
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
      responsive: '1', 
    },
    colorRange: {
      color: [
        { minValue: '0', maxValue: '5', label: 'Muy Bajo', code: '#FF4C4C' },
        { minValue: '5', maxValue: '10', label: 'Bajo', code: '#FF9966' },
        { minValue: '10', maxValue: '20', label: 'Normal', code: '#A1D99B' },
        { minValue: '20', maxValue: '25', label: 'Alto', code: '#66B3FF' },
        { minValue: '25', maxValue: '30', label: 'Muy Alto', code: '#FF6666' }
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
  status: string = ''; 
  lastUpdate: string = this.getCurrentTime();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      const latestMeasurement = this.data[0]; // Tomamos la última medición recibida
      this.updatePointerValue(latestMeasurement.measurementValue.toString());
      this.status = latestMeasurement.measurementTypeName;
      this.lastUpdate = this.formatDate(latestMeasurement.dateMeasurementComponent);
    }
  }

  getCurrentTime(): string {
    return new Date().toLocaleString('es-CO', { timeZone: 'UTC' });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', { timeZone: 'UTC' });
  }

  updatePointerValue(value: string) {
    this.currentLevel = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }
}
