import { Component, Input, OnChanges, SimpleChanges, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-linear-chartd3',
  templateUrl: './linear-chartd3.component.html',
  styleUrl: './linear-chartd3.component.css'
})
export class LinearChartd3Component implements OnChanges, AfterViewInit {
  @Input() data: any[] = [];

  private svg: any;
  private width: number = 500;
  private height: number = 100;
  private barHeight: number = 50;

  public currentPh: number = 7;
  public valorTexto: string = 'Cargando...';
  public alertaTexto: string = 'Normal';
  public lastUpdate: string = this.formatDate(new Date().toISOString());

  private levels = [
    { label: 'Muy Bajo', color: '#dafab6', max: 5 },
    { label: 'Bajo', color: '#bee78d', max: 10 },
    { label: 'Normal', color: '#b3dc82', max: 15 },
    { label: 'Alto', color: '#95c65a', max: 20 },
    { label: 'Muy Alto', color: '#85BB43', max: 25 }
  ];

  private minValue: number = 1;
  private maxValue: number = 25;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.createGauge();
    this.resize();
    if (!this.data || this.data.length === 0) {
      this.startSimulation();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data && this.data.length > 0) {
      const latestMeasurement = this.data[0];
      this.currentPh = parseFloat(latestMeasurement.measurementValue);
      this.updateGauge();
      this.alertaTexto = this.getAlertTextFromValue(this.currentPh);
      this.lastUpdate = this.formatDate(latestMeasurement.dateMeasurementComponent);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resize();
  }

  private createGauge() {
    const container = d3.select(this.el.nativeElement).select('#linear-gauge');
    container.selectAll('svg').remove();

    const containerNode = container.node() as HTMLElement | null;
    if (!containerNode) return;

    this.width = containerNode.getBoundingClientRect().width;

    const scale = d3.scaleLinear()
      .domain([this.minValue, this.maxValue])
      .range([0, this.width]);

    this.svg = container.append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    let lastX = 0;
    let lastMax = this.minValue;

    this.levels.forEach((level, index) => {
      let nextMax = level.max;
      if (index === this.levels.length - 1) {
        nextMax = this.maxValue;
      }

      const sectionWidth = Math.max(scale(nextMax) - scale(lastMax), 30);

      this.svg.append('rect')
        .attr('x', lastX)
        .attr('y', 29)
        .attr('width', sectionWidth)
        .attr('height', this.barHeight)
        .attr('fill', level.color)
        .attr('stroke', 'white');

      // Etiquetas visibles si hay suficiente espacio
      this.svg.append('text')
        .attr('x', lastX + sectionWidth / 2)
        .attr('y', 90)
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .attr('font-size', '10px')
        .text(level.label)
        .style('visibility', sectionWidth < 35 ? 'hidden' : 'visible');

      lastX += sectionWidth;
      lastMax = nextMax;
    });

    this.drawMarker();
  }

  private drawMarker() {
    const scale = d3.scaleLinear()
      .domain([this.minValue, this.maxValue])
      .range([0, this.width]);

    const resultPos = Math.min(Math.max(scale(this.currentPh), 5), this.width - 5);

    const marker = this.svg.selectAll('.marker').data([this.currentPh]);

    marker.enter()
      .append('circle')
      .attr('class', 'marker')
      .attr('cx', resultPos)
      .attr('cy', 20)
      .attr('r', 5)
      .attr('fill', 'black')
      .merge(marker)
      .transition().duration(1000)
      .attr('cx', resultPos);

    const label = this.svg.selectAll('.marker-label').data([this.currentPh]);

    label.enter()
      .append('text')
      .attr('class', 'marker-label')
      .attr('x', resultPos)
      .attr('y', 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'black')
      .merge(label)
      .transition().duration(1000)
      .attr('x', resultPos)
      .text(this.currentPh.toFixed(2));

    this.valorTexto = this.currentPh.toFixed(2);
    this.alertaTexto = this.getAlertTextFromValue(this.currentPh);
  }

  private updateGauge() {
    if (this.svg) {
      this.drawMarker();
    }
  }

  private getAlertTextFromValue(value: number): string {
    for (let i = 0; i < this.levels.length; i++) {
      if (value <= this.levels[i].max) {
        return this.levels[i].label;
      }
    }
    return 'Desconocido';
  }

  private resize() {
    const container = d3.select(this.el.nativeElement).select('#linear-gauge');
    const containerNode = container.node() as HTMLElement | null;
    if (!containerNode) return;
    this.width = containerNode.getBoundingClientRect().width;
    this.svg.selectAll('*').remove();
    this.createGauge();
  }

  private startSimulation() {
    setInterval(() => {
      this.currentPh = this.getRandomValue();
      this.updateGauge();
      this.lastUpdate = this.formatDate(new Date().toISOString());
    }, 2000);
  }

  private getRandomValue(): number {
    return Math.random() * (this.maxValue - this.minValue) + this.minValue;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
  }
}
