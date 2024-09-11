import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private apiUrl = `${environment.apiUrl}mobile/v1/restaurants`;
  constructor(private http: HttpClient) {}

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }
  getRestaurants(searchTerm: string = '', page: number = 0, pageSize: number = 10) {
    let params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}
