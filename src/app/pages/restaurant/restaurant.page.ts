import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  restaurant: Restaurant | null = null;

  constructor(
    private route: ActivatedRoute,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnInit() {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    const id = 1;
    this.restaurantsService.getRestaurant(id).subscribe((data) => {
      this.restaurant = data;
    });
  }
}
