export interface ApiResponse {
  success: boolean;
  message: string;
  data: Measurement[];
}

export interface Measurement {
  serialEquipment: string;
  directionComponent: number;
  channelComponent: number;
  componentName: string;
  variableName: string;
  variableUnits: string;
  variableValueMax: string;
  variableValueMin: string;
  measurementNut: string;
  measurementValue: number;
  dateMeasurementComponent: string;
  alertCode: string;
  alertName: string;
  measurementTypeName: string;
  rowNum: number;
}