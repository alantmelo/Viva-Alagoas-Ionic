import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TourGuide } from '../models/tour-guide';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourGuidesService {
  private apiUrl = `${environment.apiUrl}mobile/v1/tour-guides`;

  constructor(private http: HttpClient) {}

  getTourGuideById(id: number): Observable<TourGuide> {
    return this.http.get<TourGuide>(`${this.apiUrl}/${id}`);
  }
  getTourGuides(searchTerm: string = '', page: number = 0, pageSize: number = 10) {
    let params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}
