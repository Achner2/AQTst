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
      upperLimit: '5',
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
        { minValue: '-1', maxValue: '0', label: 'Muy Bajo', code: '#DAFAB6' },   // Verde blanquecino muy suave  
        { minValue: '0', maxValue: '0.1', label: 'Bajo', code: '#BEE78D' },      // Verde pastel claro  
        { minValue: '0.1', maxValue: '1.3', label: 'Normal', code: '#B3DC82' },  // Verde pastel más intenso  
        { minValue: '1.3', maxValue: '1.79', label: 'Alto', code: '#95C65A' },   // Verde natural más notorio  
        { minValue: '1.79', maxValue: '2.00', label: 'Muy Alto', code: '#85BB43' } // Verde de referencia sólido  
         
    ]},
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
      const latestMeasurement = this.data[0];
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
