import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ModalLocationComponent } from '../components/modal-location/modal-location.component'; // Importa o novo modal
import { TranslateService } from '@ngx-translate/core';
import { TouristAttractionsService } from '../services/tourist-attractions.service';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { TranslationHelperService } from '../helpers/translation-helper.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedCity: string | null;
  selectedUF: string | null;
  cityId: number | 1;
  lang: any;
  slideOpts = {
      initialSlide: 0,
      speed: 400,
      slidesPerView: 1.5, // You can adjust this to control the number of visible cards
      spaceBetween: 10,
  };
  categories: { id: number; label: string; image: string; active: boolean; value: string }[] | undefined;
  attractions: any[] = [];
  constructor(
    private modalController: ModalController,
    private translate: TranslateService,
    private router: Router,
    private touristAttractionService: TouristAttractionsService,
    private alertController: AlertController,
    private translationHelper: TranslationHelperService
  ) {
    this.lang = localStorage.getItem('selectedLanguage');
    this.cityId = Number(localStorage.getItem('cityId'));
    this.getCategories();
    this.loadAttractions();
    this.selectedCity = localStorage.getItem('cityName');
    this.selectedUF = localStorage.getItem('ufName');
    if(this.lang === '') {
      this.translate.setDefaultLang('pt-br');
    }else {
      this.translate.setDefaultLang(this.lang);
    }
  }
  availableLanguages: Array<{ value: string, label: string }> = [
    { value: 'pt-br', label: 'Português (Brasil)' },
    { value: 'es', label: 'Español' },
    { value: "fr", label: "Français" },
    { value: 'en', label: 'English' },
    { value: 'it', label: 'Italiano' },
    { value: 'jp', label: '日本語' },
    { value: 'ko', label: '한국어' }
  ];
  async ionViewDidEnter() {
    if (this.lang === '') {
      await this.showLanguageAlert();
    }
  }
  async showLanguageAlert() {
    const alert = await this.alertController.create({
      header: await this.translationHelper.getTranslation('SELECT_LANGUAGE'),
      inputs: this.availableLanguages.map(lang => ({
        name: 'language',
        type: 'radio',
        label: lang.label,
        value: lang.value,
      })),
      buttons: [
        {
          text: await this.translationHelper.getTranslation('CANCEL'),
          role: 'cancel',
        },
        {
          text: await this.translationHelper.getTranslation('CONFIRM'),
          handler: async (selectedLang: string) => {
            if (selectedLang) {
              this.lang = selectedLang;
              console.log(`Idioma selecionado: ${selectedLang}`);
              localStorage.setItem('selectedLanguage', this.lang);
              this.translate.setDefaultLang(this.lang);
              this.categories = [];
              await this.getCategories();
              this.updateAttractionsTranslations();
            }
          },
        },
      ],
    });

    await alert.present();
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
  async getCategories() {
    this.categories = [
      {
        id: 1,
        label: await this.translationHelper.getTranslation('BEACHES'),
        value: 'Beaches',
        image: 'assets/icons8-beach-48.png',
        active: false,
      },
      {
        id: 2,
        label: await this.translationHelper.getTranslation('EVENTS'),
        value: 'Events',
        image: 'assets/icons8-weekend-48.png',
        active: false,
      },
      {
        id: 3,
        label: await this.translationHelper.getTranslation('HOTELS'),
        value: 'Hotels',
        image: 'assets/icons8-4-star-hotel-48.png',
        active: false,
      },
      {
        id: 4,
        label: await this.translationHelper.getTranslation('TRANSFERS'),
        value: 'Transfers',
        image: 'assets/icons8-taxi-48.png',
        active: false,
      },
      {
        id: 5,
        label: await this.translationHelper.getTranslation('STORES'),
        value: 'Stores',
        image: 'assets/icons8-store-48.png',
        active: false,
      },
      {
        id: 6,
        label: await this.translationHelper.getTranslation('TOURIST_TOURS'),
        value: 'Tours',
        image: 'assets/icons8-ticket-48.png',
        active: false,
      },
      {
        id: 7,
        label: await this.translationHelper.getTranslation('RESTAURANTS'),
        value: 'Restaurant',
        image: 'assets/icons8-buffet-breakfast-48.png',
        active: false,
      },
      {
        id: 8,
        label: await this.translationHelper.getTranslation('SERVICES'),
        value: 'Services',
        image: 'assets/icons8-service-bell-48.png',
        active: false,
      },
      {
        id: 8,
        label: await this.translationHelper.getTranslation('TOURIST_GUIDES'),
        value: 'Guides',
        image: 'assets/icons8-tourist-guide-48.png',
        active: false,
      },
      {
        id: 9,
        label: await this.translationHelper.getTranslation('TOURIST_ATTRACTIONS'),
        value: 'Attractions',
        image: 'assets/icons8-tourist-guide-48.png',
        active: false,
      },
    ];
  }
  loadAttractions() {
    this.touristAttractionService.findByCityId(this.cityId).subscribe({
      next: (data) => {
        this.attractions = data;
        this.updateAttractionsTranslations(); // Chama a função de tradução ao carregar os dados
      },
      error: (error) => {
        console.error('Erro ao carregar as atrações:', error);
      },
      complete: () => {
        console.log('Requisição completa');
      }
    });
  }
  
  updateAttractionsTranslations() {
    if (!this.attractions || this.attractions.length === 0) {
      return; // Garante que as atrações estejam carregadas antes de atualizar as traduções
    }
  
    this.attractions = this.attractions.map((attraction) => {
      let translatedName = attraction.name; // Nome padrão
      let translatedDescription = attraction.description; // Descrição padrão
  
      if (this.lang !== 'pt-br' && attraction.translations) {
        // Procura a tradução correspondente ao idioma atual
        const translation = attraction.translations.find((t: { lang: any; }) => t.lang === this.lang);
        
        if (translation) {
          translatedName = translation.name;
          translatedDescription = translation.description;
        }
      }
  
      return {
        ...attraction,
        translatedName, // Propriedade para exibir o nome traduzido
        translatedDescription // Propriedade para exibir a descrição traduzida
      };
    });
  
    // Chama Change Detection para garantir que a view seja atualizada
    // this.cd.detectChanges(); 
  }
  
  goToAttr(id: number) {
    this.router.navigate(['/tourist-attraction/'+ id]);
  }
  showTranslation() {
    this.translate.get('SELECT_LANGUAGE').subscribe((res: string) => {
      console.log(res);
    });
  }
}