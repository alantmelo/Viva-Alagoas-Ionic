import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccommodationsService } from 'src/app/services/accommodations.service';
import { Accommodation } from 'src/app/models/accommodation';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.page.html',
  styleUrls: ['./accommodation.page.scss'],
})
export class AccommodationPage implements OnInit {
  accommodation: Accommodation | undefined;
  constructor(
    private accommodationService: AccommodationsService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    await this.accommodationService.getAccommodation(id).subscribe(data => {
      this.accommodation = data;
      console.log(data)
    });
  }

}
