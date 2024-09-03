import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // resetPassword(password: string): Observable<any> {
  //   // const token = localStorage.getItem('authToken'); // Adjust as needed to get the token
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsIm5hbWUiOiJhbGFuIiwiZW1haWwiOiJhbGFudG1lbG9AbGl2ZS5jb20iLCJyb2xlIjoiVE9VUklTVCIsImlhdCI6MTcyNTQwNTUzNywiZXhwIjoxNzI1NDA5MTM3fQ.dK6-9X_3EGGpP_54hTLW4yM88MWg-ccxzS0wLPsnK8g' ;// Adjust as needed to get the token
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //   });

  //   return this.http.post(`${this.apiUrl}/reset`, { password }, { headers });
  // }

  resetPassword(password: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = { password, token }; // Adjusted request body

    return this.http.post(`${this.apiUrl}/reset`, body, { headers });
  }

  forgotPassword(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.apiUrl}/forget`, body);
  }
}
