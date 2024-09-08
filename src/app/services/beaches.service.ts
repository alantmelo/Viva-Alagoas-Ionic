// src/app/services/beach.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beach } from '../models/beach';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeachService {
  private apiUrl = `${environment.apiUrl}mobile/v1/beaches`; 
  constructor(private http: HttpClient) {}

  getBeachById(id: number): Observable<Beach> {
    return this.http.get<Beach>(`${this.apiUrl}/${id}`);
  }
}
