import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = `${environment.apiUrl}cities`;
  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get<{ items: any[]}>(this.apiUrl);
  }
}
