import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service'; 
import { Event } from 'src/app/models/event'; 
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit, OnDestroy {
  private refreshSubscription: Subscription | undefined;

  event: Event | null = null;
  selectedLanguage: string = 'pt-br'; // Inicialize com um valor padrão

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.selectedLanguage = this.languageService.getCurrentLanguage();
    
    this.refreshSubscription = this.languageService.refreshPage$.subscribe(() => {
      this.reloadPage();
    });

    this.getEventData();
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  async reloadPage() {
    // console.log('Recarregando a página devido à alteração da língua');

    this.selectedLanguage = this.languageService.getCurrentLanguage();
    this.updatePageContent();
  }

  updatePageContent() {
    if (!this.event) {
      console.log('Nenhum evento carregado.');
      return;
    }

    // Define a descrição baseada na língua selecionada
    const description = this.getDescriptionForLanguage();
    console.log('Descrição para a língua selecionada:', description);
    // Atualize o conteúdo da página conforme necessário, por exemplo:
    // this.pageDescription = description;
  }

  getDescriptionForLanguage(): string {
    if (!this.event) {
      return '';
    }

    if (this.selectedLanguage === 'pt-br') {
      // console.log('entrou pt br');
      return this.event.description || '';
    }

    if (this.event.translations) {
      const translation = this.event.translations.find(t => t.lang === this.selectedLanguage);
      // console.log('translation: '+translation);
      return translation ? translation.description : '';
    }

    return '';
  }

  async getEventData() {
    try {
      console.log('Chamando a API');
      const eventId = +this.route.snapshot.paramMap.get('id')! || 1; // Obtém o ID da rota ou usa um valor padrão
      this.eventsService.findOne(eventId).subscribe({
        next: (eventData) => {
          console.log('Dados do evento recebidos:', eventData);
          this.event = eventData;
          this.updatePageContent(); // Atualiza o conteúdo da página após receber os dados
        },
        error: (error) => {
          console.error('Erro ao carregar dados do evento', error);
        },
        complete: () => {
          console.log('Assinatura completada');
        }
      });
    } catch (error) {
      console.error('Erro inesperado ao carregar dados do evento', error);
    }
  }
  
}
