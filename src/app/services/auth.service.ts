import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
  
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  resetPassword(password: string, token: string): Observable<any> {
    const body = { password, token };
    return this.http.post(`${this.apiUrl}/reset`, body);
  }

  forgotPassword(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.apiUrl}/forget`, body);
  }
}
