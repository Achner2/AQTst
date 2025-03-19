import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeasurementResponse } from '../../interfaces/table-graphic';

@Injectable({
  providedIn: 'root'
})
export class GraphicTableService {
  private baseUrl = 'http://localhost:5051/Api/v1/Measurements'; // Reemplaza con tu URL de API
  constructor(private http: HttpClient) {}
  getTableHistoryBySerialAndComponent(
    serial: string,
    direction: number,
    channel: number,
    page: number,
    pageSize: number
  ): Observable<MeasurementResponse> {
    const params = new HttpParams()
    .set('serial', serial)
    .set('direction', direction.toString())
    .set('channel', channel.toString())
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
  return this.http.get<MeasurementResponse>(`${this.baseUrl}/TableHistoryBySerialAndComponent`, { params });
}
getSensorData(sensorType: string): Observable<any[]> {
  const params = new HttpParams().set('sensorType', sensorType);
  return this.http.get<any[]>(`${this.baseUrl}/SensorData`, { params });
}
}
