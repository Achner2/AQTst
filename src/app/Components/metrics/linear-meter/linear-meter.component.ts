import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { IgxLinearGaugeComponent } from "igniteui-angular-gauges";
import { IgxLinearGraphRangeComponent } from "igniteui-angular-gauges";
import { LinearGraphNeedleShape } from "igniteui-angular-gauges";

@Component({
  selector: 'app-linear-meter',
  templateUrl: './linear-meter.component.html',
  styleUrl: './linear-meter.component.css'
})
export class LinearMeterComponent implements AfterViewInit {
  @ViewChild("linearGauge", { static: true }) public linearGauge!: IgxLinearGaugeComponent;

  public currentValue: number = 50;
  public status: string = "Normal";
  public lastUpdate: string = new Date().toLocaleTimeString();
  private updateInterval: number = 2000; // Intervalo de actualización (2 segundos)

  public ngAfterViewInit(): void {
    this.linearGauge.transitionDuration = 1000; // Suaviza el movimiento de la aguja
    this.startUpdatingValues();
  }

  private startUpdatingValues(): void {
    setInterval(() => {
      this.currentValue = this.getRandomValue(0, 100);
      this.linearGauge.value = this.currentValue;

      this.status = this.getStatus(this.currentValue);
      this.lastUpdate = new Date().toLocaleTimeString();
    }, this.updateInterval); // Cambia el valor cada 2 segundos
  }

  private getRandomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getStatus(value: number): string {
    if (value < 30) return "Bajo";
    if (value < 70) return "Normal";
    return "Alto";
  }

  ngOnInit() {
    this.applyStyles();
    this.applyRanges(); // Aplica los colores de los rangos
  }

  private applyStyles() {
    // Colores personalizados para la aguja y la escala
    this.linearGauge.needleBrush = "#050605"; // Rojo anaranjado
    this.linearGauge.needleOutline = "#ffffff"; // Blanco
    this.linearGauge.needleStrokeThickness = 2;
    this.linearGauge.needleOuterExtent = 0.9;
    this.linearGauge.needleInnerExtent = 0.3;

    // Colores de la escala
    this.linearGauge.scaleBrush = "#bababa"; // Gris claro
    this.linearGauge.scaleOutline = "#676868"; // Gris oscuro
    this.linearGauge.scaleInnerExtent = 0.075;
    this.linearGauge.scaleOuterExtent = 0.85;
    this.linearGauge.scaleStartExtent = 0.05;
    this.linearGauge.scaleEndExtent = 0.95;

    // Colores de fondo: lo que vamos a modificar
    this.linearGauge.backingBrush = "#FFFFFF"; // Blanco para el fondo
    this.linearGauge.backingOutline = "#676868"; // Gris claro
    this.linearGauge.backingStrokeThickness = 0;
  }

  private applyRanges() {
     // Definir los rangos de pH mapeados al rango de 0 a 100
     const acidicRange = new IgxLinearGraphRangeComponent();
     acidicRange.startValue = 0;
     acidicRange.endValue = 30;
     acidicRange.brush = "#b0555d"; // Rojo para el rango ácido
 
     const neutralRange = new IgxLinearGraphRangeComponent();
     neutralRange.startValue = 30;
     neutralRange.endValue = 35;
     neutralRange.brush = "#73be6e"; // Verde claro para el rango neutro
 
     const alkalineRange = new IgxLinearGraphRangeComponent();
     alkalineRange.startValue = 35;
     alkalineRange.endValue = 100;
     alkalineRange.brush = "#41eb65"; // Verde fuerte para el rango alcalino
 
     // Agregar los rangos al gráfico
     this.linearGauge.ranges.clear();
     this.linearGauge.ranges.add(acidicRange);
     this.linearGauge.ranges.add(neutralRange);
     this.linearGauge.ranges.add(alkalineRange);
  }

}
