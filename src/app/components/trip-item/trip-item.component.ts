import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TripItem } from 'src/app/models/trip-item';

@Component({
  selector: 'app-trip-item',
  templateUrl: './trip-item.component.html',
  styleUrls: ['./trip-item.component.scss'],
})
export class TripItemComponent {
  @Input() item!: TripItem;
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();
}
