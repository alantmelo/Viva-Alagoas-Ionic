import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip';
import { AlertController, ModalController } from '@ionic/angular'; // Adicione ModalController
import { AddItemTripModalComponent } from 'src/app/components/add-item-trip-modal/add-item-trip-modal.component'; 

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  trip: Trip | undefined;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripService,
    private alertController: AlertController,
    private modalController: ModalController // Corrigido para ModalController
  ) {}

  ngOnInit() {
    const tripId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTrip(tripId);
  }

  async openAddItemModal() {
    if (!this.trip || !this.trip.id) {
      console.warn('Trip ID is undefined');
      return;
    }
  
    const modal = await this.modalController.create({
      component: AddItemTripModalComponent,
      componentProps: { tripId: this.trip.id } // Certifique-se de que o tripId está correto
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Selected user IDs:', result.data);
        // Ações adicionais com os IDs selecionados, se necessário
      }
    });
  
    await modal.present();
  }

  loadTrip(id: number) {
    this.tripsService.getTripById(id).subscribe((trip) => {
      this.trip = trip;
    });
  }
}

  
