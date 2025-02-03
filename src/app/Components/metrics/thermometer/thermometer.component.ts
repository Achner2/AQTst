import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LinearGaugeComponent } from '@syncfusion/ej2-angular-lineargauge';
import { ContainerType, Orientation, ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';


@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrl: './thermometer.component.css',
  encapsulation: ViewEncapsulation.None

})
export class ThermometerComponent {
  @ViewChild('gauge') public gauge!: LinearGaugeComponent;


  public axes: Object[] = [{
    minimum: 0,
    maximum: 180,
    line: { width: 0 },
    majorTicks: { interval: 20, color: '#9e9e9e', height: 20 },
    minorTicks: { color: '#9e9e9e', height: 10, interval: 10 },
    labelStyle: { font: { fontFamily: 'inherit' } },
    pointers: [{
      value: 90,
      height: 13,
      width: 13,
      type: 'Bar',
      color: '#f02828'
    }]
  }, {
    minimum: 0,
    maximum: 180,
    line: { width: 0 },
    majorTicks: { interval: 20, height: 20, color: '#9e9e9e' },
    minorTicks: { height: 10, interval: 10, color: '#9e9e9e' },
    opposedPosition: true,
    labelStyle: { font: { fontFamily: 'inherit' } },
    pointers: [{ width: 0 }]
  }];



  public containerType: Object = {
    width: 13,
    roundedCornerRadius: 5,
    type: 'Thermometer'
  };

  public titleStyle: Object = {
    fontFamily: 'inherit'
  };

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.gauge.theme = <LinearGaugeTheme>(
      selectedTheme.charAt(0).toUpperCase() + 
      selectedTheme.slice(1)
    ).replace(/-dark/i, 'Dark')
     .replace(/contrast/i, 'Contrast')
     .replace(/-high/i, 'High')
     .replace(/5.3/i, '5');
  }

  ngOnInit(): void {
    // No es necesario el código de los botones, ya que será solo vertical.
    this.gauge.orientation = 'Vertical';
    this.gauge.container.type = 'Thermometer';
    this.gauge.refresh();
  }
}

















