export interface LatestMeasurement {
    serialEquipment: string;
    directionComponent: number;
    channelComponent: number;
    componentName: string;
    variableName: string;
    variableUnits: string;
    variableValueMax: number;
    variableValueMin: number;
    measurementNut: string;
    measurementValue: number;
    dateMeasurementComponent: string;
    alertCode: string;
    alertName: string;
    measurementTypeName: string;
  }

  export interface MeasurementHistoryGraphic {
    dateMeasurementComponent: string;
    measurementValue: number;
  }

  export interface MeasurementHistoryTable {
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

  export interface MeasurementHistory {
    measurementHistoryGraphic: MeasurementHistoryGraphic[];
    measurementHistoryTable: MeasurementHistoryTable[];
  }