import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouristAttractionPageRoutingModule } from './tourist-attraction-routing.module';

import { TouristAttractionPage } from './tourist-attraction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouristAttractionPageRoutingModule
  ],
  declarations: [TouristAttractionPage ]
})
export class TouristAttractionPageModule {}
