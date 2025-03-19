import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MeasurementFilter, MeasurementResponse} from '../../interfaces/MeasurementResponse'
import {environment} from '../../../Environment/environment';


@Injectable({
  providedIn: 'root'
})
export class TableResponseService {

  private apiUrl = `${environment.apiUrlTable}/Api/v1/Measurements`;

  constructor(private http: HttpClient) { }

  getTableHistoryByFilters(page: number, pageSize: number, filters: MeasurementFilter): Observable<MeasurementResponse> {
    const url = `${this.apiUrl}/GetTableHistoryByFilters`;
    
    // Añadir parámetros de consulta para la paginación
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
      
    // El cuerpo de la solicitud contiene los filtros
    return this.http.post<MeasurementResponse>(url, filters, { params });
  }
}
