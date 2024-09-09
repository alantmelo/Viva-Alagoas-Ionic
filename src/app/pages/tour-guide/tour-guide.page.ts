import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourGuidesService } from 'src/app/services/tour-guides.service';
import { TourGuide } from 'src/app/models/tour-guide';

@Component({
  selector: 'app-tour-guide',
  templateUrl: './tour-guide.page.html',
  styleUrls: ['./tour-guide.page.scss'],
})
export class TourGuidePage implements OnInit {
  tourGuide: TourGuide | null = null;

  constructor(
    private route: ActivatedRoute,
    private tourGuidesService: TourGuidesService
  ) {}

  ngOnInit() {
    // const tourGuideId = +this.route.snapshot.paramMap.get('id');
    const tourGuideId = 1;
    this.tourGuidesService.getTourGuideById(tourGuideId).subscribe((tourGuideData) => {
      console.log(tourGuideData);
      this.tourGuide = tourGuideData;
    });
  }
}
