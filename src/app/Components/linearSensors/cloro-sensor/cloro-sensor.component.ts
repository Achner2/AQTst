import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cloro-sensor',
  templateUrl: './cloro-sensor.component.html',
  styleUrls: ['./cloro-sensor.component.css']
})
export class CloroSensorComponent implements OnChanges {
  @Input() data: any[] = []; 

  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '             ',
      lowerLimit: '0.1',
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
        { minValue: '0', maxValue: '0.2', label: 'Muy Bajo', code: '#DAFAB6' },  
        { minValue: '0.2', maxValue: '0.3', label: 'Bajo', code: '#BEE78D' },    
        { minValue: '0.3', maxValue: '2.8', label: 'Normal', code: '#B3DC82' }, 
        { minValue: '2.8', maxValue: '3.0', label: 'Alto', code: '#95C65A' },    
        { minValue: '3.0', maxValue: '5', label: 'Muy Alto', code: '#85BB43' } 
        
      ],      
    },
    
    pointers: {
      pointer: [{ value: '1.5' }],
    },
    trendPoints: {
    },
  };

  currentCloro: number = 1.5;
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

  updatePointerValue(value: string) {
    this.currentCloro = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  }
}
