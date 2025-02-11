import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ph-sensor',
  templateUrl: './ph-sensor.component.html',
  styleUrls: ['./ph-sensor.component.css']
})
export class PhSensorComponent implements OnChanges {
  @Input() data: any[] = [];

  dataSource = {
    chart: {
        theme: 'fusion',
        caption: '               ',
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
        responsive: '1',
    },
    colorRange: {
      color: [
{ minValue: '1', maxValue: '5.7', label: 'Muy Bajo', code: '#dafab6' },  // Verde blanquecino muy suave  
{ minValue: '5.7', maxValue: '6.0', label: 'Bajo', code: '#bee78d' },    // Verde pastel claro  
{ minValue: '6.0', maxValue: '8.5', label: 'Normal', code: '#b3dc82' },  // Verde pastel más intenso  
{ minValue: '8.5', maxValue: '9.0', label: 'Alto', code: '#95c65a' },    // Verde natural más notorio  
{ minValue: '9.0', maxValue: '14', label: 'Muy Alto', code: '#85BB43' }  // Verde de referencia sólido  

        
        
      ]
    },
    
    pointers: {
        pointer: [{ value: '7' }] 
    },
    trendPoints: {
    },
};



  currentPh: number = 7;
  measurementType: string = 'Lectura normal';
  lastUpdate: string = this.formatDate(new Date().toISOString());

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      const latestMeasurement = this.data[0]; // Tomamos la medición más reciente
      this.updatePointerValue(latestMeasurement.measurementValue.toString());
      this.measurementType = latestMeasurement.alertName;
      this.lastUpdate = this.formatDate(latestMeasurement.dateMeasurementComponent);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', { timeZone: 'UTC' });
  }

  updatePointerValue(value: string) {
    this.currentPh = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
  }
}
