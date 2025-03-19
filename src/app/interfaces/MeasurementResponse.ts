// src/app/models/measurement.interface.ts
export interface MeasurementResponse {
    success: boolean;
    message: string;
    data: {
      content: Measurement[];
      pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
      };
      last: boolean;
      totalPages: number;
      totalElements: number;
      size: number;
      number: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      first: boolean;
      numberOfElements: number;
      empty: boolean;
    };
  }
  
  export interface Measurement {
    serialEquipment: string;
    componentName: string;
    variableName: string;
    variableUnits: string;
    dateReception: string;
    dateMeasurementComponent: string;
    measurementValue: number;
    alertName: string;
    measurementTypeName: string;
    alertIcon: string; 
    alertColorHex: string;
  }
  
  export interface MeasurementFilter {
    serialEquipment: string | null;
    dateMeasurementComponentStart: string | null;
    dateMeasurementComponentEnd: string | null;
    alertCode: string | null;
    measurementValueStart: number | null;
    measurementValueEnd: number | null;
    directionComponent: string | null;
    channelComponent: string | null;
    includeAllAlerts: boolean;
    excludeAlertCode00: boolean;
    componentName?: string | null;
  }
  
  export interface AlertTableItem {
    Serial: string;
    Componente: string;
    Variable: string;
    Unidades: string;
    FechaRecepcion: string;
    Fechaemedicion: string;
    Valor: number;
    Estado: string;
    TipoMedicion: string;
    TipoAlerta: string;
  }