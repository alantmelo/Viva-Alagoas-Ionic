import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service'; 
import { Event } from 'src/app/models/event'; 
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event: Event | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    const eventId = 1; // Exemplo de ID fixo, ajuste conforme necessário
    // const eventId = +this.route.snapshot.paramMap.get('id'); // Descomente para usar o ID da rota
    this.eventsService.findOne(eventId).subscribe((eventData) => {
      console.log(eventData);
      this.event = eventData;
    });
  }
}
