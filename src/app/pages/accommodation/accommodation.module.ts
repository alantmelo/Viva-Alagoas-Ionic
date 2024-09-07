import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { AccommodationPageRoutingModule } from './accommodation-routing.module';

import { AccommodationPage } from './accommodation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccommodationPageRoutingModule
  ],
  declarations: [AccommodationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccommodationPageModule {}
