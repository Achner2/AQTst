import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Measurement, ApiResponse } from '../../interfaces/measurement';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private readonly API_URL = 'http://localhost:5051/Api/v1/Measurements';

  constructor(private http: HttpClient) {}

  getLatestMeasurement(serialNumber: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}/LatestBySerial`, {
      params: { serial: serialNumber }
    }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getMeasurementHistory(serialNumber: string, startDate: string, endDate: string): Observable<Measurement> {
    return this.http.get<Measurement>(`${this.API_URL}/history`, {
      params: {
        serial: serialNumber,
        startDate,
        endDate
      }
    }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}