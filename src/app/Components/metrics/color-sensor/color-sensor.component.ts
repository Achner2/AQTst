import { Component, ViewChild } from "@angular/core";
import { IgxRadialGaugeComponent } from "igniteui-angular-gauges";
import { IgxRadialGaugeRangeComponent } from "igniteui-angular-gauges";
import { RadialGaugeNeedleShape } from "igniteui-angular-gauges";

@Component({
  selector: 'app-color-sensor',
  templateUrl: './color-sensor.component.html',
  styleUrl: './color-sensor.component.css'
})
export class ColorSensorComponent {
  @ViewChild("radialGauge", { static: true })
  public radialGauge!: IgxRadialGaugeComponent;

  detectedColor: string = "Azul Claro"; // Color inicial
  intensity: number = 100; // Intensidad inicial (pureza)
  status: string = "Excelente"; // Estado inicial
  lastUpdate: string = new Date().toLocaleTimeString(); // Última actualización

  private shouldAnimate: boolean = false;

  ngAfterViewInit(): void {
    this.setupGauge();
    this.simulateWaterData(); // Iniciar simulación de datos
  }

  private setupGauge(): void {
    if (this.shouldAnimate) {
      this.radialGauge.transitionDuration = 500;
    }

    this.radialGauge.height = "330px";
    this.radialGauge.width = "100%";
    this.radialGauge.minimumValue = 0;
    this.radialGauge.maximumValue = 100; // 0% a 100% intensidad del color
    this.radialGauge.value = this.intensity;
    this.radialGauge.interval = 10;

    this.radialGauge.labelInterval = 10;
    this.radialGauge.labelExtent = 0.71;
    this.radialGauge.font = "10px Verdana,Arial";

    this.radialGauge.isNeedleDraggingEnabled = false;
    this.radialGauge.needleShape = RadialGaugeNeedleShape.Triangle;
    this.radialGauge.needleBrush = "#000000"; 
    this.radialGauge.needleOutline = "#000000";

    this.radialGauge.minorTickCount = 4;
    this.radialGauge.minorTickBrush = "#79797a";
    this.radialGauge.tickBrush = "#79797a";

    this.radialGauge.scaleStartAngle = 120;
    this.radialGauge.scaleEndAngle = 60;
    this.radialGauge.scaleBrush = "#d6d6d6";

    this.radialGauge.backingBrush = "#fcfcfc";
    this.radialGauge.backingOutline = "#d6d6d6";

    // Definir rangos de colores
    const range1 = new IgxRadialGaugeRangeComponent();
    range1.startValue = 90;
    range1.endValue = 100;
    range1.brush = "#00BFFF"; // Azul Claro

    const range2 = new IgxRadialGaugeRangeComponent();
    range2.startValue = 70;
    range2.endValue = 89;
    range2.brush = "#32CD32"; // Verde

    const range3 = new IgxRadialGaugeRangeComponent();
    range3.startValue = 50;
    range3.endValue = 69;
    range3.brush = "#FFD700"; // Amarillo

    const range4 = new IgxRadialGaugeRangeComponent();
    range4.startValue = 30;
    range4.endValue = 49;
    range4.brush = "#FF8C00"; // Naranja

    const range5 = new IgxRadialGaugeRangeComponent();
    range5.startValue = 0;
    range5.endValue = 29;
    range5.brush = "#FF0000"; // Rojo

    this.radialGauge.ranges.clear();
    this.radialGauge.ranges.add(range1);
    this.radialGauge.ranges.add(range2);
    this.radialGauge.ranges.add(range3);
    this.radialGauge.ranges.add(range4);
    this.radialGauge.ranges.add(range5);

    this.shouldAnimate = true;
  }

  private simulateWaterData(): void {
    setInterval(() => {
      this.intensity = Math.floor(Math.random() * 101); // Generar intensidad entre 0 y 100

      // Determinar color del agua basado en la intensidad
      if (this.intensity >= 90) {
        this.detectedColor = "Azul Claro";
        this.status = "Excelente";
      } else if (this.intensity >= 70) {
        this.detectedColor = "Verde";
        this.status = "Buena";
      } else if (this.intensity >= 50) {
        this.detectedColor = "Amarillo";
        this.status = "Advertencia";
      } else if (this.intensity >= 30) {
        this.detectedColor = "Naranja";
        this.status = "Contaminación Moderada";
      } else {
        this.detectedColor = "Rojo";
        this.status = "Peligro: Alta Contaminación";
      }

      this.lastUpdate = new Date().toLocaleTimeString();

      // Actualizar el gauge con la nueva intensidad
      if (this.radialGauge) {
        this.radialGauge.value = this.intensity;
      }
    }, 3000); // Simula nuevos datos cada 3 segundos
  }
}
