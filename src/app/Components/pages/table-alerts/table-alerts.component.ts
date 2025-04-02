import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TableResponseService } from '../../../Services/tableResponse/table-response.service';
import { AlertTableItem, MeasurementFilter, Measurement } from '../../../interfaces/MeasurementResponse';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Equipment } from '../../../interfaces/Equipment';
import { EquipmentService } from '../../../Services/equipmentService/equipment.service';

@Component({
  selector: 'app-table-alerts',
  templateUrl: './table-alerts.component.html',
  styleUrls: ['./table-alerts.component.css']
})
export class TableAlertsComponent implements OnInit {
  isSidebarOpen: boolean = false;
  isLoading: boolean = false;
  showFilters: boolean = false;
  
  availableComponents: string[] = [];
  equipments: Equipment[] = [];
  equipmentSerials: string[] = [];
  isLoadingEquipments: boolean = false;

  availableColumns = [
    { value: 'Serial', name: 'Serial' },
    { value: 'Valor', name: 'Valor' },
    { value: 'Componente', name: 'Componente' },
    { value: 'Variable', name: 'Variable' },
    { value: 'Unidades', name: 'Unidades' },
    { value: 'FechaRecepcion', name: 'Fecha Recepción' },
    { value: 'Fechaemedicion', name: 'Fecha Medición' },
    { value: 'Estado', name: 'Estado' },
    { value: 'TipoMedicion', name: 'Tipo Medición' },
    { value: 'Icono', name: 'Icono' }
  ];

  columnas: string[] = [
    'Serial', 'Componente','Valor' ,'Unidades', 'FechaRecepcion',
    'Fechaemedicion', 'Estado', 'TipoMedicion', 'Icono'
  ];
  
  alertas = new MatTableDataSource<AlertTableItem>([]);
  
  totalItems: number = 0;
  pageSize: number = 7;
  currentPage: number = 0;

  filters: MeasurementFilter = {
    serialEquipment: null,
    dateMeasurementComponentStart: null,
    dateMeasurementComponentEnd: null,
    alertCode: null,
    measurementValueStart: null,
    measurementValueEnd: null,
    directionComponent: null,
    channelComponent: null,
    includeAllAlerts: false,
    excludeAlertCode00: true
  };
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly measurementService: TableResponseService,
    private readonly equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.loadEquipments();
    this.loadData();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.onPageChange(event);
    });
  }

  loadEquipments(): void {
    this.isLoadingEquipments = true;
    this.equipmentService.getAllEquipments().subscribe({
      next: (data) => {
        this.equipments = data;
        this.equipmentSerials = data.map(eq => eq.serial);
        this.isLoadingEquipments = false;
      },
      error: (error) => {
        console.error('Error loading equipments:', error);
        this.isLoadingEquipments = false;
      }
    });
  }

  onSerialSelected(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filters.serialEquipment = select.value || null;
    this.currentPage = 0;
    this.loadData();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  isColumnVisible(column: string): boolean {
    return this.columnas.includes(column);
  }

  

  toggleColumn(column: string): void {
    if (this.isColumnVisible(column)) {
      this.columnas = this.columnas.filter(col => col !== column);
    } else {
      const allColumns = this.availableColumns.map(c => c.value);
      const index = allColumns.indexOf(column);
      
      let inserted = false;
      for (let i = 0; i < this.columnas.length; i++) {
        const currentIndex = allColumns.indexOf(this.columnas[i]);
        if (currentIndex > index) {
          this.columnas.splice(i, 0, column);
          inserted = true;
          break;
        }
      }
      
      if (!inserted) {
        this.columnas.push(column);
      }0
    }
  }

  loadData(): void {
    this.isLoading = true;
    this.measurementService.getTableHistoryByFilters(this.currentPage, this.pageSize, this.filters)
      .subscribe({
        next: (response) => {
          this.alertas.data = this.mapMeasurementsToTableItems(response.data.content);
          this.totalItems = response.data.totalElements;
          if (this.paginator) {
            this.paginator.length = this.totalItems;
            this.paginator.pageSize = this.pageSize;
            this.paginator.pageIndex = this.currentPage;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar los datos:', error);
          this.isLoading = false;
        }
      });
  }

  mapMeasurementsToTableItems(measurements: Measurement[]): AlertTableItem[] {
    return measurements.map(item => ({
      Serial: item.serialEquipment,
      Componente: item.componentName,
      Variable: item.variableName,
      Unidades: item.variableUnits,
      FechaRecepcion: new Date(item.dateReception).toLocaleString(),
      Fechaemedicion: new Date(item.dateMeasurementComponent).toLocaleString(),
      Valor: item.measurementValue,
      Estado: item.alertName,
      TipoMedicion: item.measurementTypeName,
      TipoAlerta: item.alertName,
      alertIcon: item.alertIcon, 
      alertColorHex: item.alertColorHex
    }));
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  exportarExcel(): void {
    const visibleData = this.alertas.data.map(item => {
      const exportItem: any = {};
      this.columnas.forEach(col => {
        if (col !== 'Icono') {
          exportItem[col] = item[col as keyof AlertTableItem];
        }
      });
      return exportItem;
    });
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(visibleData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Alertas');
    XLSX.writeFile(wb, 'alertas.xlsx');
  }

  exportarPDF(): void {
    const doc = new jsPDF();
    
    const visibleColumns = this.columnas.filter(col => col !== 'Icono');
    const headers = [visibleColumns.map(col => {
      const colInfo = this.availableColumns.find(c => c.value === col);
      return colInfo ? colInfo.name : col;
    })];
    
    const rows = this.alertas.data.map(item => {
      return visibleColumns.map(col => {
        return item[col as keyof AlertTableItem]?.toString() || '';
      });
    });

    (doc as any).autoTable({
      head: headers,
      body: rows,
      theme: 'striped',
    });

    doc.save('alertas.pdf');
  }

  imprimir(): void {
    window.print();
  }

  resolverAlerta(alerta: AlertTableItem): void {
    alerta.Estado = 'Resuelta';
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  aplicarFiltros(): void {
    this.currentPage = 0;
    this.loadData();
  }

  limpiarFiltros(): void {
    this.filters = {
      serialEquipment: null,
      dateMeasurementComponentStart: null,
      dateMeasurementComponentEnd: null,
      alertCode: null,
      measurementValueStart: null,
      measurementValueEnd: null,
      directionComponent: null,
      channelComponent: null,
      includeAllAlerts: false,
      excludeAlertCode00: true
    };
    this.currentPage = 0;
    this.loadData();
  }
}