import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LatestMeasurement, MeasurementHistory } from '../../interfaces/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private readonly API_URL = "url de la api"
  constructor(private http: HttpClient) { }

  getLatestMeasurement(serialNumber: string): Observable<LatestMeasurement>{
    return this.http.get<LatestMeasurement>(`${this.API_URL}/latest/${serialNumber}`)
  }

  getMeasurementHistory(serialNumber: string, startDate: string, endDate: string): Observable<MeasurementHistory> {
    return this.http.get<MeasurementHistory>(`${this.API_URL}/history`, {
      params: { serialNumber, startDate, endDate }
    });
  }

}
