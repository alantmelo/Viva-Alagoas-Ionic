import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  private apiUrl = `${environment.apiUrl}mobile/v1/stores`; 
  constructor(private http: HttpClient) {}

  getStoreById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`);
  }
  getStores(searchTerm: string = '', page: number = 0, pageSize: number = 10, cityId: string = '1') {
    let params = new HttpParams()
      .set('cityId', cityId)
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}