import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ModalLocationComponent } from '../components/modal-location/modal-location.component'; // Importa o novo modal
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedCity: string | null;
  selectedUF: string | null;
  cityId: number | null;
  slideOpts = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 1.5, // You can adjust this to control the number of visible cards
      spaceBetween: 10,
  };
  categories: { id: number; label: string; image: string; active: boolean; }[] | undefined;
  
  constructor(
    private modalController: ModalController,
    private translate: TranslateService
  ) {
    this.getCategories();
    this.selectedCity = localStorage.getItem('cityName');
    this.selectedUF = localStorage.getItem('ufName');
    this.cityId = Number(localStorage.getItem('cityId'));
    this.translate.setDefaultLang('pt');
  }
  isModalOpen = false;
  async openModal() {
    
    const modal = await this.modalController.create({
      component: ModalLocationComponent,
      breakpoints: [0, 0.7, 0.9],
      initialBreakpoint: 0.9, // Aponta para o componente do modal
    });
    await modal.present();

    // Captura a cidade selecionada quando o modal é fechado
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      this.selectedCity = data.name; // Atualiza a cidade selecionada
      this.selectedUF = data.uf; // Atualiza a cidade selecionada
    }
  }
  getCategories() {
    this.categories = [
      {
        id: 1,
        label: 'Beaches',
        image: 'assets/icons8-beach-48.png',
        active: false,
      },
      {
        id: 2,
        label: 'Events',
        image: 'assets/icons8-weekend-48.png',
        active: false,
      },
      {
        id: 3,
        label: 'Hotels',
        image: 'assets/icons8-4-star-hotel-48.png',
        active: false,
      },
      {
        id: 4,
        label: 'Transfers',
        image: 'assets/icons8-taxi-48.png',
        active: false,
      },
      {
        id: 5,
        label: 'Stores',
        image: 'assets/icons8-store-48.png',
        active: false,
      },
      {
        id: 6,
        label: 'Tours',
        image: 'assets/icons8-ticket-48.png',
        active: false,
      },
      {
        id: 7,
        label: 'Restaurant',
        image: 'assets/icons8-buffet-breakfast-48.png',
        active: false,
      },
      {
        id: 8,
        label: 'Services',
        image: 'assets/icons8-service-bell-48.png',
        active: false,
      },
      {
        id: 8,
        label: 'Guides',
        image: 'assets/icons8-tourist-guide-48.png',
        active: false,
      },
    ];
  }
}