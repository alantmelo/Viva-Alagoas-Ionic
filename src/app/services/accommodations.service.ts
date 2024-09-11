import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  // getAccommodations(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
  getAccommodations(searchTerm: string = '', page: number = 0, pageSize: number = 10) {
    let params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}
