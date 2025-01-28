import { Component } from '@angular/core';

@Component({
  selector: 'app-cylinder',
  templateUrl: './cylinder.component.html',
  styleUrl: './cylinder.component.css'
})
export class CylinderComponent {
  dataSource = {
    chart: {
      theme: 'fusion',
      caption: 'Diesel Level in Generator',
      subcaption: 'Bakersfield Central',
      lowerLimit: '0',
      upperLimit: '120',
      lowerLimitDisplay: 'Empty',
      upperLimitDisplay: 'Full',
      numberSuffix: ' ltrs',
      showValue: '0',
      chartBottomMargin: '45',
    },
    value: '110',
    annotations: {
      origw: '400',
      origh: '190',
      autoscale: '1',
      groups: [
        {
          id: 'range',
          items: [
            {
              id: 'rangeBg',
              type: 'rectangle',
              x: '$canvasCenterX-45',
              y: '$chartEndY-30',
              tox: '$canvasCenterX+45',
              toy: '$chartEndY-75',
              fillcolor: '#6caa03',
            },
            {
              id: 'rangeText',
              type: 'Text',
              fontSize: '11',
              fillcolor: '#333333',
              text: '80 ltrs',
              x: '$chartCenterX-45',
              y: '$chartEndY-50',
            },
          ],
        },
      ],
    },
  };

  chartEvents = {
    rendered: (evt: any) => {
      let fuelVolume = 110;
      evt.sender.chartInterval = setInterval(() => {
        fuelVolume = fuelVolume < 10 ? 80 : fuelVolume - Math.floor(Math.random() * 3);
        evt.sender.feedData?.(`&value=${fuelVolume}`);
      }, 1000);
    },
    realTimeUpdateComplete: (evt: any) => {
      const annotations = evt.sender.annotations;
      const dataVal = evt.sender.getData();
      let colorVal;
      if (dataVal >= 70) {
        colorVal = '#6caa03';
      } else if (dataVal <= 35) {
        colorVal = '#e44b02';
      } else {
        colorVal = '#f8bd1b';
      }

      annotations?.update('rangeText', { text: `${dataVal} ltrs` });
      annotations?.update('rangeBg', { fillcolor: colorVal });
    },
    disposed: (evt: any) => {
      clearInterval(evt.sender.chartInterval);
    },
  };
}
