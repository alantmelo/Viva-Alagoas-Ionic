import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
