export interface MeasurementResponse {
  success: boolean;
  message: string;
  data: MeasurementData;
}

export interface MeasurementData {
  measurementHistoryGraphic: MeasurementGraphic[];
  measurementHistoryTable: MeasurementHistoryTable;
  componentRange: ComponentRange[];
}

export interface MeasurementGraphic {
  dateMeasurementComponent: string;
  measurementValue: number;
}

export interface MeasurementHistoryTable {
  totalElements: number;
  totalPages: number;
  size: number;
  content: MeasurementContent[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

export interface MeasurementContent {
  serialEquipment: string;
  componentName: string;
  variableName: string;
  variableUnits: string;
  dateReception: string;
  dateMeasurementComponent: string;
  measurementValue: number;
  alertName: string;
  measurementTypeName: string;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
}

export interface ComponentRange {
  componentName: string;
  valueMin: number;
  operatorMin: string;
  valueMax: number;
  operatorMax: string;
  colorHex: string;
}
