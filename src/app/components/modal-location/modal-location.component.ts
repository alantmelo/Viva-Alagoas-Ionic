import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config.service';
import { City } from 'src/app/models/city'; // Substitua pelo caminho correto do seu modelo

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.scss'],
})
export class ModalLocationComponent {
  ufList = [
    { uf: 'AL', name: 'Alagoas' },
    { uf: 'BA', name: 'Bahia' },
    { uf: 'CE', name: 'Ceará' },
    { uf: 'MA', name: 'Maranhão' },
    { uf: 'PB', name: 'Paraíba' },
    { uf: 'PE', name: 'Pernambuco' },
    { uf: 'PI', name: 'Piauí' },
    { uf: 'RN', name: 'Rio Grande do Norte' },
    { uf: 'SE', name: 'Sergipe' },
  ];

  cities: City[] = [];
  selectedState: string | undefined;
  selectedCity: any | undefined;

  constructor(
    private modalController: ModalController,
    private configService: ConfigService // Injetando o serviço
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  onStateChange() {
    if (this.selectedState) {
      this.getCitiesByState(this.selectedState);
    }
  }

  getCitiesByState(state: string) {
    this.configService.getCitiesByState(state).subscribe(
      (cities) => {
        this.cities = cities;
        console.log(cities)
      },
      (error) => {
        console.error('Erro ao carregar cidades', error);
      }
    );
  }

  saveCity() {
    if (this.selectedCity) {
      const city = this.cities.find(c => c.id == this.selectedCity);
      localStorage.setItem('cityId', String(this.selectedCity));
      localStorage.setItem('cityName', String(city!.name));
      localStorage.setItem('ufName', String(this.selectedState));
      this.modalController.dismiss({
        id: this.selectedCity,
        name: city!.name,
        uf: this.selectedState,
      });
    }
  }
}
