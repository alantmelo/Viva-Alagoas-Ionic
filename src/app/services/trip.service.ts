import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripItem } from '../models/trip-item';


@Injectable({
  providedIn: 'root'
})
export class TripService {

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
}
