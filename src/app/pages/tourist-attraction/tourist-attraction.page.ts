import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TouristAttractionsService } from 'src/app/services/tourist-attractions.service'; // Importe o serviço de atrações turísticas
import { TouristAttraction } from 'src/app/models/tourist-attraction'; // Importe o modelo de atração turística
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { ModalController } from '@ionic/angular';
import { AddItemTripComponent } from 'src/app/components/add-item-trip/add-item-trip.component'; // Importe o modal correto

@Component({
  selector: 'app-tourist-attraction',
  templateUrl: './tourist-attraction.page.html',
  styleUrls: ['./tourist-attraction.page.scss'],
})
export class TouristAttractionPage implements OnInit, OnDestroy {
  private refreshSubscription: Subscription | undefined;

  touristAttraction: TouristAttraction | null = null;
  description: string = '';
  name: string = '';

  constructor(
    private route: ActivatedRoute,
    private touristAttractionsService: TouristAttractionsService,
    private languageService: LanguageService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.refreshSubscription = this.languageService.refreshPage$.subscribe(() => {
      this.reloadPage();
    });
    this.languageService.getCurrentLanguage();
    this.getTouristAttractionData();
    this.setButtonLabel();
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  reloadPage() {
    console.log('Recarregando a página devido à alteração da língua');
    this.updatePageContent();
  }

  updatePageContent() {
    if (this.touristAttraction) {
      this.description = this.languageService.getDescriptionForLanguage(this.touristAttraction);
      this.name = this.languageService.getNameForLanguage(this.touristAttraction);
      console.log('Descrição para a língua selecionada:', this.description);
      console.log('Nome para a língua selecionada:', this.name);
      this.setButtonLabel();
    }
  }

  async getTouristAttractionData() {
    try {
      console.log('Chamando a API para buscar a atração turística');
      const attractionId = +this.route.snapshot.paramMap.get('id')! || 1;
      this.touristAttractionsService.findOne(attractionId).subscribe({
        next: (attractionData) => {
          console.log('Dados da atração turística recebidos:', attractionData);
          this.touristAttraction = attractionData;
          this.updatePageContent(); 
        },
        error: (error) => {
          console.error('Erro ao carregar dados da atração turística', error);
        },
        complete: () => {
          console.log('Assinatura completada');
        }
      });
    } catch (error) {
      console.error('Erro inesperado ao carregar dados da atração turística', error);
    }
  }

  buttonLabel!: string;

  setButtonLabel() {
    const lang = localStorage.getItem('selectedLanguage');
    switch (lang) {
      case 'en':
        this.buttonLabel = 'Visit';
        break;
      case 'es':
        this.buttonLabel = 'Visitar';
        break;
      case 'fr':
        this.buttonLabel = 'Visiter';
        break;
      case 'it':
        this.buttonLabel = 'Visitare';
        break;
      case 'ko':
        this.buttonLabel = '방문';
        break;
      case 'jp':
        this.buttonLabel = '訪問する';
        break;
      default:
        this.buttonLabel = 'Visitar';
        break;
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddItemTripComponent, // O modal que será aberto
      componentProps: { data: this.touristAttraction }
    });

    await modal.present();
  }
}
