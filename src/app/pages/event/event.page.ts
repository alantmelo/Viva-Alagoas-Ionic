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
  description: string = '';
  name: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.refreshSubscription = this.languageService.refreshPage$.subscribe(() => {
      this.reloadPage();
    });
    this.languageService.getCurrentLanguage();
    this.getEventData();
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
    if (this.event) {
      this.description = this.languageService.getDescriptionForLanguage(this.event);
      this.name = this.languageService.getNameForLanguage(this.event);
      console.log('Descrição para a língua selecionada:', this.description);
      console.log('name para a língua selecionada:', this.name);
    }
  }

  async getEventData() {
    try {
      console.log('Chamando a API');
      const eventId = +this.route.snapshot.paramMap.get('id')! || 1;
      this.eventsService.findOne(eventId).subscribe({
        next: (eventData) => {
          console.log('Dados do evento recebidos:', eventData);
          this.event = eventData;
          this.updatePageContent(); 
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
