import { Component, AfterViewInit, ViewChild, OnDestroy } from "@angular/core";
import { IgxLinearGaugeComponent } from "igniteui-angular-gauges";
import { IgxLinearGraphRangeComponent } from "igniteui-angular-gauges";

@Component({
  selector: 'app-chlorine-meter',
  templateUrl: './chlorine-meter.component.html',
  styleUrls: ['./chlorine-meter.component.css']
})
export class ChlorineMeterComponent implements AfterViewInit, OnDestroy {
  @ViewChild("linearGauge", { static: true })
  public linearGauge!: IgxLinearGaugeComponent;

  public chlorineValue: number = 0; // Valor inicial del cloro
  public chlorineStatus: string = ""; // Estado del cloro

  private dataInterval: any; // Variable para almacenar el intervalo

  public ngAfterViewInit(): void {
    this.configureChlorineGauge();
    this.startDataSimulation(); // Iniciar la simulación de datos constante
  }

  public ngOnDestroy(): void {
    this.stopDataSimulation(); // Limpiar el intervalo al destruir el componente
  }

  private configureChlorineGauge(): void {
    this.linearGauge.minimumValue = 0;
    this.linearGauge.maximumValue = 5;
    this.linearGauge.value = this.chlorineValue; // Usar el valor cargado
    this.linearGauge.interval = 0.5;

    const range1 = new IgxLinearGraphRangeComponent();
    range1.startValue = 0;
    range1.endValue = 1;
    range1.brush = "#d5304b"; // Rojo (bajo)

    const range2 = new IgxLinearGraphRangeComponent();
    range2.startValue = 1;
    range2.endValue = 3;
    range2.brush = "#23dc61"; // Verde (óptimo)

    const range3 = new IgxLinearGraphRangeComponent();
    range3.startValue = 3;
    range3.endValue = 5;
    range3.brush = "#dc9323"; // Naranja (alto)

    this.linearGauge.rangeBrushes = [range1.brush, range2.brush, range3.brush];
    this.linearGauge.ranges.clear();
    this.linearGauge.ranges.add(range1);
    this.linearGauge.ranges.add(range2);
    this.linearGauge.ranges.add(range3);

    this.linearGauge.backingBrush = "transparent";
    this.linearGauge.backingOutline = "transparent";

    this.linearGauge.tickStrokeThickness = 2; // Grosor de las marcas
    this.linearGauge.fontBrush = "#ffffff"; // Color del texto
    this.linearGauge.font = "bold 12px Arial"; // Fuente del texto
    this.linearGauge.labelInterval = 1; // Intervalo de las etiquetas
    this.linearGauge.transitionDuration = 1000; // Duración de la animación
  }

  private startDataSimulation(): void {
    // Simular una actualización constante de datos cada 2 segundos
    this.dataInterval = setInterval(() => {
      const simulatedData = this.getRandomValue(0, 5); // Generar un valor aleatorio entre 0 y 5
      this.chlorineValue = simulatedData;
      this.linearGauge.value = this.chlorineValue; // Actualizar el valor del medidor
      this.chlorineStatus = this.getChlorineStatus(this.chlorineValue); // Actualizar el estado
    }, 2000); // Actualizar cada 2 segundos
  }

  private stopDataSimulation(): void {
    if (this.dataInterval) {
      clearInterval(this.dataInterval); // Limpiar el intervalo
    }
  }

  private getRandomValue(min: number, max: number): number {
    // Generar un valor aleatorio entre min y max
    return Math.random() * (max - min) + min;
  }

  public getChlorineStatus(value: number): string {
    if (value < 1) {
      return "Bajo";
    } else if (value >= 1 && value <= 3) {
      return "Óptimo";
    } else {
      return "Alto";
    }
  }
}