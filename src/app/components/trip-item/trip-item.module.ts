import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripItemComponent } from './trip-item.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TripItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [TripItemComponent],
})
export class TripItemModule {}
