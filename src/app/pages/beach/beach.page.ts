import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachService } from 'src/app/services/beaches.service';
import { Beach } from 'src/app/models/beach';

@Component({
  selector: 'app-beach',
  templateUrl: './beach.page.html',
  styleUrls: ['./beach.page.scss'],
})
export class BeachPage implements OnInit {
  beach: Beach| null = null;
  constructor(
    private route: ActivatedRoute,
    private beachService: BeachService
  ) {}

  ngOnInit() {
    const beachId = +this.route.snapshot.paramMap.get('id')!;
    this.beachService.getBeachById(beachId).subscribe((beachData) => {
      console.log(beachData);
      this.beach = beachData;
    });
  }

}
