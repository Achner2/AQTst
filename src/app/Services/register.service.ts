import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly apiUrl = 'https://localhost:7051/api/UserCredentials/Register';

  constructor(private readonly http: HttpClient) { }

  register(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código del error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}