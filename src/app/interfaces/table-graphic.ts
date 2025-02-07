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
  }
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  }
  export interface MeasurementResponse {
    success: boolean;
    message: string;
    data: {
      content: Measurement[];
      pageable: Pageable;
      last: boolean;
      totalElements: number;
      totalPages: number;
      numberOfElements: number;
      size: number;
      number: number;
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      first: boolean;
      empty: boolean;
    };
  }