import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripItem } from '../models/trip-item';
import { Item } from '../models/item';
import { Trip,TripResponse } from '../models/trip';
import { User } from '../models/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private token = localStorage.getItem('authToken');
  private apiUrl = `${environment.apiUrl}mobile/v1/calculator`; 
  constructor(private http: HttpClient) {}
  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/trips/${id}`);
  }
  getTrips(search: string = '', page: number = 0, pageSize: number = 10, userId?: number): Observable<TripResponse> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
  
    if (userId) {
      params = params.set('userId', userId.toString());
    }
  
    // Define os cabeçalhos, incluindo o token de autorização
    const headers = {
      Authorization: `Bearer ${this.token}`, // Adiciona o token ao cabeçalho
    };
  
    return this.http.get<TripResponse>(`${this.apiUrl}/trips`, { params, headers });
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
    return this.http.patch<any>(`${this.apiUrl}/trips/item/${id}`, updateItemDto);
  }

  getItemById(itemId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/trips/items/${itemId}`);
  }
  removeItem(id: number): Observable<any> {
    console.log('entrou no service ionic');
    return this.http.delete(`${this.apiUrl}/trips/items/${id}`);
  }
  updateTripStatusToFalse(tripId: number): Observable<any> {
    const url = `${this.apiUrl}/trips/${tripId}`;
    return this.http.delete(url, {}); // Faz o patch sem body, apenas para alterar o status
  }

  createTrip(tripData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/trips`, tripData, { headers });
  }

  updateTrip(id: number, tripData: Partial<any>): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    console.log(tripData);
    return this.http.patch(`${this.apiUrl}/trips/${id}`, tripData, { headers });
  }
  removeTripUser(tripId: number, tripUserId: number): Observable<string> {
    const url = `${this.apiUrl}/trips/${tripId}/users/${tripUserId}`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    });

    return this.http.delete<string>(url, { headers });
  }
}
