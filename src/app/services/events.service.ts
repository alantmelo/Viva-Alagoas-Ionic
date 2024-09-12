import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiUrl = `${environment.apiUrl}mobile/v1/events`; 
  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }
  getEvents(searchTerm: string = '', page: number = 0, pageSize: number = 10, cityId: string = '1') {
    let params = new HttpParams()
      .set('cityId', cityId)
      .set('search', searchTerm)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: any[], total: number }>(this.apiUrl, { params });
  }
}