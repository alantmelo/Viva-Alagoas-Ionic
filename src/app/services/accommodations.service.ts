import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Accommodation } from 'src/app/models/accommodation';
@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {
  private apiUrl = `${environment.apiUrl}mobile/v1/accommodations`;
  constructor(private http: HttpClient) { }
  getAccommodation(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${this.apiUrl}/${id}`);
  }
}
