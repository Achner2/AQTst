import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment, EquipmentResponse } from '../../interfaces/Equipment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private apiUrl = 'http://localhost:5051/Api/v1/Equipments';

  constructor(private http: HttpClient) { }

  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<EquipmentResponse>(`${this.apiUrl}/GetAll`)
      .pipe(
        map(response => {
          if (response.success && Array.isArray(response.data)) {
            return response.data;
          }
          return [];
        })
      );
  }

  getAllSerials(): Observable<string[]> {
    return this.getAllEquipments().pipe(
      map(equipments => equipments.map(equipment => equipment.serial))
    );
  }
  
  getEquipmentBySerial(serial: string): Observable<Equipment | undefined> {
    return this.getAllEquipments().pipe(
      map(equipments => equipments.find(equipment => equipment.serial === serial))
    );
  }
}
