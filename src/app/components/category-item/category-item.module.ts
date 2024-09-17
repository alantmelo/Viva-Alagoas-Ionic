import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './category-item.component';
import { IonicModule } from '@ionic/angular';

import { ModalComponent } from '../modal/modal.component';
@NgModule({
  declarations: [CategoryItemComponent, ModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [CategoryItemComponent],
})
export class CategoryItemModule {}
