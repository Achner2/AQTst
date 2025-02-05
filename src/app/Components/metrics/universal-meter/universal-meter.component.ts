import { Component } from '@angular/core';

@Component({
  selector: 'app-universal-meter',
  templateUrl: './universal-meter.component.html',
  styleUrls: ['./universal-meter.component.css']
})
export class UniversalMeterComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: 'sensor de Ph',
      lowerLimit: '0',
      upperLimit: '100',
      numberSuffix: '%',
      chartBottomMargin: '50',
      valueFontSize: '11',
      valueFontBold: '0',
      chartLeftMargin: '20',
      chartRightMargin: '20',
      chartTopMargin: '20',
    },
    colorRange: {
      color: [
        { minValue: '0', maxValue: '35', label: 'Low' },
        { minValue: '35', maxValue: '70', label: 'Moderate' },
        { minValue: '70', maxValue: '100', label: 'High' },
      ],
    },
    pointers: {
      pointer: [{ value: '75' }],
    },
    trendPoints: {
      point: [
        { startValue: '70', displayValue: ' ', dashed: '1', showValues: '0' },
        { startValue: '85', displayValue: ' ', dashed: '1', showValues: '0' },
        { startValue: '70', endValue: '85', displayValue: ' ', alpha: '40' },
      ],
    },
  };
}
