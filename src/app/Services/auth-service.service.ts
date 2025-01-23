import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly apiUrl = environment.apiUrlLogin
  constructor(private readonly http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null && token !== '';
  }
  logout(): void {
    localStorage.removeItem('authToken');
  }
}