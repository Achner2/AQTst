import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EquipmentService } from '../../Services/equipmentService/equipment.service';
import { Equipment } from '../../interfaces/Equipment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  isSidebarOpen = false;
  isLoading = false;
  selectedEquipment: string | null = null; 

  // Equipos
  allEquipments: Equipment[] = [];
  filteredEquipments: Equipment[] = [];
  selectedSerial = '';

  // Control de gráficos
  showAlternateGraphs = false;
  isModalOpen = false;
  isTransitioning = false;

  // Sensores disponibles
  availableComponents: string[] = [];
  selectedComponents: { [key: string]: boolean } = {}; 
  maxSelectedComponents = 5; 

  // Datos de sensores
  phMeasurements: any[] = [];
  temperaturaMeasurements: any[] = [];
  cloroMeasurements: any[] = [];
  turbidezMeasurements: any[] = [];
  colorMeasurements: any[] = [];
  flujoMeasurements: any[] = [];

  constructor(private readonly equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments(): void {
    this.isLoading = true;
    this.equipmentService.getAllEquipments().subscribe({
      next: (equipments) => {
        this.allEquipments = equipments;
        this.filteredEquipments = equipments;
        this.isLoading = false;

        if (equipments.length > 0) {
          this.loadEquipmentData(equipments[0].serial);
        }
      },
      error: (error) => {
        console.error('Error cargando equipos:', error);
        this.isLoading = false;
      }
    });
  }

  toggleSidebar(): void { this.isSidebarOpen = !this.isSidebarOpen; }

  loadEquipmentData(serial: string): void {
    this.selectedSerial = serial;
    this.isLoading = true;

    this.equipmentService.getEquipmentBySerial(serial).subscribe({
      next: (equipment) => {
        this.isLoading = false;
        if (equipment) {
          this.processComponentData(equipment);
        }
      },
      error: (error) => {
        console.error(`Error cargando datos para el equipo ${serial}:`, error);
        this.isLoading = false;
      }
    });
  }

  processComponentData(equipment: Equipment): void {
    this.availableComponents = [];
    this.selectedComponents = {};
    
    if (!equipment.components || equipment.components.length === 0) return;

    equipment.components.forEach(component => {
      if (!component.status) return;

      const componentKey = this.mapComponentName(component.name.toLowerCase());
      if (componentKey) {
        this.availableComponents.push(componentKey);
        this.selectedComponents[componentKey] = false; // Inicializa todos como no seleccionados
      }
    });

    this.clearMeasurements();
  }

  clearMeasurements(): void {
    this.phMeasurements = [];
    this.temperaturaMeasurements = [];
    this.cloroMeasurements = [];
    this.turbidezMeasurements = [];
    this.colorMeasurements = [];
    this.flujoMeasurements = [];
  }

  toggleComponentSelection(component: string): void {
    // Si se está desactivando un componente, simplemente cambia su estado
    if (this.selectedComponents[component]) {
      this.selectedComponents[component] = false;
    } else {
      // Si se está activando, verifica que no exceda el máximo permitido
      const currentSelectedCount = Object.values(this.selectedComponents).filter(Boolean).length;
      
      if (currentSelectedCount < this.maxSelectedComponents) {
        this.selectedComponents[component] = true;
      } else {
        // Opcional: Mostrar un mensaje de alerta o notificación
        console.log(`Máximo de ${this.maxSelectedComponents} componentes permitidos`);
      }
    }
    
    // Cargar datos de componentes seleccionados
    this.updateSelectedComponentsData();
  }

  updateSelectedComponentsData(): void {
    this.clearMeasurements();
  
    if (this.selectedSerial) {
      this.equipmentService.getEquipmentBySerial(this.selectedSerial).subscribe(equipment => {
        if (equipment && equipment.components) {
          Object.keys(this.selectedComponents).forEach(componentKey => {
            if (this.selectedComponents[componentKey]) {
              const component = equipment.components?.find(comp => 
                this.mapComponentName(comp.name.toLowerCase()) === componentKey
              );
              
              if (component) {
                this.assignMeasurementData(componentKey, component);
              }
            }
          });
        }
      });
    }
  }

  assignMeasurementData(key: string, component: any): void {
    const data = component.measurementRanges?.map((range: any) => ({
      min: range.valueMin,
      max: range.valueMax,
      operator: {
        min: range.operatorMin,
        max: range.operatorMax
      },
      color: range.colorHex,
      alertLevel: range.idAlertLevel
    })) || [];

    switch (key) {
      case 'ph': this.phMeasurements = data; break;
      case 'temperatura': this.temperaturaMeasurements = data; break;
      case 'cloro': this.cloroMeasurements = data; break;
      case 'turbidez': this.turbidezMeasurements = data; break;
      case 'color': this.colorMeasurements = data; break;
      case 'flujo': this.flujoMeasurements = data; break;
    }
  }

  onFilterChange(selectedSerial: string) {
    this.selectedEquipment = selectedSerial;
    if (selectedSerial) {
      this.loadEquipmentData(selectedSerial);
    }
  }

  mapComponentName(name: string): string | null {
    const mapping: { [key: string]: string } = {
      'sensor ph': 'ph',
      'sensor cloro': 'cloro',
      'sensor temperatura': 'temperatura',
      'sensor turbidez': 'turbidez',
      'sensor flujo aqutest': 'flujo',
      'sensor color': 'color'
    };

    return mapping[name] || null;
  }

  getSelectedComponentsCount(): number {
    return Object.values(this.selectedComponents).filter(Boolean).length;
  }
}