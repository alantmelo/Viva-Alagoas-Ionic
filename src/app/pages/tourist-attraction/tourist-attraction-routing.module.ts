import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouristAttractionPage } from './tourist-attraction.page';

const routes: Routes = [
  {
    path: '',
    component: TouristAttractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TouristAttractionPageRoutingModule {}
