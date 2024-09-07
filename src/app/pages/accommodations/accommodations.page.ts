import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.page.html',
  styleUrls: ['./accommodations.page.scss'],
})
export class AccommodationsPage implements OnInit {
  segment: string = 'overview';

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
  constructor() { }

  ngOnInit() {
  }

}
