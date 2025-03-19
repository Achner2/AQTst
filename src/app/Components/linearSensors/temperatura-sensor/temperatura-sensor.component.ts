import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-temperatura-sensor',
  templateUrl: './temperatura-sensor.component.html',
  styleUrls: ['./temperatura-sensor.component.css']
})
export class TemperaturaSensorComponent implements OnChanges {
  @Input() data: any[] = [];

  dataSource = {
    chart: {
      theme: 'fusion',
      lowerLimit: '-50',
      upperLimit: '100',
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
        { minValue: '0', maxValue: '10', label: 'Muy Frío', code: '#DAFAB6' },  
        { minValue: '10', maxValue: '20', label: 'Frío', code: '#BEE78D' }, 
        { minValue: '20', maxValue: '25', label: 'Normal', code: '#B3DC82' },
        { minValue: '25', maxValue: '35', label: 'Caliente', code: '#95C65A' },
        { minValue: '35', maxValue: '100', label: 'Muy Caliente', code: '#85BB43' }
      
      ],
    },
    pointers: {
      pointer: [{ value: '22' }],
    }
  };

  currentTemp: number = 22;
  status: string = 'Normal';
  lastUpdate: string = this.getCurrentTime();
  alertName: string = 'Normal';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data.length > 0) {
      const latestMeasurement = this.data[0];
      this.updateTemperature(latestMeasurement.measurementValue);
      this.alertName = latestMeasurement.alertName;
      this.lastUpdate = this.formatDate(latestMeasurement.dateMeasurementComponent);
    }
  }

  updateTemperature(newValue: number) {
    this.currentTemp = newValue;
    this.dataSource.pointers.pointer[0].value = newValue.toString();
    this.updateStatus(newValue);
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
    return new Date().toLocaleString();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  }
}
