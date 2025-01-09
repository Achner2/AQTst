import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'https://localhost:7050/api/UserCredentials/login';

  constructor(private http: HttpClient) { }

  login(credentials: {email : string, password: string}): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

}
