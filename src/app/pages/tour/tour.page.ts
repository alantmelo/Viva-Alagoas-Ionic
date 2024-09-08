import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/models/tour';
import { ToursService } from 'src/app/services/tours.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: ['./tour.page.scss'],
})
export class TourPage implements OnInit {

  tour: Tour | null = null;

  constructor(private route: ActivatedRoute, private toursService: ToursService) {}

  ngOnInit() {
    const id = 1;
    // const id = +this.route.snapshot.paramMap.get('id')!;
    this.toursService.getTourById(id).subscribe((tour) => {
      this.tour = tour;
    });
  }

}
