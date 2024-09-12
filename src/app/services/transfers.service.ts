import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = `${environment.apiUrl}mobile/v1/transfers`;

  constructor(private http: HttpClient) {}

  getTransferById(id: number): Observable<Transfer> {
    return this.http.get<Transfer>(`${this.apiUrl}/${id}`);
  }
  getTransfers(searchTerm: string = '', page: number = 0, pageSize: number = 10, cityId: string = '1') {
    let params = new HttpParams()
      .set('cityId', cityId)
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}
