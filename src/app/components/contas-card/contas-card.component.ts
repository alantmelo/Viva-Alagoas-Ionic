import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Food } from 'src/app/models/food.model';

@Component({
  selector: 'app-contas-card',
  templateUrl: './contas-card.component.html',
  styleUrls: ['./contas-card.component.scss'],
})
export class ContasCardComponent  {
  @Input() item: Food;

  @Output() clicked = new EventEmitter();
  constructor() { }

}
