import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'http://localhost:3002/register-client';

  constructor(private http: HttpClient) {}

  register(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData);
  }
}
