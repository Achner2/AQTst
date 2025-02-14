import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeasurementService } from '../../Services/metricService/measurement.service';
import { Client, Stomp } from '@stomp/stompjs';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
  
})
export class ModalsComponent implements OnInit, OnDestroy {
  showAlternateGraphs = false;
  private stompClient: Client | null = null;
  showEquipmentInfo: boolean = false;
  isModalOpen = false;
  lastLecture: string = this.getCurrentTime();
  serialNumber: string = '08000015';

  mainGraphs = ["ph", "temperatura", "cloro", "turbidez", "color", "flujo"]
  alternateGraphs = ["cylinder", "caudal"]
  isTransitioning = false

  get currentGraphs() {
    return this.showAlternateGraphs ? this.alternateGraphs : this.mainGraphs
  }

  toggleGraphs() {
    this.isTransitioning = true
    setTimeout(() => {
      this.showAlternateGraphs = !this.showAlternateGraphs
      setTimeout(() => {
        this.isTransitioning = false
      }, 50)
    }, 500)
  }

  // Arrays separated by sensor type
  phMeasurements: any[] = [];
  cloroMeasurements: any[] = [];
  temperaturaMeasurements: any[] = [];
  turbidezMeasurements: any[] = [];
  flujoMeasurements: any[] = [];
  colorMeasurements: any[] = [];
  // WebSocket connection status
  isWebSocketConnected = false;
  componentNumber = 6;
  messageCounter = 0;
  constructor(
    private readonly measurementService: MeasurementService
  ) {}
  ngOnInit(): void {
    // No automatic data fetch on init
  }
  ngOnDestroy(): void {
    this.disconnectWebSocket();
  }
  openModal() {
    this.isModalOpen = true;
    this.fetchAllMeasurements();
    this.connectWebSocket();
    
  }
  closeModal() {
    this.isModalOpen = false;
    this.disconnectWebSocket();
  }
  toggleEquipmentInfo() {
    this.showEquipmentInfo = !this.showEquipmentInfo;
  }
  getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
  }
  fetchAllMeasurements(): void {
    this.measurementService.getLatestMeasurement(this.serialNumber).subscribe({
      next: (response) => {
        console.log('Datos recibidos:', response);
        if (response.success) {
          this.updateMeasurementArrays(response.data);
          this.lastLecture = this.formatDate(response.data[0]?.dateMeasurementComponent || new Date().toISOString());
          
        } else {
          console.error('Error en la respuesta de la API:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al obtener mediciones:', error);
      }
    });
  }
  private updateMeasurementArrays(data: any[]) {
    this.phMeasurements = data.filter(m => m.variableName === 'PH');
    this.cloroMeasurements = data.filter(m => m.variableName === 'Cloro');
    this.temperaturaMeasurements = data.filter(m => m.variableName === 'Temperatura');
    this.turbidezMeasurements = data.filter(m => m.variableName === 'Turbidez');
    this.flujoMeasurements = data.filter(m => m.variableName === 'Flujo');
    this.colorMeasurements = data.filter(m => m.variableName === 'Color');
  }
  connectWebSocket() {
    const socket = new WebSocket('ws://localhost:5051/dataHubWebSocket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.onConnect = () => {
      this.isWebSocketConnected = true;
      // Visual indication of successful connection
      Swal.fire({
        icon: 'success',
        title: 'Conexión con Aqutest Establecida',
        text: 'Escuchando actualizaciones en tiempo real',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      // Subscribe to the measurement alert topic
      this.stompClient?.subscribe('/topic/measurementAlert', (message) => {

        this.messageCounter ++;
        if(this.messageCounter == this.componentNumber){
          this.fetchAllMeasurements();
          this.messageCounter = 0

        }
        // When a message is received, fetch latest measurements again
      });
    };
    this.stompClient.onStompError = (error) => {
      this.isWebSocketConnected = false;
      // Visual indication of connection failure
      Swal.fire({
        icon: 'error',
        title: 'Error de Conexión',
        text: 'No se pudo establecer conexión con Aqutest',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      console.error('WebSocket Connection Error:', error);
    };
    this.stompClient.activate();
  }
  disconnectWebSocket() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
      this.isWebSocketConnected = false;
      // Optional: Visual indication of disconnection
      Swal.fire({
        icon: 'info',
        title: 'Conexión Cerrada',
        text: 'Aqutest desconectado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', { timeZone: 'UTC' });
  }
}