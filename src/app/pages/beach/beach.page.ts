import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachService } from 'src/app/services/beaches.service';
import { Beach } from 'src/app/models/beach';
import { ModalController } from '@ionic/angular';
import { AddItemTripComponent } from 'src/app/components/add-item-trip/add-item-trip.component'; // Importe o modal correto


@Component({
  selector: 'app-beach',
  templateUrl: './beach.page.html',
  styleUrls: ['./beach.page.scss'],
})
export class BeachPage implements OnInit {
  beach: Beach| null = null;
  constructor(
    private route: ActivatedRoute,
    private beachService: BeachService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const beachId = +this.route.snapshot.paramMap.get('id')!;
    this.beachService.getBeachById(beachId).subscribe((beachData) => {
      console.log(beachData);
      this.beach = beachData;
    });
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: AddItemTripComponent, // O modal que será aberto
      componentProps: { data: this.beach}
    });

    await modal.present();
  }

}
