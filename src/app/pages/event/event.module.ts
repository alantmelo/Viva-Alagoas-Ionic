import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { LanguageSelectorButtonComponent } from 'src/app/components/language-selector-button/language-selector-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule
  ],
  declarations: [EventPage, LanguageSelectorButtonComponent]
})
export class EventPageModule {}
