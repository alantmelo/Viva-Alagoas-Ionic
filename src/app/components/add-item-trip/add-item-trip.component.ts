import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TripService } from 'src/app/services/trip.service'; 
import { Trip, TripResponse } from 'src/app/models/trip';

@Component({
  selector: 'app-add-item-trip',
  templateUrl: './add-item-trip.component.html',
  styleUrls: ['./add-item-trip.component.scss'],
})
export class AddItemTripComponent implements OnInit {
  trips: Trip[] = [];
  searchQuery: string = '';
  page: number = 0;
  pageSize: number = 10;
  totalTrips: number = 0;
  constructor(private router: Router,
    private tripsService: TripService,
    private modalController: ModalController,) {}

  closeModal() {
    this.modalController.dismiss(); // Fecha o modal
  }
  loadTrips(event?: any) {
    this.tripsService.getTrips(this.searchQuery, this.page, this.pageSize).subscribe((response: TripResponse) => {
      console.log(response)
      if (event) {
        event.target.complete(); // Completa o evento de scroll infinito
      }

      this.trips = [...this.trips, ...response.items]; // Adiciona novas viagens à lista existente
      this.totalTrips = response.total; // Atualiza o total de viagens
    });
  }
  ngOnInit() {
    this.loadTrips();
  }
}
