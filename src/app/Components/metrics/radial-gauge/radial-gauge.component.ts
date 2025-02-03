import { Component, ViewChild, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { IgxRadialGaugeComponent, RadialGaugeNeedleShape, RadialGaugePivotShape } from 'igniteui-angular-gauges';

@Component({
  selector: 'app-radial-gauge',
  templateUrl: './radial-gauge.component.html',
  styleUrl: './radial-gauge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadialGaugeComponent implements OnInit, OnDestroy {
  @ViewChild('temperatureGauge', { static: false }) public temperatureGauge!: IgxRadialGaugeComponent;

  public temperatureSettings = {
    value: 25,
    minimumValue: 0,
    maximumValue: 50,
    interval: 10,
    labelInterval: 10,
    labelExtent: 0.6,
    scaleStartAngle: 150,
    scaleEndAngle: 30,
    scaleBrush: "#2196F3",
    needleShape: RadialGaugeNeedleShape.NeedleWithBulb,
    needlePivotShape: RadialGaugePivotShape.CircleOverlay,
    needleBrush: "#1976D2",
  };
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startTemperatureSimulation();
  }

  startTemperatureSimulation() {
    this.intervalId = setInterval(() => {
      this.temperatureSettings.value = Math.floor(Math.random() * (this.temperatureSettings.maximumValue + 1));
      this.updateGaugeColors();
      this.cdr.detectChanges();
    }, 3000); // Actualiza cada 3 segundos
  }

  updateGaugeColors() {
    const temp = this.temperatureSettings.value;
    if (temp < 10) { // FRÍO
      this.temperatureSettings.scaleBrush = "#2196F3"; // Azul
      this.temperatureSettings.needleBrush = "#1976D2"; // Azul Oscuro
    } else if (temp >= 10 && temp <= 20) { // TEMPLADO
      this.temperatureSettings.scaleBrush = "#FFEB3B"; // Amarillo
      this.temperatureSettings.needleBrush = "#FBC02D"; // Amarillo Oscuro
    } else if (temp > 20 && temp <= 30) { // ÓPTIMO
      this.temperatureSettings.scaleBrush = "#4CAF50"; // Verde
      this.temperatureSettings.needleBrush = "#388E3C"; // Verde Oscuro
    } else { // CALIENTE
      this.temperatureSettings.scaleBrush = "#FF5722"; // Rojo
      this.temperatureSettings.needleBrush = "#D32F2F"; // Rojo Oscuro
    }
  }

  getTemperatureStatus(value: number): string {
    if (value < 10) return "Frío";
    if (value >= 10 && value <= 20) return "Templado";
    if (value > 20 && value <= 30) return "Óptimo";
    return "Caliente";
  }

  getTemperatureClass(value: number): string {
    if (value < 10) return "text-cold";
    if (value >= 10 && value <= 20) return "text-warm";
    if (value > 20 && value <= 30) return "text-optimal";
    return "text-hot";
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
