import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/models/tour';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private apiUrl = `${environment.apiUrl}mobile/v1/tours`; 
  constructor(private http: HttpClient) {}

  getTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }
  getTours(searchTerm: string = '', page: number = 0, pageSize: number = 10) {
    let params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}
