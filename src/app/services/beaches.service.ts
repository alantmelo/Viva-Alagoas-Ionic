// src/app/services/beach.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getBeaches(searchTerm: string = '', page: number = 0, pageSize: number = 10, cityId: string = '1') {
    let params = new HttpParams()
      .set('cityId', cityId)
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}
