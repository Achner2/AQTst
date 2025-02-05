export interface LatestMeasurement {
  success: boolean;
  message: string;
  data: MeasurementData[];
}

export interface MeasurementData {
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