import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeasurementResponse } from '../../interfaces/graphic';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {
  private readonly API_URL =
    'http://localhost:5051/Api/v1/Measurements/FullHistoryBySerialAndComponent';

  constructor(private http: HttpClient) {}

  getMeasurementHistory(
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
      .set('pageSize', pageSize.toString())
      .set('timestamp', Date.now().toString()); // Evita caché

    console.log('Llamando API con:', params.toString()); // Depuración

    return this.http.get<MeasurementResponse>(this.API_URL, { params });
  }
}
