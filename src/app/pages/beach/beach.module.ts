import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BeachPageRoutingModule } from './beach-routing.module';

import { BeachPage } from './beach.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeachPageRoutingModule,
    // ReactiveFormsModule
  ],
  declarations: [BeachPage]
})
export class BeachPageModule {}
