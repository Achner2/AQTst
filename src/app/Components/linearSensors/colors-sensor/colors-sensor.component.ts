import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-colors-sensor',
  templateUrl: './colors-sensor.component.html',
  styleUrls: ['./colors-sensor.component.css']
})
export class ColorsSensorComponent implements OnChanges {
  @Input() data: any[] = []; // Recibimos los datos desde el componente padre

  dataSource = {
    chart: {
      theme: 'fusion',
      caption: '            ',
      lowerLimit: '0',
      upperLimit: '30',
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
        { minValue: '-1', maxValue: '0', label: 'Muy Bajo', code: '#DAFAB6' },  // Verde blanquecino muy suave  
        { minValue: '0', maxValue: '1', label: 'Bajo', code: '#BEE78D' },       // Verde pastel claro  
        { minValue: '1', maxValue: '15', label: 'Normal', code: '#B3DC82' },    // Verde pastel más intenso  
        { minValue: '15', maxValue: '18', label: 'Alto', code: '#95C65A' },     // Verde natural más notorio  
        { minValue: '18', maxValue: '20', label: 'Muy Alto', code: '#85BB43' }  // Verde de referencia sólido  
         
      ],
      
    },
    pointers: {
      pointer: [{ value: '0' }],
    },
    trendPoints: {
    },
  };

  currentPcu: number = 0;
  status: string = 'Bajo'; 
  lastUpdate: string = this.getCurrentTime();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      const latestMeasurement = this.data[0]; // Tomamos la última medición recibida
      this.updatePointerValue(latestMeasurement.measurementValue.toString());
      this.status = latestMeasurement.alertName;
      this.lastUpdate = this.formatDate(latestMeasurement.dateMeasurementComponent);
    }
  }

  updatePointerValue(value: string) {
    this.currentPcu = parseFloat(value);
    this.dataSource.pointers.pointer[0].value = value;
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
