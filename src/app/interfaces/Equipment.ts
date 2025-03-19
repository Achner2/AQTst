export interface Equipment {
    id: number;
    status: boolean;
    name: string;
    owner: string;
    serial: string;
    componentsNumber: number;
    creationDate: string;
    modifyDate: string;
    createdBy: number;
    modifiedBy: number;
    idInstallation: number;
    components?: any[];
  }
  
  export interface EquipmentResponse {
    success: boolean;
    message: string;
    data: Equipment[];
  }
  