import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from 'src/app/models/tour';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private apiUrl = `${environment.apiUrl}mobile/v1/tours`; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }
}
