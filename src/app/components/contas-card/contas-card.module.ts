import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasCardComponent } from './contas-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ContasCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [ContasCardComponent],
})
export class ContasCardModule {}
