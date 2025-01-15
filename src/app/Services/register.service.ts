import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly apiUrl = 'https://localhost:7050/api/UserCredentials/Register'

  constructor(private readonly http: HttpClient) { }

  register(credentials: {email: string, password: string}):Observable<any>{
    return this.http.post(this.apiUrl, credentials)
  }
}
