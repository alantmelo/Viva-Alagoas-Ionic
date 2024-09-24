import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripItem } from '../models/trip-item';
import { Item } from '../models/item';
import { Trip,TripResponse } from '../models/trip';
import { User } from '../models/user';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = `${environment.apiUrl}mobile/v1/calculator`; 
  constructor(private http: HttpClient) {}
  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/trips/${id}`);
  }
  getTrips(search: string = '', page: number = 0, pageSize: number = 10, cityId?: number): Observable<TripResponse> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (cityId) {
      params = params.set('cityId', cityId.toString());
    }

    return this.http.get<TripResponse>(`${this.apiUrl}/trips`, { params });
  }

  private items$ = new BehaviorSubject<TripItem[]>([
    {
      id: 1,
      name: 'Sol Victoria Marina Hotel',
      price: 1500,
      image: 'https://cdn4.iconfinder.com/data/icons/macaron-1/48/eog-512.png',
      quantity: 1,
    },
    {
      id: 1,
      name: 'Passages',
      price: 3000,
      image: 'https://cdn4.iconfinder.com/data/icons/macaron-1/48/eog-512.png',
      quantity: 1,
    },
    {
      id: 1,
      name: 'Transfer',
      price: 300,
      image: 'https://cdn4.iconfinder.com/data/icons/macaron-1/48/eog-512.png',
      quantity: 1,
    },
    {
      id: 1,
      name: 'Concert Ticket',
      price: 600,
      image: 'https://cdn4.iconfinder.com/data/icons/macaron-1/48/eog-512.png',
      quantity: 3,
    },
  ]);

  getCart() {
    return this.items$.asObservable();
  }

  addToCart(newItem: TripItem) {
    this.items$.next([...this.items$.getValue(), newItem]);
  }

  removeItem(id: number) {
    this.items$.next(this.items$.getValue().filter((item) => item.id !== id));
  }

  changeQty(quantity: number, id: number) {
    const items = this.items$.getValue();
    const index = items.findIndex((item) => item.id === id);
    items[index].quantity += quantity;
    this.items$.next(items);
  }

  getTotalAmount() {
    return this.items$.pipe(
      map((items) => {
        let total = 0;
        items.forEach((item) => {
          total += item.quantity * item.price;
        });

        return total;
      })
    );
  }
  getTripUsers(tripId: number): Observable<{ id: number, user: { name: string } }[]> {
    return this.http.get<{ id: number, user: { name: string } }[]>(`${this.apiUrl}/trips/${tripId}/users`)
      .pipe(
        map(users => users || []) // Garante que retornará um array, mesmo que vazio
      );
  }

  getTripData(tripId: number): Observable<{ tripUsers: any[], activeItemTypes: any[] }> {
    return this.http.get<{ tripUsers: any[], activeItemTypes: any[] }>(`${this.apiUrl}/trips/${tripId}/itemData`);
  }

  addUserToTrip(tripId: number, email: string) {
    return this.http.post(`${this.apiUrl}/trips/${tripId}/users`, { email });
  }
  createItem(createItemDto: Item): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trips/item`, createItemDto);
  }

  // Método para atualizar um item existente
  updateItem(id: number, updateItemDto: Item): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/item/${id}`, updateItemDto);
  }

  getItemById(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trips/items/${itemId}`);
  }
}
