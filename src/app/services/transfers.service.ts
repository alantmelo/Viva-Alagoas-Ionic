import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
