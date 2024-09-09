import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
