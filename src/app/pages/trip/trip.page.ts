import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/models/trip';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  trip: Trip | undefined;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripService
  ) {}

  ngOnInit() {
    const tripId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTrip(tripId);
  }

  loadTrip(id: number) {
    this.tripsService.getTripById(id).subscribe((trip) => {
      this.trip = trip;
    });
  }
}
