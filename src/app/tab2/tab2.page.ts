import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TripItem } from '../models/trip-item';
import { TripService } from '../services/trip.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  tripItems$!: Observable<TripItem[]>;
  totalAmount$!: Observable<number>;

  constructor(
    private tripService: TripService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.tripItems$ = this.tripService.getCart();
    this.totalAmount$ = this.tripService.getTotalAmount();
  }

  onIncrease(item: TripItem) {
    this.tripService.changeQty(1, item.id);
  }

  onDecrease(item: TripItem) {
    if (item.quantity === 1) this.removeFromCart(item);
    else this.tripService.changeQty(-1, item.id);
  }

  async removeFromCart(item: TripItem) {
    const alert = await this.alertCtrl.create({
      header: 'Remove',
      message: 'Are you sure you want to remove?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.tripService.removeItem(item.id),
        },
        {
          text: 'No',
        },
      ],
    });

    alert.present();
  }

}
