import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = `${environment.apiUrl}mobile/v1/config`;

  constructor(private http: HttpClient) {}

  getCitiesByState(state: string): Observable<City[]> {
    const params = new HttpParams().set('state', state);  // Adiciona o parâmetro state
    return this.http.get<City[]>(`${this.apiUrl}/cities-by-state/${state}`, { params });
  }
}
