import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = `${environment.apiUrl}mobile/v1/services`; 
  constructor(private http: HttpClient) {}

  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`);
  }
  getServices(searchTerm: string = '', page: number = 0, pageSize: number = 10, cityId: string = '1') {
    let params = new HttpParams()
      .set('cityId', cityId)
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}
