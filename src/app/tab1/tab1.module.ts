import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Tab1PageRoutingModule } from './tab1-routing.module';
// import { ModalComponent } from '../components/modal/modal.component';
import { CategoryItemModule } from 'src/app/components/category-item/category-item.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { ModalLocationComponent } from '../components/modal-location/modal-location.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    CategoryItemModule,
    SearchbarModule,
  ],
  declarations: [Tab1Page, ModalLocationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1PageModule {}
